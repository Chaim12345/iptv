import re
import logging

logger = logging.getLogger(__name__)

class M3UParser:
    """
    Parses M3U and M3U8 playlists.
    
    The parser extracts stream information including duration, attributes (tvg-id, 
    tvg-name, tvg-logo, group-title), channel title, and stream URL.
    It is designed to be resilient to extra whitespace and common M3U format variations.
    """
    def __init__(self):
        """Initializes the M3UParser."""
        self.reset()

    def reset(self):
        """Resets the parser's internal state for parsing a new M3U content."""
        self._streams = []
        # Holds data for the current #EXTINF line before its associated URL is found.
        # Cleared after a stream (EXTINF + URL) is successfully parsed and stored.
        self._current_stream_info = {} 

    def _parse_extinf_line(self, line: str):
        """
        Parses an #EXTINF line to extract duration, attributes, and channel name.
        The result is stored in self._current_stream_info.
        Example line: #EXTINF:-1 tvg-id="id" tvg-name="name" group-title="group",Channel Title
        """
        # Remove the #EXTINF: prefix and strip whitespace
        line_content = line[len("#EXTINF:"):].strip()

        # Initialize default values for the current stream's information
        duration = -1
        tvg_id = None
        tvg_name = None
        tvg_logo = None
        group_title = None
        name = None  # This is the channel title, found after the first comma

        # Split the line_content by the first comma.
        # The part before the comma contains duration and key-value attributes.
        # The part after the comma is the channel name/title.
        parts = line_content.split(',', 1)
        duration_and_attributes_str = parts[0].strip()
        
        if len(parts) > 1:
            name = parts[1].strip() 
        # If no comma exists, 'name' remains None, indicating no explicit title in the EXTINF line.

        # From the duration_and_attributes_str, extract the duration first.
        # Duration is expected to be the first token, separated by a space from attributes.
        sub_parts = duration_and_attributes_str.split(' ', 1)
        duration_str = sub_parts[0].strip()

        try:
            if duration_str:  # Ensure it's not an empty string
                # Convert to float first to handle potential decimal values (e.g., "0.0")
                # then to int.
                duration = int(float(duration_str))
        except ValueError:
            logger.warning(
                f"Invalid duration '{duration_str}' in EXTINF line: '{line}'. Using default -1."
            )
            # duration remains -1 (the default initialized value)

        attributes_str = ""
        if len(sub_parts) > 1:
            attributes_str = sub_parts[1].strip()

        if attributes_str:
            # Regex to find all key="value" pairs or key=value (unquoted) pairs.
            # It captures:
            # group 1: key (e.g., tvg-id)
            # group 2: full value assignment (e.g., "value" or value)
            # group 3: quoted value (e.g., value from "value")
            # group 4: unquoted value (e.g., value from value)
            attr_pattern = re.compile(r'([a-zA-Z0-9\-]+)=("([^"]*)"|([^\s,]+))')
            for match in attr_pattern.finditer(attributes_str):
                key = match.group(1).lower().strip()
                # Prioritize quoted value (group 3), fallback to unquoted (group 4)
                value = match.group(3) if match.group(3) is not None else match.group(4)
                value = value.strip() # Clean the extracted value

                if key == "tvg-id":
                    tvg_id = value
                elif key == "tvg-name":
                    tvg_name = value
                elif key == "tvg-logo":
                    tvg_logo = value
                elif key == "group-title":
                    group_title = value
        
        # Store the parsed information. The URL will be added by the main parse loop
        # when it encounters the next non-directive line.
        self._current_stream_info = {
            "name": name,
            "url": None, 
            "duration": duration,
            "tvg_id": tvg_id,
            "tvg_name": tvg_name,
            "tvg_logo": tvg_logo,
            "group_title": group_title,
        }

    def parse(self, content: str) -> list[dict]:
        """
        Parses the M3U/M3U8 content string and returns a list of stream information.

        Args:
            content: The M3U/M3U8 file content as a string.

        Returns:
            A list of dictionaries, where each dictionary represents a stream
            and contains keys: 'name', 'url', 'duration', 'tvg_id', 
            'tvg_name', 'tvg_logo', 'group_title'.

        Raises:
            ValueError: If the M3U content is invalid (e.g., missing #EXTM3U header).
        """
        self.reset() # Ensure parser is in a clean state
        lines = content.splitlines()

        # Check for the #EXTM3U header
        if not lines or lines[0].strip() != "#EXTM3U":
            raise ValueError("Invalid M3U file: Missing or incorrect #EXTM3U header.")

        for line_number, line_text in enumerate(lines):
            line = line_text.strip()

            if not line:  # Skip empty lines
                continue

            if line.startswith("#EXTINF:"):
                # If _current_stream_info has data from a previous #EXTINF line 
                # but no URL was found for it, that #EXTINF was orphaned.
                # Log this situation and discard the orphaned data before parsing the new line.
                # "duration" is a reliable indicator that _parse_extinf_line was called.
                if self._current_stream_info.get("duration") is not None and \
                   self._current_stream_info.get("url") is None:
                    logger.warning(
                        f"Orphaned #EXTINF data (no URL followed, found at line {line_number+1}): "
                        f"{self._current_stream_info}"
                    )
                
                self._parse_extinf_line(line) # Sets _current_stream_info

            elif line.startswith("#"):
                # This is some other M3U directive (e.g., #EXTGRP, #EXTVLCOPT) or a comment.
                # As per requirements, these are logged and ignored if not #EXTINF.
                # This directive does not clear _current_stream_info, allowing an #EXTINF
                # to be followed by other metadata lines before its URL.
                logger.info(
                    f"Ignoring M3U directive or comment at line {line_number+1}: '{line}'"
                )
            
            else: # Not a directive or empty line, so it should be a URL
                # Check if we have pending stream information from a preceding #EXTINF.
                # "duration" being not None implies _parse_extinf_line was successfully called.
                if self._current_stream_info.get("duration") is not None:
                    self._current_stream_info["url"] = line
                    self._streams.append(self._current_stream_info)
                    self._current_stream_info = {} # Reset for the next stream entry
                else:
                    # This URL does not follow an #EXTINF line or the #EXTINF line was malformed
                    # to the point that _current_stream_info was not properly set up.
                    logger.warning(
                        f"Found URL '{line}' at line {line_number+1} without a valid preceding "
                        f"#EXTINF directive. Ignoring this URL."
                    )
        
        # After processing all lines, check if the last #EXTINF is orphaned 
        # (i.e., the file ended with an #EXTINF line without a subsequent URL).
        if self._current_stream_info.get("duration") is not None and \
           self._current_stream_info.get("url") is None:
            logger.warning(
                f"Orphaned #EXTINF data at end of file (no URL followed): "
                f"{self._current_stream_info}"
            )

        return self._streams

