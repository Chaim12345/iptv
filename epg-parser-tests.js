// epg-parser-tests.js
function runEPGTests() {
    let results = [];
    const parser = new EPGParser();

    // --- Helper for assertions ---
    function assert(condition, message, testName) {
        if (condition) {
            results.push({ name: testName, passed: true });
        } else {
            results.push({ name: testName, passed: false, error: message });
        }
    }

    function assertThrows(fn, expectedErrorMessageSubstring, testName) {
        try {
            fn();
            results.push({ name: testName, passed: false, error: "Expected function to throw an error, but it did not." });
        } catch (e) {
            if (e.message.includes(expectedErrorMessageSubstring)) {
                results.push({ name: testName, passed: true });
            } else {
                results.push({ name: testName, passed: false, error: `Expected error message to include "${expectedErrorMessageSubstring}", but got "${e.message}"` });
            }
        }
    }

    // --- Test Case 1: Basic EPG Parse ---
    const testBasicEPGParse = () => {
        const xmlContent = `
            <tv>
                <channel id="ch1">
                    <display-name lang="en">Channel 1</display-name>
                    <icon src="http://logo.server/ch1.png"/>
                </channel>
                <programme channel="ch1" start="20231026080000 +0000" stop="20231026090000 +0000">
                    <title lang="en">Morning News</title>
                    <desc lang="en">The morning news broadcast.</desc>
                </programme>
            </tv>`;
        const epg = parser.parseEPG(xmlContent);

        assert(typeof epg.channels === 'object' && epg.channels !== null, "EPG should have a channels object", "Basic EPG: Channels Object");
        assert(typeof epg.programmes === 'object' && epg.programmes !== null, "EPG should have a programmes object", "Basic EPG: Programmes Object");
        assert(Object.keys(epg.channels).length === 1, "Should parse 1 EPG channel", "Basic EPG: Channel Count");
        
        if (epg.channels["ch1"]) {
            assert(epg.channels["ch1"].displayName === "Channel 1", "Basic EPG: Channel Display Name", "Basic EPG: Channel Display Name");
            assert(epg.channels["ch1"].icon === "http://logo.server/ch1.png", "Basic EPG: Channel Icon", "Basic EPG: Channel Icon");
        } else {
            results.push({ name: "Basic EPG: Channel ch1 data", passed: false, error: "Channel ch1 not found in parsed data." });
        }

        assert(epg.programmes["ch1"] && epg.programmes["ch1"].length === 1, "Should parse 1 programme for ch1", "Basic EPG: Programme Count");
        if (epg.programmes["ch1"] && epg.programmes["ch1"].length === 1) {
            const prog = epg.programmes["ch1"][0];
            assert(prog.title === "Morning News", "Basic EPG: Programme Title", "Basic EPG: Programme Title");
            assert(prog.description === "The morning news broadcast.", "Basic EPG: Programme Description", "Basic EPG: Programme Description");
            assert(prog.start instanceof Date && !isNaN(prog.start), "Basic EPG: Programme Start Date is valid", "Basic EPG: Programme Start Date");
            // Check specific date parts if necessary, e.g. prog.start.getUTCHours() === 8
            assert(prog.start.getUTCFullYear() === 2023, "Basic EPG: Programme Start Year", "Basic EPG: Programme Start Year");
            assert(prog.start.getUTCMonth() === 9, "Basic EPG: Programme Start Month (0-indexed)", "Basic EPG: Programme Start Month"); // Month is 0-indexed
            assert(prog.start.getUTCDate() === 26, "Basic EPG: Programme Start Day", "Basic EPG: Programme Start Day");
            assert(prog.start.getUTCHours() === 8, "Basic EPG: Programme Start Hours", "Basic EPG: Programme Start Hours");
        }
    };
    try { testBasicEPGParse(); } catch (e) { results.push({ name: "Basic EPG Parse Suite", passed: false, error: e.toString() }); }

    // --- Test Case 2: Malformed XML (no <tv> root) ---
    const testMalformedXML = () => {
        const xmlContent = `<channel id="ch1"><display-name>Channel 1</display-name></channel>`;
        // The current parser logs a warning but might proceed and return empty data, or throw.
        // Let's assume it should not throw immediately for just missing <tv> but find no data.
        // If specific error throwing for this is desired, the parser needs adjustment.
        const epg = parser.parseEPG(xmlContent);
        assert(Object.keys(epg.channels).length === 0, "Malformed XML: No channels expected", "Malformed XML: Channel Count");
        assert(Object.keys(epg.programmes).length === 0, "Malformed XML: No programmes expected", "Malformed XML: Programme Count");
    };
    try { testMalformedXML(); } catch (e) { results.push({ name: "Malformed XML Suite", passed: false, error: e.toString() }); }

    // --- Test Case 3: Empty XML String ---
    const testEmptyXML = () => {
        assertThrows(() => parser.parseEPG(""), "Failed to parse XML", "Empty XML String");
    };
    try { testEmptyXML(); } catch (e) { results.push({ name: "Empty XML String Suite", passed: false, error: e.toString() }); }

    // --- Test Case 4: Channel with missing display-name or icon ---
    const testChannelMissingInfo = () => {
        const xmlContent = `
            <tv>
                <channel id="ch2"></channel>
                <channel id="ch3">
                    <display-name>Channel 3 Only Name</display-name>
                </channel>
                 <channel id="ch4">
                    <icon src="icon4.png"/>
                </channel>
            </tv>`;
        const epg = parser.parseEPG(xmlContent);
        assert(Object.keys(epg.channels).length === 3, "Channel Missing Info: Channel Count", "Channel Missing Info: Channel Count");
        if (epg.channels["ch2"]) {
            assert(epg.channels["ch2"].displayName === "", "Channel Missing Info: ch2 displayName default", "Channel Missing Info: ch2 displayName");
            assert(epg.channels["ch2"].icon === "", "Channel Missing Info: ch2 icon default", "Channel Missing Info: ch2 icon");
        }
        if (epg.channels["ch3"]) {
            assert(epg.channels["ch3"].displayName === "Channel 3 Only Name", "Channel Missing Info: ch3 displayName", "Channel Missing Info: ch3 displayName");
            assert(epg.channels["ch3"].icon === "", "Channel Missing Info: ch3 icon default", "Channel Missing Info: ch3 icon");
        }
         if (epg.channels["ch4"]) {
            assert(epg.channels["ch4"].displayName === "", "Channel Missing Info: ch4 displayName default", "Channel Missing Info: ch4 displayName");
            assert(epg.channels["ch4"].icon === "icon4.png", "Channel Missing Info: ch4 icon", "Channel Missing Info: ch4 icon");
        }
    };
    try { testChannelMissingInfo(); } catch (e) { results.push({ name: "Channel Missing Info Suite", passed: false, error: e.toString() }); }

    // --- Test Case 5: Programme with missing attributes ---
    const testProgrammeMissingAttributes = () => {
        const xmlContent = `
            <tv>
                <channel id="ch1"><display-name>C1</display-name></channel>
                <programme channel="ch1" start="20231026100000 +0000"> <!-- Missing stop -->
                    <title>Prog 1</title>
                </programme>
                <programme channel="ch1" stop="20231026120000 +0000"> <!-- Missing start -->
                    <title>Prog 2</title>
                </programme>
                 <programme start="20231026120000 +0000" stop="20231026130000 +0000"> <!-- Missing channel -->
                    <title>Prog 3</title>
                </programme>
            </tv>`;
        const epg = parser.parseEPG(xmlContent);
        // Programmes with missing essential attributes (channel, start, stop) should be skipped.
        assert(epg.programmes["ch1"] === undefined || epg.programmes["ch1"].length === 0, 
               "Programme Missing Attrs: ch1 should have 0 valid programmes", "Programme Missing Attrs: ch1 Programme Count");
    };
    try { testProgrammeMissingAttributes(); } catch (e) { results.push({ name: "Programme Missing Attributes Suite", passed: false, error: e.toString() }); }


    // --- Test Case 6: Date parsing for different timezone formats ---
    const testDateParsing = () => {
        // Test YYYYMMDDHHMMSS (no timezone - should parse as local or UTC based on parser's default choice)
        // Current parser's parseXMLTVDate might interpret this as local.
        // For consistency, let's assume it defaults to UTC if no offset, or that test environment is UTC.
        const date1 = parser.parseXMLTVDate("20231101100000");
        assert(date1 && date1.getUTCFullYear() === 2023 && date1.getUTCMonth() === 10 && date1.getUTCDate() === 1 && date1.getUTCHours() === 10, 
               "Date Parsing: No Timezone (YYYYMMDDHHMMSS)", "Date Parsing: No Timezone");

        // Test YYYYMMDDHHMMSS +HHMM
        const date2 = parser.parseXMLTVDate("20231101100000 +0200");
        assert(date2 && date2.getUTCFullYear() === 2023 && date2.getUTCMonth() === 10 && date2.getUTCDate() === 1 && date2.getUTCHours() === 8,
               "Date Parsing: With +HHMM Timezone", "Date Parsing: With +HHMM Timezone");
        
        // Test YYYYMMDDHHMMSS -HHMM
        const date3 = parser.parseXMLTVDate("20231101100000 -0500");
        assert(date3 && date3.getUTCFullYear() === 2023 && date3.getUTCMonth() === 10 && date3.getUTCDate() === 1 && date3.getUTCHours() === 15,
               "Date Parsing: With -HHMM Timezone", "Date Parsing: With -HHMM Timezone");

        // Test invalid date string
        const date4 = parser.parseXMLTVDate("invaliddate");
        assert(date4 === null, "Date Parsing: Invalid Date String", "Date Parsing: Invalid Date String");

        const date5 = parser.parseXMLTVDate("20231101100000 Z"); // ISO 8601 UTC indicator
         assert(date5 && date5.getUTCFullYear() === 2023 && date5.getUTCMonth() === 10 && date5.getUTCDate() === 1 && date5.getUTCHours() === 10, 
               "Date Parsing: With Z Timezone", "Date Parsing: With Z Timezone");

    };
    try { testDateParsing(); } catch (e) { results.push({ name: "Date Parsing Suite", passed: false, error: e.toString() }); }

    // --- Test Case 7: Multiple programmes for a channel ---
    const testMultipleProgrammes = () => {
        const xmlContent = `
            <tv>
                <channel id="chMulti"><display-name>MultiProg Channel</display-name></channel>
                <programme channel="chMulti" start="20231026100000 +0000" stop="20231026110000 +0000">
                    <title>Show A</title>
                </programme>
                <programme channel="chMulti" start="20231026110000 +0000" stop="20231026120000 +0000">
                    <title>Show B</title>
                </programme>
            </tv>`;
        const epg = parser.parseEPG(xmlContent);
        assert(epg.programmes["chMulti"] && epg.programmes["chMulti"].length === 2, 
               "Multiple Programmes: Count for chMulti", "Multiple Programmes: Count");
        if (epg.programmes["chMulti"] && epg.programmes["chMulti"].length === 2) {
            assert(epg.programmes["chMulti"][0].title === "Show A" && epg.programmes["chMulti"][1].title === "Show B",
                   "Multiple Programmes: Titles Correct", "Multiple Programmes: Titles");
        }
    };
    try { testMultipleProgrammes(); } catch (e) { results.push({ name: "Multiple Programmes Suite", passed: false, error: e.toString() }); }

    // --- Test Case 8: XML with parsing error (e.g. unclosed tag) ---
    const testXMLParsingError = () => {
        const xmlContent = `<tv><channel id="ch1"><display-name>Channel 1</unclosed></channel></tv>`;
        // The DOMParser usually returns a parsererror document.
        // The current EPGParser is set to throw an error if parsererror tag is found.
        assertThrows(() => parser.parseEPG(xmlContent), "Failed to parse XML", "XML Parsing Error Detection");
    };
    try { testXMLParsingError(); } catch (e) { results.push({ name: "XML Parsing Error Suite", passed: false, error: e.toString() }); }


    return results;
}
```
