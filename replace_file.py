import os
import shutil

# Paths
src = os.path.join(os.path.dirname(__file__), 'templates', 'index.html.new')
dst = os.path.join(os.path.dirname(__file__), 'templates', 'index.html')

# Replace the file
if os.path.exists(src):
    shutil.copy2(src, dst)
    print(f"Successfully replaced {dst}")
    os.remove(src)
    print(f"Removed temporary file {src}")
else:
    print(f"Source file {src} not found")
