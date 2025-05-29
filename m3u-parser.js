/**
 * M3UParser.js
 * Parses M3U and M3U8 playlists.
 */
class M3UParser {
    constructor() {
        this.reset();
    }

    reset() {
        this._streams = [];
        this._currentStreamInfo = {}; // Holds data for the current #EXTINF before URL is found
    }

    _parseExtinfLine(line) {
        // Example line: #EXTINF:-1 tvg-id="id" tvg-name="name" group-title="group",Channel Title
        const lineContent = line.substring(line.indexOf(':') + 1).trim();

        // Initialize defaults
        let duration = -1;
        let tvgId = null;
        let tvgName = null;
        let tvgLogo = null;
        let groupTitle = null;
        let name = null; // This is the channel title from after the comma

        const parts = lineContent.split(/,(.+)/s); // Split by the first comma, keep rest as name
        const durationAndAttributesStr = parts[0].trim();
        
        if (parts.length > 1 && parts[1]) {
            name = parts[1].trim();
        }

        const subParts = durationAndAttributesStr.split(/\s+/); // Split by space
        const durationStr = subParts[0].trim();

        try {
            if (durationStr) {
                duration = parseInt(parseFloat(durationStr), 10);
                if (isNaN(duration)) {
                    duration = -1; // Fallback if parsing results in NaN
                    // console.warn(`Invalid duration '${durationStr}' in EXTINF line: '${line}'. Using default -1.`);
                }
            }
        } catch (e) {
            // console.warn(`Error parsing duration '${durationStr}' in EXTINF line: '${line}'. Using default -1.`);
            duration = -1; // Ensure default on error
        }
        
        // Join remaining parts for attributes string
        const attributesStr = subParts.slice(1).join(' ').trim();

        if (attributesStr) {
            const attrPattern = /([a-zA-Z0-9\-]+)=("([^"]*)"|([^\s,]+))/g;
            let match;
            while ((match = attrPattern.exec(attributesStr)) !== null) {
                const key = match[1].toLowerCase().trim();
                const value = (match[3] !== undefined ? match[3] : match[4]).trim();

                switch (key) {
                    case "tvg-id":
                        tvgId = value;
                        break;
                    case "tvg-name":
                        tvgName = value;
                        break;
                    case "tvg-logo":
                        tvgLogo = value;
                        break;
                    case "group-title":
                        groupTitle = value;
                        break;
                }
            }
        }

        this._currentStreamInfo = {
            name: name,
            url: null,
            duration: duration,
            tvg_id: tvgId,
            tvg_name: tvgName,
            tvg_logo: tvgLogo,
            group_title: groupTitle,
        };
    }

    parse(content) {
        this.reset();
        const lines = content.split(/\r?\n/);

        if (!lines.length || lines[0].trim() !== "#EXTM3U") {
            throw new Error("Invalid M3U file: Missing or incorrect #EXTM3U header.");
        }

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            if (!line) { // Skip empty lines
                continue;
            }

            if (line.startsWith("#EXTINF:")) {
                if (this._currentStreamInfo && this._currentStreamInfo.duration !== undefined && this._currentStreamInfo.url === null) {
                    // console.warn(`Orphaned #EXTINF data (no URL followed): ${JSON.stringify(this._currentStreamInfo)}`);
                }
                this._parseExtinfLine(line);
            } else if (line.startsWith("#")) {
                // console.info(`Ignoring M3U directive or comment: ${line}`);
            } else { // Should be a URL
                if (this._currentStreamInfo && this._currentStreamInfo.duration !== undefined) {
                    this._currentStreamInfo.url = line;
                    this._streams.push(this._currentStreamInfo);
                    this._currentStreamInfo = {}; // Reset for the next entry
                } else {
                    // console.warn(`Found URL '${line}' without a preceding #EXTINF directive. Ignoring this URL.`);
                }
            }
        }

        if (this._currentStreamInfo && this._currentStreamInfo.duration !== undefined && this._currentStreamInfo.url === null) {
            // console.warn(`Orphaned #EXTINF data at end of file (no URL followed): ${JSON.stringify(this._currentStreamInfo)}`);
        }

        return this._streams;
    }
}

// For Node.js environment / CommonJS modules (if run directly or for testing)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = M3UParser;
}
```
