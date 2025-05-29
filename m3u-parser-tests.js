// m3u-parser-tests.js
function runM3UTests() {
    let results = [];
    const parser = new M3UParser();

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

    // --- Test Case 1: Basic M3U Parse ---
    const testBasicParse = () => {
        parser.reset(); // Ensure parser is clean
        const m3uContent = `#EXTM3U\n#EXTINF:-1 tvg-id="ch1" tvg-name="Channel 1" group-title="News",Channel One Display\nhttp://server.com/stream1`;
        const channels = parser.parse(m3uContent);
        assert(channels.length === 1, "Should parse 1 channel", "Basic Parse: Channel Count");
        if (channels.length === 1) {
            const ch = channels[0];
            assert(ch.name === "Channel One Display", `Expected name "Channel One Display", got "${ch.name}"`, "Basic Parse: Channel Name");
            assert(ch.url === "http://server.com/stream1", `Expected URL "http://server.com/stream1", got "${ch.url}"`, "Basic Parse: Channel URL");
            assert(ch.duration === -1, `Expected duration -1, got "${ch.duration}"`, "Basic Parse: Duration");
            assert(ch.tvg_id === "ch1", `Expected tvg-id "ch1", got "${ch.tvg_id}"`, "Basic Parse: TVG ID");
            assert(ch.tvg_name === "Channel 1", `Expected tvg-name "Channel 1", got "${ch.tvg_name}"`, "Basic Parse: TVG Name");
            assert(ch.group_title === "News", `Expected group-title "News", got "${ch.group_title}"`, "Basic Parse: Group Title");
        }
    };
    try { testBasicParse(); } catch (e) { results.push({ name: "Basic M3U Parse Suite", passed: false, error: e.toString() }); }

    // --- Test Case 2: Missing #EXTM3U Header ---
    const testMissingHeader = () => {
        parser.reset();
        const m3uContent = `#EXTINF:-1,Channel 1\nhttp://stream1`;
        assertThrows(() => parser.parse(m3uContent), "Missing or incorrect #EXTM3U header", "Missing Header");
    };
    try { testMissingHeader(); } catch (e) { results.push({ name: "Missing Header Suite", passed: false, error: e.toString() }); }


    // --- Test Case 3: Empty M3U Content ---
    const testEmptyContent = () => {
        parser.reset();
        const m3uContent = ``;
        assertThrows(() => parser.parse(m3uContent), "Missing or incorrect #EXTM3U header", "Empty Content");
    };
    try { testEmptyContent(); } catch (e) { results.push({ name: "Empty Content Suite", passed: false, error: e.toString() }); }

    // --- Test Case 4: Only #EXTM3U Header ---
    const testHeaderOnly = () => {
        parser.reset();
        const m3uContent = `#EXTM3U`;
        const channels = parser.parse(m3uContent);
        assert(channels.length === 0, "Should parse 0 channels for header-only M3U", "Header Only: Channel Count");
    };
    try { testHeaderOnly(); } catch (e) { results.push({ name: "Header Only Suite", passed: false, error: e.toString() }); }


    // --- Test Case 5: Attributes with unquoted values and mixed case ---
    const testUnquotedAttributes = () => {
        parser.reset();
        const m3uContent = `#EXTM3U\n#EXTINF:-1 tvg-id=ch2 Tvg-Name=Channel2 group-title=Sports,Channel Two\nhttp://server.com/stream2`;
        const channels = parser.parse(m3uContent);
        assert(channels.length === 1, "Unquoted Attrs: Channel Count", "Unquoted Attrs: Channel Count");
        if (channels.length === 1) {
            const ch = channels[0];
            assert(ch.name === "Channel Two", "Unquoted Attrs: Channel Name", "Unquoted Attrs: Channel Name");
            assert(ch.tvg_id === "ch2", "Unquoted Attrs: TVG ID", "Unquoted Attrs: TVG ID");
            assert(ch.tvg_name === "Channel2", "Unquoted Attrs: TVG Name", "Unquoted Attrs: TVG Name");
            assert(ch.group_title === "Sports", "Unquoted Attrs: Group Title", "Unquoted Attrs: Group Title");
        }
    };
    try { testUnquotedAttributes(); } catch (e) { results.push({ name: "Unquoted Attributes Suite", passed: false, error: e.toString() }); }

    // --- Test Case 6: Missing some attributes ---
    const testMissingAttributes = () => {
        parser.reset();
        const m3uContent = `#EXTM3U\n#EXTINF:3600 tvg-logo="logo.png",Channel With Logo Only\nhttp://server.com/stream3`;
        const channels = parser.parse(m3uContent);
        assert(channels.length === 1, "Missing Attrs: Channel Count", "Missing Attrs: Channel Count");
        if (channels.length === 1) {
            const ch = channels[0];
            assert(ch.name === "Channel With Logo Only", "Missing Attrs: Name", "Missing Attrs: Name");
            assert(ch.duration === 3600, `Expected duration 3600, got ${ch.duration}`, "Missing Attrs: Duration");
            assert(ch.tvg_logo === "logo.png", "Missing Attrs: TVG Logo", "Missing Attrs: TVG Logo");
            assert(ch.tvg_id === null, "Missing Attrs: TVG ID should be null", "Missing Attrs: TVG ID");
            assert(ch.group_title === null, "Missing Attrs: Group Title should be null", "Missing Attrs: Group Title");
        }
    };
    try { testMissingAttributes(); } catch (e) { results.push({ name: "Missing Attributes Suite", passed: false, error: e.toString() }); }

    // --- Test Case 7: Comments and unknown directives ---
    const testCommentsAndUnknowns = () => {
        parser.reset();
        const m3uContent = `#EXTM3U\n#THIS IS A COMMENT\n#EXTINF:-1,Channel X\n#EXTVLCOPT:option1\nhttp://streamX\n#EXTGRP:News`;
        const channels = parser.parse(m3uContent);
        // The parser should ignore comments and unknown directives like #EXTGRP when it's not tied to an entry.
        // The current M3UParser logic logs these but doesn't store them with channel entries unless they are part of #EXTINF.
        assert(channels.length === 1, "Comments/Unknowns: Channel Count", "Comments/Unknowns: Channel Count");
        if (channels.length === 1) {
            assert(channels[0].name === "Channel X", "Comments/Unknowns: Name", "Comments/Unknowns: Name");
            assert(channels[0].url === "http://streamX", "Comments/Unknowns: URL", "Comments/Unknowns: URL");
        }
    };
    try { testCommentsAndUnknowns(); } catch (e) { results.push({ name: "Comments and Unknowns Suite", passed: false, error: e.toString() }); }


    // --- Test Case 8: No title after comma in EXTINF ---
    const testNoTitleAfterComma = () => {
        parser.reset();
        const m3uContent = `#EXTM3U\n#EXTINF:-1 tvg-id="chEmpty",\nhttp://server.com/emptyTitle`;
        const channels = parser.parse(m3uContent);
        assert(channels.length === 1, "No Title After Comma: Channel Count", "No Title After Comma: Channel Count");
        if (channels.length === 1) {
            assert(channels[0].name === "", `Expected empty name, got "${channels[0].name}"`, "No Title After Comma: Name");
            assert(channels[0].tvg_id === "chEmpty", "No Title After Comma: TVG ID", "No Title After Comma: TVG ID");
        }
    };
    try { testNoTitleAfterComma(); } catch (e) { results.push({ name: "No Title After Comma Suite", passed: false, error: e.toString() }); }

    // --- Test Case 9: No comma at all in EXTINF (implies no explicit title) ---
    const testNoCommaInExtinf = () => {
        parser.reset();
        const m3uContent = `#EXTM3U\n#EXTINF:-1 tvg-id="chNoComma"\nhttp://server.com/noComma`;
        const channels = parser.parse(m3uContent);
        assert(channels.length === 1, "No Comma in EXTINF: Channel Count", "No Comma in EXTINF: Channel Count");
        if (channels.length === 1) {
            assert(channels[0].name === null, `Expected null name, got "${channels[0].name}"`, "No Comma in EXTINF: Name");
            assert(channels[0].tvg_id === "chNoComma", "No Comma in EXTINF: TVG ID", "No Comma in EXTINF: TVG ID");
        }
    };
    try { testNoCommaInExtinf(); } catch (e) { results.push({ name: "No Comma in EXTINF Suite", passed: false, error: e.toString() }); }

    // --- Test Case 10: Malformed EXTINF (e.g., letters for duration) ---
    const testMalformedDuration = () => {
        parser.reset();
        // JavaScript M3UParser currently logs warning and defaults duration to -1.
        const m3uContent = `#EXTM3U\n#EXTINF:abc tvg-id="malformed",Malformed Duration\nhttp://server.com/malformedDur`;
        const channels = parser.parse(m3uContent);
        assert(channels.length === 1, "Malformed Duration: Channel Count", "Malformed Duration: Channel Count");
        if (channels.length === 1) {
            assert(channels[0].duration === -1, `Expected duration -1 for malformed, got "${channels[0].duration}"`, "Malformed Duration: Duration");
            assert(channels[0].name === "Malformed Duration", "Malformed Duration: Name", "Malformed Duration: Name");
        }
    };
    try { testMalformedDuration(); } catch (e) { results.push({ name: "Malformed Duration Suite", passed: false, error: e.toString() }); }

    // --- Test Case 11: Multiple channels ---
    const testMultipleChannels = () => {
        parser.reset();
        const m3uContent = `#EXTM3U
#EXTINF:-1 tvg-id="ch1",Channel 1
http://stream1
#EXTINF:0 tvg-id="ch2",Channel 2
http://stream2`;
        const channels = parser.parse(m3uContent);
        assert(channels.length === 2, "Multiple Channels: Channel Count", "Multiple Channels: Channel Count");
        if (channels.length === 2) {
            assert(channels[0].tvg_id === "ch1" && channels[1].tvg_id === "ch2", "Multiple Channels: IDs", "Multiple Channels: IDs");
            assert(channels[0].duration === -1 && channels[1].duration === 0, "Multiple Channels: Durations", "Multiple Channels: Durations");
        }
    };
    try { testMultipleChannels(); } catch (e) { results.push({ name: "Multiple Channels Suite", passed: false, error: e.toString() }); }

     // --- Test Case 12: Orphaned EXTINF (no URL follows) ---
    const testOrphanedExtinf = () => {
        parser.reset();
        const m3uContent = `#EXTM3U\n#EXTINF:-1 tvg-id="orphan",Orphaned Channel\n#EXTINF:-1 tvg-id="chValid",Valid Channel\nhttp://valid.stream`;
        // The current JS parser logs a warning for orphaned EXTINF but continues.
        // The orphaned one won't be added to the list.
        const channels = parser.parse(m3uContent);
        assert(channels.length === 1, "Orphaned EXTINF: Channel Count should be 1", "Orphaned EXTINF: Channel Count");
        if (channels.length === 1) {
            assert(channels[0].tvg_id === "chValid", "Orphaned EXTINF: Valid channel ID", "Orphaned EXTINF: Valid channel ID");
        }
    };
    try { testOrphanedExtinf(); } catch (e) { results.push({ name: "Orphaned EXTINF Suite", passed: false, error: e.toString() }); }

    // --- Test Case 13: URL without EXTINF before it ---
    const testUrlWithoutExtinf = () => {
        parser.reset();
        const m3uContent = `#EXTM3U\nhttp://lonely.stream\n#EXTINF:-1 tvg-id="chAfter",Channel After Lonely\nhttp://after.stream`;
        // The current JS parser logs a warning for URL without EXTINF and ignores it.
        const channels = parser.parse(m3uContent);
        assert(channels.length === 1, "URL without EXTINF: Channel Count should be 1", "URL without EXTINF: Channel Count");
        if (channels.length === 1) {
            assert(channels[0].tvg_id === "chAfter", "URL without EXTINF: Valid channel ID", "URL without EXTINF: Valid channel ID");
        }
    };
    try { testUrlWithoutExtinf(); } catch (e) { results.push({ name: "URL without EXTINF Suite", passed: false, error: e.toString() }); }


    return results;
}
```
