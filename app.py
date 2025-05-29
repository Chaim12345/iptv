from flask import Flask, render_template, request, jsonify, send_from_directory
import os
from werkzeug.utils import secure_filename
import xml.etree.ElementTree as ET
import m3u8
import json
import requests
import asyncio
import aiohttp
from concurrent.futures import ThreadPoolExecutor
from flask import request, jsonify

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Ensure upload folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# In-memory storage for playlists (in production, use a database)
playlists = {}
epg_data = {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'status': 'error', 'message': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'status': 'error', 'message': 'No selected file'}), 400
    
    if not file:
        return jsonify({'status': 'error', 'message': 'No file provided'}), 400
    
    try:
        filename = secure_filename(file.filename)
        
        # Create uploads directory if it doesn't exist
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
        
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Process the file based on extension
        if filename.lower().endswith(('.m3u', '.m3u8')):
            result = process_m3u(filepath, filename)
            if not result:
                return jsonify({'status': 'error', 'message': 'Failed to process M3U file'}), 400
            return jsonify({
                'status': 'success',
                'type': 'playlist',
                'filename': filename,
                'total_channels': len(result.get('channels', []))
            })
            
        elif filename.lower().endswith(('.xml', '.xml.gz')):
            result = process_epg(filepath, filename)
            if result.get('status') == 'error':
                return jsonify(result), 400
                
            return jsonify({
                'status': 'success',
                'type': 'epg',
                'filename': filename,
                'programs_count': result.get('programs_count', 0),
                'channels': result.get('channels', [])
            })
            
        else:
            return jsonify({
                'status': 'error',
                'message': 'Unsupported file type. Please upload .m3u, .m3u8, .xml, or .xml.gz files.'
            }), 400
            
    except Exception as e:
        error_msg = f"Error processing file: {str(e)}"
        print(error_msg)
        return jsonify({
            'status': 'error',
            'message': error_msg
        }), 500

@app.route('/api/channels')
def get_channels():
    try:
        # First check in-memory playlists
        if playlists:
            return jsonify(playlists)
            
        # If no in-memory playlists, try to load from files
        playlists_data = {}
        for filename in os.listdir(app.config['UPLOAD_FOLDER']):
            if filename.endswith('.json') and filename != 'epg_data.json':
                try:
                    with open(os.path.join(app.config['UPLOAD_FOLDER'], filename), 'r', encoding='utf-8') as f:
                        playlist_name = os.path.splitext(filename)[0]
                        playlists_data[playlist_name] = json.load(f)
                        # Update in-memory cache
                        playlists[filename] = playlists_data[playlist_name]
                except Exception as e:
                    print(f"Error loading playlist {filename}: {e}")
        
        if not playlists_data:
            return jsonify({'status': 'success', 'playlists': {}})
            
        return jsonify(playlists_data)
        
    except Exception as e:
        error_msg = f"Error loading channels: {str(e)}"
        print(error_msg)
        return jsonify({
            'status': 'error',
            'message': error_msg
        }), 500