# Example usage (can be uncommented for testing locally)
# if __name__ == '__main__':
#     logging.basicConfig(level=logging.INFO)
#     parser = M3UParser()

#     example_m3u_content = """
# #EXTM3U
# #EXTINF:-1 tvg-id="channel1" tvg-name="Channel 1" tvg-logo="logo1.png" group-title="News",Channel One
# http://server.com/stream1
# #EXTINF:-1 tvg-id="channel2" tvg-name="Channel 2" group-title="Sports",Channel Two
# http://server.com/stream2
# #EXTGRP:Entertainment
# #EXTINF:-1 tvg-id="channel3",Channel Three
# http://server.com/stream3
# #EXTINF:0 tvg-id="channel4" tvg-logo="logo4.png",Channel Four Title
# udp://@239.0.0.1:1234
# #EXTINF:-1 tvg-id="channel5" tvg-name="Channel5Name", Another Channel, with comma
# http://server.com/stream5
# #EXTINF:-1,Simple Channel
# http://server.com/stream_simple
# #EXTINF:-1 tvg-id=id6 tvg-name=Name6 group-title=Group6,Channel Six Unquoted
# http://server.com/stream6
# #EXTINF:Malformed tvg-id="mal",Malformed Title
# http://server.com/malformed_extinf_url
# #EXTINF:-1 tvg-id="channel7",
# http://server.com/stream7
# #EXTINF:-1 tvg-id="channel8" no-title-comma-for-this-one
# http://server.com/stream8
# #EXTINF:-1 tvg-id="channel9" tvg-name="Channel 9",Explicit Title For 9
# # This is a comment, should be ignored.
# http://server.com/stream9
# #EXTINF:-1 tvg-id="channel10"
# #EXTVLCOPT:program=123
# http://server.com/stream10
# #EXTINF:-1 tvg-id="orphan"
#     """

#     print("--- Parsing example M3U ---")
#     try:
#         parsed_data = parser.parse(example_m3u_content)
#         for item in parsed_data:
#             print(item)
#     except ValueError as e:
#         print(f"Error parsing M3U: {e}")

#     print("\n--- Expected Snippet Output Verification ---")
#     # Snippet from requirements
#     snippet_content = """#EXTM3U
# #EXTINF:-1 tvg-id="channel1" tvg-name="Channel 1" tvg-logo="logo1.png" group-title="News",Channel One
# http://server.com/stream1
# #EXTINF:-1 tvg-id="channel2" tvg-name="Channel 2" group-title="Sports",Channel Two
# http://server.com/stream2
# #EXTGRP:Entertainment
# #EXTINF:-1 tvg-id="channel3",Channel Three
# http://server.com/stream3"""
#     try:
#         parsed_snippet = parser.parse(snippet_content)
#         print("Parsed Snippet Data:")
#         for item in parsed_snippet:
#             print(item)
#         # Expected:
#         # {'name': 'Channel One', 'url': 'http://server.com/stream1', 'duration': -1, 'tvg_id': 'channel1', 'tvg_name': 'Channel 1', 'tvg_logo': 'logo1.png', 'group_title': 'News'}
#         # {'name': 'Channel Two', 'url': 'http://server.com/stream2', 'duration': -1, 'tvg_id': 'channel2', 'tvg_name': 'Channel 2', 'tvg_logo': None, 'group_title': 'Sports'}
#         # {'name': 'Channel Three', 'url': 'http://server.com/stream3', 'duration': -1, 'tvg_id': 'channel3', 'tvg_name': None, 'tvg_logo': None, 'group_title': None}
#     except ValueError as e:
#         print(f"Error parsing snippet: {e}")

```
