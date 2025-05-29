/**
 * epg-parser.js
 * Parses XMLTV EPG data.
 */
class EPGParser {
    constructor() {}

    parseEPG(xmlString) {
        const epgChannels = {};
        const epgProgrammes = {};

        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, "text/xml");

            // Check for parsing errors
            const parseError = xmlDoc.getElementsByTagName("parsererror");
            if (parseError.length > 0) {
                console.error("XML Parsing Error:", parseError[0].textContent);
                throw new Error("Failed to parse XML. Check console for details.");
            }
            
            // Check for root <tv> element
            if (!xmlDoc.documentElement || xmlDoc.documentElement.tagName !== 'tv') {
                console.warn("No <tv> root element found. This might not be a valid XMLTV file.");
                // Decide if this should be a hard error or a warning
                // For now, let's proceed but it's likely to find no channels/programmes
            }


            // Channel Data Extraction
            const channelElements = xmlDoc.getElementsByTagName("channel");
            for (let i = 0; i < channelElements.length; i++) {
                const channelElement = channelElements[i];
                const id = channelElement.getAttribute("id");
                if (!id) continue; // Skip channels without ID

                let displayName = "";
                const displayNameElement = channelElement.getElementsByTagName("display-name")[0];
                if (displayNameElement) {
                    displayName = displayNameElement.textContent.trim();
                }

                let icon = "";
                const iconElement = channelElement.getElementsByTagName("icon")[0];
                if (iconElement && iconElement.hasAttribute("src")) {
                    icon = iconElement.getAttribute("src");
                }

                epgChannels[id] = { id: id, displayName: displayName, icon: icon };
            }

            // Programme Data Extraction
            const programmeElements = xmlDoc.getElementsByTagName("programme");
            for (let i = 0; i < programmeElements.length; i++) {
                const programmeElement = programmeElements[i];
                const channelId = programmeElement.getAttribute("channel");
                const startStr = programmeElement.getAttribute("start");
                const stopStr = programmeElement.getAttribute("stop");

                if (!channelId || !startStr || !stopStr) continue; // Skip programmes with missing essential attributes

                let title = "";
                const titleElement = programmeElement.getElementsByTagName("title")[0];
                if (titleElement) {
                    title = titleElement.textContent.trim();
                }

                let description = "";
                const descElement = programmeElement.getElementsByTagName("desc")[0];
                if (descElement) {
                    description = descElement.textContent.trim();
                }

                // Parse dates - XMLTV format is usually like "20230811100000 +0000"
                // new Date() can often handle this, but might need more robust parsing for timezones
                const startDate = this.parseXMLTVDate(startStr);
                const stopDate = this.parseXMLTVDate(stopStr);

                if (!startDate || !stopDate) {
                    console.warn(`Could not parse date for programme: ${title} on channel ${channelId}. Start: ${startStr}, Stop: ${stopStr}`);
                    continue;
                }


                if (!epgProgrammes[channelId]) {
                    epgProgrammes[channelId] = [];
                }
                epgProgrammes[channelId].push({
                    channel: channelId,
                    start: startDate,
                    stop: stopDate,
                    title: title,
                    description: description
                });
            }

            return { channels: epgChannels, programmes: epgProgrammes };

        } catch (error) {
            console.error("Error parsing EPG data:", error);
            throw error; // Re-throw the error to be caught by the caller
        }
    }

    /**
     * Parses an XMLTV date string into a JavaScript Date object.
     * XMLTV date format: YYYYMMDDHHMMSS [+-]HHMM (e.g., "20230811100000 +0000")
     * @param {string} dateStr The XMLTV date string.
     * @returns {Date|null} A Date object or null if parsing fails.
     */
    parseXMLTVDate(dateStr) {
        if (!dateStr || dateStr.length < 14) return null;

        const year = dateStr.substring(0, 4);
        const month = dateStr.substring(4, 6);
        const day = dateStr.substring(6, 8);
        const hours = dateStr.substring(8, 10);
        const minutes = dateStr.substring(10, 12);
        const seconds = dateStr.substring(12, 14);

        // Construct a date string that JS Date constructor can reliably parse
        // ISO 8601 format: YYYY-MM-DDTHH:mm:ss
        let isoStr = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

        // Handle timezone offset if present
        if (dateStr.length > 14) {
            const tzPart = dateStr.substring(15); // e.g., "+0000" or "-0500"
            if ((tzPart.startsWith('+') || tzPart.startsWith('-')) && tzPart.length === 5) {
                isoStr += `${tzPart.substring(0,3)}:${tzPart.substring(3,5)}`; // Convert +HHMM to +HH:MM
            } else if (tzPart.toLowerCase() === 'z') {
                isoStr += 'Z';
            }
            // If timezone is missing or malformed, it will be parsed as local time by default, which might be incorrect.
        } else {
            // If no timezone info, it's ambiguous. XMLTV spec implies UTC if omitted, but new Date() might use local.
            // For consistency, one might append 'Z' to assume UTC if no offset is given.
            // However, many files might intend local time. This is a common ambiguity.
            // For now, let new Date() handle it as it does (usually local if no Z or offset).
        }
        
        const dateObj = new Date(isoStr);
        if (isNaN(dateObj.getTime())) { // Check if date is valid
            // Fallback for some browsers/environments if the above fails, try a simpler format (less accurate for timezones)
            // This is just an example, might not be needed or might need other variations.
            const fallbackDate = new Date(
                parseInt(year),
                parseInt(month) - 1, // Month is 0-indexed
                parseInt(day),
                parseInt(hours),
                parseInt(minutes),
                parseInt(seconds)
            );
             if (isNaN(fallbackDate.getTime())) return null;
             return fallbackDate;
        }
        return dateObj;
    }
}

// For Node.js environment / CommonJS modules (if run directly or for testing)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EPGParser;
}
```
