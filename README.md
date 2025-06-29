# IPTV Web Player

A simple, modern web-based IPTV player that supports M3U/M3U8 playlists and XML/XML.GZ EPG files with a clean, user-friendly interface similar to Plex/Emby.

## Features

- Upload and manage M3U/M3U8 playlists
- Support for XML/XML.GZ EPG files
- Clean, responsive UI with channel list and program guide
- Search functionality for channels
- Modern video player with standard controls
- Lightweight and easy to use

## Prerequisites

- Python 3.7+
- pip (Python package manager)
- VLC media player (for some stream types)

## Installation

1. Clone this repository or download the source code
2. Navigate to the project directory
3. Install the required Python packages:

```bash
pip install -r requirements.txt
```

## Running the Application

1. Start the Flask development server:

```bash
python app.py
```

2. Open your web browser and navigate to:

```
http://localhost:5000
```

3. Upload your M3U/M3U8 playlist file to get started

## Usage

1. Click the "Upload Playlist" button to upload an M3U/M3U8 file
2. Click on a channel in the list to start playback
3. Use the player controls to play, pause, or adjust volume
4. Upload an EPG file to view program guide information
5. Use the search box to filter channels by name

## Notes

- The application stores playlists and EPG data in memory and will be cleared when the server restarts
- For production use, consider adding authentication and persistent storage
- Some streams may require CORS headers or proxy configuration to work in a web browser

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
#   i p t v  
 