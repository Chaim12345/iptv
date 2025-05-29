document.addEventListener('DOMContentLoaded', () => {
    // M3U Elements
    const m3uFileInput = document.getElementById('m3uFile');
    const m3uUrlInput = document.getElementById('m3uUrl');
    const loadM3uButton = document.getElementById('loadM3uButton');
    
    // EPG Elements (Manual Load)
    const epgFileInput = document.getElementById('epgFile');
    const epgUrlInput = document.getElementById('epgUrl');
    const loadEpgButton = document.getElementById('loadEpgButton');
    
    // Channel List Elements
    const channelListDiv = document.getElementById('channelList');
    const channelSearchInput = document.getElementById('channelSearch');
    
    // Player and EPG Display
    const player = document.getElementById('player');
    const epgDisplayDiv = document.getElementById('epgDisplay');
    
    // Notifications
    const notificationsDiv = document.getElementById('notifications');
    
    // Filters & Recents
    const filterFavoritesButton = document.getElementById('filterFavoritesButton');
    const recentChannelsListUI = document.getElementById('recentChannelsList');

    // Settings Modal Elements
    const settingsModal = document.getElementById('settingsModal');
    const openSettingsButton = document.getElementById('openSettingsButton');
    const closeSettingsButton = document.getElementById('closeSettingsButton');
    const newEpgUrlInput = document.getElementById('newEpgUrlInput');
    const addEpgUrlButton = document.getElementById('addEpgUrlButton');
    const epgUrlListUI = document.getElementById('epgUrlList');
    const recommendedEpgListUI = document.getElementById('recommendedEpgList');

    // Curated Playlists Elements (to be added in index.html)
    // const curatedPlaylistsListUI = document.getElementById('curatedPlaylistsList');


    // Parsers
    const m3uParser = new M3UParser();
    const epgParser = new EPGParser();

    // State Variables
    window.currentHlsInstance = null;
    window.epgData = { channels: {}, programmes: {} }; 
    window.allChannels = []; 
    let currentSelectedChannelItem = null;

    // Favorites State
    let favoriteChannelIds = new Set();
    let showOnlyFavorites = false;
    const FAVORITES_STORAGE_KEY = 'iptvPlayerFavorites';

    // Recents State
    let recentChannelIds = []; 
    const RECENTS_STORAGE_KEY = 'iptvPlayerRecents';
    const MAX_RECENT_CHANNELS = 10;

    // EPG URLs for Auto-loading
    let savedEpgUrls = [];
    const EPG_URLS_STORAGE_KEY = 'iptvPlayerEpgUrls';

    // Recommended EPGs List
    const recommendedEpgs = [
        { name: "Israel (epgshare01)", url: "https://epgshare01.online/epgshare01/epg_ripper_IL1.xml.gz" },
        { name: "UK (epgshare01)", url: "https://epgshare01.online/epgshare01/epg_ripper_UK1.xml.gz" },
        { name: "USA (epgshare01)", url: "https://epgshare01.online/epgshare01/epg_ripper_US1.xml.gz" },
        // Add more as needed
    ];

    // Curated Public M3U Playlists
    const curatedPublicPlaylists = [
        { name: "USA Channels (iptv-org)", url: "https://iptv-org.github.io/iptv/countries/us.m3u" },
        { name: "UK Channels (iptv-org)", url: "https://iptv-org.github.io/iptv/countries/gb.m3u" },
        { name: "News Channels (iptv-org)", url: "https://iptv-org.github.io/iptv/categories/news.m3u" },
        { name: "Music Channels (iptv-org)", url: "https://iptv-org.github.io/iptv/categories/music.m3u" },
        // { name: "Movies Channels (iptv-org)", url: "https://iptv-org.github.io/iptv/categories/movies.m3u" } // Often less stable
    ];


    // --- Initial Application Load Sequence ---
    loadFavorites(); 
    loadRecents();
    displayRecentChannels();
    loadEpgUrls();      
    loadAllSavedEpgs(); 
    // displayCuratedPlaylistsUI(); // Will be called after UI elements are confirmed


    // --- Event Listeners Setup ---
    loadM3uButton.addEventListener('click', loadM3UFromInput); // Renamed for clarity
    loadEpgButton.addEventListener('click', () => {
        const url = epgUrlInput.value.trim();
        const file = epgFileInput.files[0];
        if (url) fetchAndProcessSingleEpgUrl(url, true); 
        else if (file) loadEPGFromFile(file, true); 
        else showNotification('Please select an EPG file or enter a URL for manual loading.', 'error');
    });
    channelSearchInput.addEventListener('input', applyFilters);
    filterFavoritesButton.addEventListener('click', toggleFilterFavorites);
    openSettingsButton.addEventListener('click', openSettingsModal);
    closeSettingsButton.addEventListener('click', closeSettingsModal);
    addEpgUrlButton.addEventListener('click', handleAddEpgUrlToList);
    window.addEventListener('click', (event) => { 
        if (event.target === settingsModal) closeSettingsModal();
    });

    // --- Settings Modal Logic ---
    function openSettingsModal() {
        settingsModal.style.display = 'block';
        displaySavedEpgUrlsUI(); 
        displayRecommendedEpgsUI();
    }

    function closeSettingsModal() {
        settingsModal.style.display = 'none';
    }

    // --- EPG URL Management (in Settings) ---
    function loadEpgUrls() {
        const storedUrls = localStorage.getItem(EPG_URLS_STORAGE_KEY);
        if (storedUrls) {
            try { savedEpgUrls = JSON.parse(storedUrls); } 
            catch (e) { console.error("Error parsing saved EPG URLs:", e); savedEpgUrls = []; }
        }
    }

    function saveEpgUrls() {
        try { localStorage.setItem(EPG_URLS_STORAGE_KEY, JSON.stringify(savedEpgUrls)); } 
        catch (e) { console.error("Error saving EPG URLs:", e); showNotification("Could not save EPG URLs.", "error"); }
    }

    function displaySavedEpgUrlsUI() {
        epgUrlListUI.innerHTML = ''; 
        if (savedEpgUrls.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'No EPG URLs configured for auto-loading.';
            li.style.textAlign = 'center'; li.style.fontStyle = 'italic';
            epgUrlListUI.appendChild(li);
            return;
        }
        savedEpgUrls.forEach((url, index) => {
            const li = document.createElement('li');
            const urlSpan = document.createElement('span'); urlSpan.textContent = url;
            li.appendChild(urlSpan);
            const removeButton = document.createElement('button');
            removeButton.className = 'remove-epg-url-button'; removeButton.textContent = 'Remove';
            removeButton.title = `Remove ${url}`;
            removeButton.onclick = () => {
                savedEpgUrls.splice(index, 1); 
                saveEpgUrls(); displaySavedEpgUrlsUI(); 
                showNotification('EPG URL removed. Reload all EPGs or restart to see changes.', 'info', 4000);
            };
            li.appendChild(removeButton); epgUrlListUI.appendChild(li);
        });
    }

    function handleAddEpgUrlToList() {
        const newUrl = newEpgUrlInput.value.trim();
        if (!newUrl) return showNotification('Please enter an EPG URL.', 'error');
        if (!newUrl.toLowerCase().match(/\.(xml|xml\.gz)$/)) return showNotification('Invalid EPG URL. Must end with .xml or .xml.gz', 'error');
        if (savedEpgUrls.includes(newUrl)) return showNotification('This EPG URL is already in the list.', 'info');
        
        savedEpgUrls.push(newUrl);
        saveEpgUrls(); displaySavedEpgUrlsUI();
        newEpgUrlInput.value = ''; 
        showNotification('EPG URL added. Reload all EPGs or restart for it to take effect.', 'success', 4000);
    }

    function displayRecommendedEpgsUI() {
        recommendedEpgListUI.innerHTML = '';
        recommendedEpgs.forEach(epg => {
            const li = document.createElement('li');
            const nameSpan = document.createElement('span');
            nameSpan.textContent = epg.name;
            li.appendChild(nameSpan);

            const addButton = document.createElement('button');
            addButton.className = 'add-recommended-epg-button';
            addButton.textContent = 'Add';
            addButton.title = `Add ${epg.name} (${epg.url})`;
            addButton.onclick = () => {
                if (savedEpgUrls.includes(epg.url)) {
                    showNotification(`${epg.name} is already in your saved list.`, 'info');
                } else {
                    savedEpgUrls.push(epg.url);
                    saveEpgUrls();
                    displaySavedEpgUrlsUI(); 
                    showNotification(`${epg.name} added to your EPG list. Reload EPGs or restart.`, 'success', 4000);
                }
            };
            li.appendChild(addButton);
            recommendedEpgListUI.appendChild(li);
        });
    }
    
    // --- Automatic EPG Loading (on startup from saved URLs) ---
    async function loadAllSavedEpgs() {
        if (savedEpgUrls.length === 0) {
            console.log("No saved EPG URLs to auto-load.");
            const placeholder = epgDisplayDiv.querySelector('.epg-placeholder-message');
            if (placeholder) placeholder.textContent = 'No EPG sources configured. Add EPG URLs in Settings.';
            return;
        }
        showNotification(`Auto-loading ${savedEpgUrls.length} saved EPG source(s)...`, 'info', 2000);
        window.epgData = { channels: {}, programmes: {} }; 

        for (const url of savedEpgUrls) {
            await fetchAndProcessSingleEpgUrl(url, false); 
        }
        
        const numChannels = Object.keys(window.epgData.channels).length;
        const placeholder = epgDisplayDiv.querySelector('.epg-placeholder-message');
        if (placeholder) {
             if (numChannels > 0) placeholder.textContent = 'EPG data loaded. Select a channel for its guide.';
             else placeholder.textContent = 'Finished loading saved EPGs. No EPG data found or all sources failed.';
        }
        if (numChannels > 0) showNotification('All configured EPG sources processed.', 'success');
        else showNotification('Finished processing EPG sources, but no data was loaded.', 'info');
    }

    // --- Curated Playlists ---
    function displayCuratedPlaylistsUI() {
        const curatedPlaylistsListUI = document.getElementById('curatedPlaylistsList'); // Get element here
        if (!curatedPlaylistsListUI) {
            console.error("Curated playlists UI element not found!");
            return;
        }
        curatedPlaylistsListUI.innerHTML = ''; // Clear previous items

        if (curatedPublicPlaylists.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'No curated playlists available at the moment.';
            li.style.fontStyle = 'italic';
            curatedPlaylistsListUI.appendChild(li);
            return;
        }

        curatedPublicPlaylists.forEach(playlist => {
            const listItem = document.createElement('li');
            
            const nameSpan = document.createElement('span');
            nameSpan.textContent = playlist.name;
            listItem.appendChild(nameSpan);

            const loadButton = document.createElement('button');
            loadButton.textContent = 'Load';
            loadButton.title = `Load ${playlist.name}`;
            loadButton.className = 'load-curated-playlist-button'; // For specific styling if needed
            loadButton.onclick = () => {
                showNotification(`Loading channels from ${playlist.name}...`, 'info');
                // Directly fetch and process this M3U URL
                fetchM3U(playlist.url);
            };
            listItem.appendChild(loadButton);
            curatedPlaylistsListUI.appendChild(listItem);
        });
    }


    // --- Notification System ---
    function showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notificationsDiv.appendChild(notification);
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 500);
        }, duration);
    }

    // --- M3U Handling ---
    function loadM3UFromInput() { // Renamed from loadM3U to distinguish from direct URL load
        const file = m3uFileInput.files[0];
        const url = m3uUrlInput.value.trim();
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => processM3UContent(e.target.result);
            reader.onerror = () => showNotification('Error reading M3U file.', 'error');
            reader.readAsText(file);
        } else if (url) {
            fetchM3U(url); // Use the new generic fetch function
        } else {
            showNotification('Please select an M3U file or enter a URL.', 'error');
        }
    }

    function fetchM3U(url) { // Generic function to fetch M3U from a URL
        if (!url) return showNotification('M3U URL is invalid.', 'error');
        showNotification(`Fetching M3U from ${url}...`, 'info', 1500);
        fetch(url)
            .then(response => response.ok ? response.text() : Promise.reject(`HTTP error! status: ${response.status}`))
            .then(processM3UContent)
            .catch(error => showNotification(`Error fetching M3U from URL: ${error}. Check CORS policy.`, 'error', 5000));
    }


    function processM3UContent(content) {
        try {
            window.allChannels = m3uParser.parse(content);
            applyFilters(); 
            showNotification(`M3U loaded: ${window.allChannels.length} channels.`, 'success');
            displayRecentChannels(); 
        } catch (error) {
            showNotification(`Error parsing M3U: ${error.message}`, 'error');
            window.allChannels = [];
            applyFilters(); 
        }
    }
    
    // --- EPG File/URL processing (modified for single source handling & merging) ---
    async function fetchAndProcessSingleEpgUrl(url, clearPreviousGlobalEpg) {
        showNotification(`Fetching EPG from ${url}...`, 'info', 1500);
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const arrayBuffer = await response.arrayBuffer();
            
            let xmlString;
            if (url.toLowerCase().endsWith('.gz')) {
                xmlString = pako.ungzip(new Uint8Array(arrayBuffer), { to: 'string' });
            } else {
                xmlString = new TextDecoder('utf-8').decode(arrayBuffer);
            }
            processEPGContent(xmlString, url, clearPreviousGlobalEpg);
        } catch (error) {
            showNotification(`Error fetching EPG from ${url}: ${error.message}`, 'error', 5000);
        }
    }

    function loadEPGFromFile(file, clearPreviousGlobalEpg) {
        showNotification(`Loading EPG from file ${file.name}...`, 'info', 1500);
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const arrayBuffer = e.target.result;
                let xmlString;
                if (file.name.toLowerCase().endsWith('.gz')) {
                    xmlString = pako.ungzip(new Uint8Array(arrayBuffer), { to: 'string' });
                } else {
                    xmlString = new TextDecoder('utf-8').decode(arrayBuffer);
                }
                processEPGContent(xmlString, file.name, clearPreviousGlobalEpg);
            } catch (error) {
                showNotification(`Error processing EPG file ${file.name}: ${error.message}`, 'error');
            }
        };
        reader.onerror = () => {
            showNotification(`Error reading EPG file ${file.name}.`, 'error');
        }
        reader.readAsArrayBuffer(file);
    }

    function processEPGContent(xmlString, sourceName, clearPreviousGlobalEpg = false) {
        try {
            const parsedData = epgParser.parseEPG(xmlString);
            
            if (clearPreviousGlobalEpg) { 
                window.epgData = parsedData;
                showNotification(`EPG from ${sourceName} loaded, replacing previous EPG data.`, 'success');
            } else { 
                if (!window.epgData.channels) window.epgData.channels = {};
                if (!window.epgData.programmes) window.epgData.programmes = {};

                for (const channelId in parsedData.channels) {
                    if (!window.epgData.channels[channelId]) { 
                        window.epgData.channels[channelId] = parsedData.channels[channelId];
                    }
                }
                for (const channelId in parsedData.programmes) {
                    if (window.epgData.programmes[channelId]) {
                        window.epgData.programmes[channelId].push(...parsedData.programmes[channelId]);
                        window.epgData.programmes[channelId].sort((a,b) => a.start - b.start);
                    } else {
                        window.epgData.programmes[channelId] = parsedData.programmes[channelId];
                    }
                }
                showNotification(`EPG data from ${sourceName} merged.`, 'success', 2000);
            }

            const numChannels = Object.keys(window.epgData.channels).length;
            const numProgrammes = Object.values(window.epgData.programmes).reduce((sum, arr) => sum + arr.length, 0);
            console.log(`EPG total after '${sourceName}': ${numChannels} channels, ${numProgrammes} programmes.`);
            
            const placeholder = epgDisplayDiv.querySelector('.epg-placeholder-message');
            if (placeholder && numChannels > 0) {
                 placeholder.textContent = 'EPG data loaded. Select a channel for its guide.';
            }

        } catch (error) {
            showNotification(`Error parsing EPG XML from ${sourceName}: ${error.message}`, 'error');
        }
    }

    // --- Favorite Management ---
    function loadFavorites() {
        const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
        if (stored) {
            try { favoriteChannelIds = new Set(JSON.parse(stored)); }
            catch(e) { console.error("Error parsing favorites:", e); favoriteChannelIds = new Set(); }
        }
        updateFilterFavoritesButtonText();
    }

    function saveFavorites() {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(Array.from(favoriteChannelIds)));
    }

    function toggleFavorite(channelId, toggleElement) {
        if (!channelId) return showNotification("Channel ID missing for favorite toggle.", "error");
        if (favoriteChannelIds.has(channelId)) {
            favoriteChannelIds.delete(channelId);
            if (toggleElement) {
                toggleElement.classList.remove('is-favorite');
                toggleElement.innerHTML = '&#9734;'; 
            }
            showNotification("Removed from favorites.", "info", 1500);
        } else {
            favoriteChannelIds.add(channelId);
            if (toggleElement) {
                toggleElement.classList.add('is-favorite');
                toggleElement.innerHTML = '&#9733;'; 
            }
            showNotification("Added to favorites!", "success", 1500);
        }
        saveFavorites();
        if (showOnlyFavorites) applyFilters();
    }

    // --- Recent Channels Management ---
    function loadRecents() {
        const stored = localStorage.getItem(RECENTS_STORAGE_KEY);
        if (stored) {
            try { recentChannelIds = JSON.parse(stored); }
            catch(e) { console.error("Error parsing recents:", e); recentChannelIds = []; }
        }
    }

    function saveRecents() {
        localStorage.setItem(RECENTS_STORAGE_KEY, JSON.stringify(recentChannelIds));
    }

    function addChannelToRecents(channelId) {
        if (!channelId) return;
        recentChannelIds = recentChannelIds.filter(id => id !== channelId); 
        recentChannelIds.unshift(channelId); 
        if (recentChannelIds.length > MAX_RECENT_CHANNELS) {
            recentChannelIds.length = MAX_RECENT_CHANNELS; 
        }
        saveRecents();
        displayRecentChannels();
    }

    function displayRecentChannels() {
        recentChannelsListUI.innerHTML = '';
        if (recentChannelIds.length === 0) {
            const li = document.createElement('li');
            li.className = 'no-recents-message';
            li.textContent = 'No recent channels.';
            recentChannelsListUI.appendChild(li);
            return;
        }
        recentChannelIds.forEach(id => {
            const channel = window.allChannels.find(ch => ch.tvg_id === id);
            if (channel) {
                const li = document.createElement('li');
                li.textContent = channel.name || 'Unnamed Channel';
                li.title = channel.name || 'Unnamed Channel';
                li.addEventListener('click', () => {
                    playChannel(channel); 
                    if (channel.tvg_id) showEPGForChannel(channel.tvg_id);
                    else epgDisplayDiv.innerHTML = '<p class="epg-placeholder-message">Channel has no EPG ID.</p>';
                    
                    if (currentSelectedChannelItem) currentSelectedChannelItem.classList.remove('selected');
                    const mainListItem = Array.from(channelListDiv.querySelectorAll('.channel-item > span')).find(span => span.textContent === channel.name)?.parentElement;
                    if(mainListItem) {
                        mainListItem.classList.add('selected');
                        currentSelectedChannelItem = mainListItem;
                        const listRect = channelListDiv.getBoundingClientRect();
                        const itemRect = mainListItem.getBoundingClientRect();
                        if (itemRect.top < listRect.top || itemRect.bottom > listRect.bottom) {
                             mainListItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }
                    }
                });
                recentChannelsListUI.appendChild(li);
            }
        });
    }

    // --- Filtering and Display ---
    function toggleFilterFavorites() {
        showOnlyFavorites = !showOnlyFavorites;
        updateFilterFavoritesButtonText();
        applyFilters();
    }

    function updateFilterFavoritesButtonText() {
        filterFavoritesButton.textContent = showOnlyFavorites ? "Show All Channels" : "Show Favorites Only";
        filterFavoritesButton.title = showOnlyFavorites ? "Display all loaded channels" : "Display only favorite channels";
    }

    function applyFilters() {
        const searchTerm = channelSearchInput.value.toLowerCase().trim();
        let channels = window.allChannels;
        if (showOnlyFavorites) {
            channels = channels.filter(ch => favoriteChannelIds.has(ch.tvg_id));
        }
        if (searchTerm) {
            channels = channels.filter(ch => 
                (ch.name && ch.name.toLowerCase().includes(searchTerm)) ||
                (ch.tvg_id && ch.tvg_id.toLowerCase().includes(searchTerm)) ||
                (ch.group_title && ch.group_title.toLowerCase().includes(searchTerm))
            );
        }
        displayChannels(channels);
    }

    function displayChannels(channelsToDisplay) {
        channelListDiv.innerHTML = '';
        if (!channelsToDisplay || channelsToDisplay.length === 0) {
            const p = document.createElement('p');
            p.className = 'channel-list-empty-message';
            let msg = 'No channels loaded.';
            if (window.allChannels.length > 0) {
                msg = showOnlyFavorites ? 'No favorite channels' : 'No channels';
                if (channelSearchInput.value) msg += ' match your search.'; else msg += '.';
            }
            p.textContent = msg;
            channelListDiv.appendChild(p);
            return;
        }

        const grouped = channelsToDisplay.reduce((acc, ch) => {
            const group = ch.group_title || 'Uncategorized';
            if (!acc[group]) acc[group] = [];
            acc[group].push(ch);
            return acc;
        }, {});

        for (const groupName in grouped) {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'channel-group-title';
            groupDiv.textContent = groupName;
            channelListDiv.appendChild(groupDiv);
            grouped[groupName].forEach(channel => {
                const item = document.createElement('div');
                item.className = 'channel-item';
                const logo = document.createElement('img');
                if (channel.tvg_logo) {
                    logo.src = channel.tvg_logo;
                    logo.alt = "";
                    logo.onerror = () => logo.style.display = 'none';
                } else {
                    logo.style.display = 'none';
                }
                item.appendChild(logo);
                const nameSpan = document.createElement('span');
                nameSpan.textContent = channel.name || 'Unnamed';
                item.appendChild(nameSpan);
                const favToggle = document.createElement('span');
                favToggle.className = 'favorite-toggle';
                favToggle.innerHTML = favoriteChannelIds.has(channel.tvg_id) ? '&#9733;' : '&#9734;';
                if (favoriteChannelIds.has(channel.tvg_id)) favToggle.classList.add('is-favorite');
                favToggle.title = "Toggle favorite";
                favToggle.onclick = (e) => {
                    e.stopPropagation();
                    toggleFavorite(channel.tvg_id, favToggle);
                };
                item.appendChild(favToggle);
                item.onclick = () => {
                    playChannel(channel);
                    if (channel.tvg_id) showEPGForChannel(channel.tvg_id);
                    else epgDisplayDiv.innerHTML = '<p class="epg-placeholder-message">No EPG ID for this channel.</p>';
                    if (currentSelectedChannelItem) currentSelectedChannelItem.classList.remove('selected');
                    item.classList.add('selected');
                    currentSelectedChannelItem = item;
                };
                channelListDiv.appendChild(item);
            });
        }
    }

    // --- Playback ---
    function playChannel(channel) {
        if (!channel || !channel.url) return showNotification('Channel URL missing.', 'error');
        
        if (window.currentHlsInstance) {
            window.currentHlsInstance.destroy();
            window.currentHlsInstance = null;
        }

        if (channel.tvg_id) { 
            addChannelToRecents(channel.tvg_id);
        }

        const streamUrl = channel.url;
        const isHls = streamUrl.toLowerCase().endsWith('.m3u8');

        if (isHls && typeof Hls !== 'undefined' && Hls.isSupported()) {
            const hls = new Hls();
            window.currentHlsInstance = hls;
            hls.loadSource(streamUrl);
            hls.attachMedia(player);
            hls.on(Hls.Events.MANIFEST_PARSED, () => player.play().catch(e => showNotification(`Play error: ${e.message}`, 'error')));
            hls.on(Hls.Events.ERROR, (event, data) => {
                if (data.fatal) {
                    showNotification(`HLS Error: ${data.details || data.type}`, 'error', 5000);
                    if (data.type === Hls.ErrorTypes.MEDIA_ERROR) hls.recoverMediaError();
                    else { hls.destroy(); window.currentHlsInstance = null; }
                } else console.warn('HLS non-fatal error:', data.type, data.details);
            });
        } else {
            player.src = streamUrl;
            player.load();
            player.play().catch(e => showNotification(`Play error: ${e.message}`, 'error'));
        }
    }

    // --- EPG Display ---
    function formatTime(date) {
        if (!date || !(date instanceof Date) || isNaN(date.getTime())) return 'N/A';
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    }

    function showEPGForChannel(channelTvgId) {
        epgDisplayDiv.innerHTML = '';
        if (!window.epgData || !window.epgData.programmes || !window.epgData.channels) {
            epgDisplayDiv.innerHTML = '<p class="epg-placeholder-message">EPG data not loaded.</p>';
            return;
        }
        const details = window.epgData.channels[channelTvgId];
        const programs = window.epgData.programmes[channelTvgId] || [];
        if (!details) {
            epgDisplayDiv.innerHTML = `<p class="epg-placeholder-message">No EPG info for ID: ${channelTvgId}.</p>`;
            return;
        }
        const header = document.createElement('h3');
        header.textContent = details.displayName || 'Unknown Channel';
        epgDisplayDiv.appendChild(header);
        if (programs.length === 0) {
            epgDisplayDiv.innerHTML += '<p class="epg-placeholder-message">No programs for this channel.</p>';
            return;
        }
        programs.sort((a, b) => a.start - b.start); 
        const now = new Date();
        const ul = document.createElement('ul');
        let currentProgFound = false;
        programs.forEach(prog => {
            const li = document.createElement('li');
            li.className = 'epg-program';
            const isCurrent = prog.start <= now && prog.stop > now;
            if (isCurrent) {
                li.classList.add('current');
                currentProgFound = true;
            }
            if (isCurrent && ul.childElementCount > 2) {
                setTimeout(() => li.scrollIntoView({ behavior: 'smooth', block: 'center' }), 0);
            }
            const timeDiv = document.createElement('div');
            timeDiv.className = 'epg-program-time';
            timeDiv.textContent = `${formatTime(prog.start)} - ${formatTime(prog.stop)}`;
            li.appendChild(timeDiv);
            const titleDiv = document.createElement('div');
            titleDiv.className = 'epg-program-title';
            titleDiv.textContent = prog.title || 'Untitled';
            li.appendChild(titleDiv);
            if (prog.description) {
                const descDiv = document.createElement('div');
                descDiv.className = 'epg-program-description';
                descDiv.textContent = prog.description;
                descDiv.onclick = () => descDiv.classList.toggle('visible');
                li.appendChild(descDiv);
            }
            ul.appendChild(li);
        });
        epgDisplayDiv.appendChild(ul);
        if (!currentProgFound && ul.firstChild) {
            setTimeout(() => ul.firstChild.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
        }
    }

    // Call at the end of DOMContentLoaded to ensure all UI elements are available
    const curatedPlaylistsListUI = document.getElementById('curatedPlaylistsList');
    if (curatedPlaylistsListUI) { // Check if the element exists
        displayCuratedPlaylistsUI();
    } else {
        console.warn("Curated playlists UI element ('curatedPlaylistsList') not found in HTML. This feature might not display.");
    }
});
```