@app.route('/api/check-links', methods=['POST'])
def check_links():
    try:
        data = request.json
        playlist_name = data.get('playlist')
        if not playlist_name or playlist_name not in playlists:
            return jsonify({'error': 'Playlist not found'}), 404
            
        # Create a copy of channels to avoid modifying during iteration
        channels = playlists[playlist_name]['channels'].copy()
        
        # Check links in parallel
        async def check_channel(channel):
            url = channel.get('url', '')
            if not url:
                return {**channel, 'status': 'dead'}
                
            try:
                # For m3u8, check if the playlist is accessible
                if url.endswith('.m3u8'):
                    async with aiohttp.ClientSession() as session:
                        async with session.head(url, timeout=5) as response:
                            if response.status == 200:
                                return {**channel, 'status': 'alive'}
                            else:
                                return {**channel, 'status': 'dead'}
                # For direct streams, check if the URL is accessible
                else:
                    async with aiohttp.ClientSession() as session:
                        async with session.head(url, timeout=5) as response:
                            if response.status in (200, 206):
                                return {**channel, 'status': 'alive'}
                            else:
                                return {**channel, 'status': 'dead'}
            except:
                return {**channel, 'status': 'dead'}
        
        async def check_all():
            tasks = [check_channel(channel) for channel in channels]
            return await asyncio.gather(*tasks)
            
        # Run the async checks
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        results = loop.run_until_complete(check_all())
        
        # Update the playlist with status
        playlists[playlist_name]['channels'] = results
        
        # Count dead/alive
        dead_links = [ch for ch in results if ch.get('status') == 'dead']
        
        return jsonify({
            'total': len(results),
            'alive': len(results) - len(dead_links),
            'dead': len(dead_links),
            'dead_links': dead_links
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/remove-dead-links', methods=['POST'])
def remove_dead_links():
    try:
        data = request.json
        playlist_name = data.get('playlist')
        if not playlist_name or playlist_name not in playlists:
            return jsonify({'error': 'Playlist not found'}), 404
            
        # Filter out dead links
        original_count = len(playlists[playlist_name]['channels'])
        playlists[playlist_name]['channels'] = [
            ch for ch in playlists[playlist_name]['channels'] 
            if ch.get('status') != 'dead'
        ]
        removed = original_count - len(playlists[playlist_name]['channels'])
        
        return jsonify({
            'removed': removed,
            'remaining': len(playlists[playlist_name]['channels'])
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/epg')
def get_epg():
    try:
        epg_json_path = os.path.join(app.config['UPLOAD_FOLDER'], 'epg_data.json')
        data = None
        if epg_data:
            data = epg_data
        elif os.path.exists(epg_json_path):
            with open(epg_json_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
        if not data:
            return jsonify({'status': 'error','message': 'No EPG data available. Please upload an EPG file first.'}), 404
        epg_key = next(iter(data.keys())) if data else None
        epg = data[epg_key] if epg_key else {}
        response = {'status': 'success', 'data': {'channels': {}, 'programs': {}}}
        for program in epg.get('programs', []):
            channel_id = program.get('channel')
            if not channel_id:
                continue
            if channel_id not in response['data']['channels']:
                response['data']['channels'][channel_id] = {'id': channel_id, 'name': channel_id}
            if channel_id not in response['data']['programs']:
                response['data']['programs'][channel_id] = []
            response['data']['programs'][channel_id].append({
                'title': program.get('title', 'No Title'),
                'start': program.get('start', ''),
                'stop': program.get('stop', ''),
                'description': program.get('description', '')
            })
        return jsonify(response)
    except Exception as e:
        error_msg = f"Error loading EPG data: {str(e)}"
        print(error_msg)
        return jsonify({'status': 'error','message': error_msg}), 500

# New endpoint for full EPG browsing (channels and all programs)
@app.route('/api/epg/full')
def get_epg_full():
    try:
        epg_json_path = os.path.join(app.config['UPLOAD_FOLDER'], 'epg_data.json')
        data = None
        if epg_data:
            data = epg_data
        elif os.path.exists(epg_json_path):
            with open(epg_json_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
        if not data:
            return jsonify({'status': 'error','message': 'No EPG data available. Please upload an EPG file first.'}), 404
        epg_key = next(iter(data.keys())) if data else None
        epg = data[epg_key] if epg_key else {}
        # Return all channels and programs as-is for browsing
        return jsonify({'status': 'success','channels': epg.get('channels', []),'programs': epg.get('programs', [])})
    except Exception as e:
        error_msg = f"Error loading full EPG data: {str(e)}"
        print(error_msg)
        return jsonify({'status': 'error','message': error_msg}), 500

def process_m3u(filepath, filename):
    try:
        playlists[filename] = {
            'name': filename,
            'channels': []
        }
        
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            lines = f.readlines()
            
        channel = {}
        for line in lines:
            line = line.strip()
            if line.startswith('#EXTINF'):
                # Parse channel info from EXTINF line
                # Example: #EXTINF:-1 tvg-id="" tvg-name="24/7 The Simpsons 1" tvg-logo="https://i.imgur.com/XfkbTrU.png" group-title="General",24/7 The Simpsons 1
                channel = {}
                # Extract channel name (after the last comma)
                if ',' in line:
                    channel['name'] = line.split(',')[-1].strip()
                else:
                    channel['name'] = 'Unnamed Channel'
                
                # Try to extract logo if available
                if 'tvg-logo=' in line:
                    logo_start = line.find('tvg-logo=') + 10  # +10 to skip 'tvg-logo="'
                    logo_end = line.find('"', logo_start)
                    if logo_end > logo_start:
                        channel['logo'] = line[logo_start:logo_end]
                
                # Try to extract group title if available
                if 'group-title=' in line:
                    group_start = line.find('group-title=') + 13  # +13 to skip 'group-title="'
                    group_end = line.find('"', group_start)
                    if group_end > group_start:
                        channel['group'] = line[group_start:group_end]
            
            elif line and not line.startswith('#') and not line.startswith('http'):
                # Skip empty lines and comments, but handle non-URL lines (like group names)
                continue
                
            elif line.startswith('http'):
                # This is a stream URL, add the channel
                channel['url'] = line.strip()
                if 'name' not in channel:
                    channel['name'] = f'Channel {len(playlists[filename]["channels"]) + 1}'
                playlists[filename]['channels'].append(channel)
                channel = {}
        
        # Save EPG data to a JSON file for persistence
        playlists_json_path = os.path.join(app.config['UPLOAD_FOLDER'], 'playlists.json')
        with open(playlists_json_path, 'w', encoding='utf-8') as f:
            json.dump(playlists, f, ensure_ascii=False, indent=2)
        
        return playlists[filename]
                
    except Exception as e:
        print(f"Error processing M3U file: {e}")
        import traceback
        traceback.print_exc()
        return None

def process_epg(filepath, filename):
    try:
        # Handle gzipped XML files
        if filepath.endswith('.gz'):
            import gzip
            with gzip.open(filepath, 'rb') as f:
                tree = ET.parse(f)
        else:
            tree = ET.parse(filepath)
            
        root = tree.getroot()
        
        # Basic EPG processing
        programs = []
        channels = {}
        
        # First, extract channel information if available
        for channel in root.findall('.//channel'):
            try:
                channel_id = channel.get('id')
                if not channel_id:
                    continue
                    
                # Get display name (can be in a <display-name> tag)
                display_name = channel.findtext('display-name', '').strip()
                if not display_name:
                    display_name = channel_id
                    
                channels[channel_id] = {
                    'id': channel_id,
                    'name': display_name,
                    'icon': channel.findtext('icon/src', '')  # Some EPGs include channel icons
                }
            except Exception as e:
                print(f"Error parsing channel: {e}")
                continue
        
        # Then parse programs
        for program in root.findall('.//programme'):
            try:
                channel_id = program.get('channel', '')
                if not channel_id:
                    continue
                    
                # If we don't have channel info yet, add a basic entry
                if channel_id not in channels:
                    channels[channel_id] = {
                        'id': channel_id,
                        'name': channel_id,
                        'icon': ''
                    }
                
                # Parse start and stop times
                start_time = program.get('start', '')
                stop_time = program.get('stop', '')
                
                # Try to parse the time if it's in a standard format
                # This helps with sorting and display in the frontend
                from datetime import datetime
                try:
                    if start_time and len(start_time) >= 14:  # At least YYYYMMDDHHMMSS
                        start_dt = datetime.strptime(start_time[:14], '%Y%m%d%H%M%S')
                        start_time = start_dt.isoformat()
                    if stop_time and len(stop_time) >= 14:
                        stop_dt = datetime.strptime(stop_time[:14], '%Y%m%d%H%M%S')
                        stop_time = stop_dt.isoformat()
                except:
                    pass  # If parsing fails, keep the original string
                
                program_data = {
                    'start': start_time,
                    'stop': stop_time,
                    'channel': channel_id,
                    'title': program.findtext('title', 'No Title').strip(),
                    'description': program.findtext('desc', '').strip(),
                    'category': program.findtext('category', '').strip(),
                    'episode': program.findtext('episode-num', '').strip()
                }
                programs.append(program_data)
            except Exception as e:
                print(f"Error parsing program: {e}")
                continue
        
        # Sort programs by start time
        programs.sort(key=lambda x: x.get('start', ''))
        
        # Store the EPG data with channels and programs
        epg_data[filename] = {
            'name': filename,
            'channels': list(channels.values()),
            'programs': programs,
            'total_programs': len(programs),
            'total_channels': len(channels),
            'last_updated': datetime.now().isoformat()
        }
        
        # Save EPG data to a JSON file for persistence
        epg_json_path = os.path.join(app.config['UPLOAD_FOLDER'], 'epg_data.json')
        with open(epg_json_path, 'w', encoding='utf-8') as f:
            json.dump(epg_data, f, ensure_ascii=False, indent=2)
            
        return {
            'status': 'success', 
            'filename': filename, 
            'programs_count': len(programs),
            'channels_count': len(channels)
        }
        
    except ET.ParseError as e:
        error_msg = f"Invalid XML file: {str(e)}"
        print(error_msg)
        return {'status': 'error', 'message': error_msg}
    except Exception as e:
        error_msg = f"Error processing EPG file: {str(e)}"
        print(error_msg)
        return {'status': 'error', 'message': error_msg}

if __name__ == '__main__':
    app.run(debug=True)
