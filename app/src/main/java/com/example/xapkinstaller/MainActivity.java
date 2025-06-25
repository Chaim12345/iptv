package com.example.xapkinstaller;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.core.content.FileProvider;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.Settings;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class MainActivity extends AppCompatActivity {

    private static final int PERMISSION_REQUEST_CODE = 100;
    private static final int FILE_SELECT_CODE = 101;
    private static final int UNKNOWN_SOURCES_REQUEST_CODE = 102;
    private static final String TAG = "XAPKInstaller";

    private Button selectXapkButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        selectXapkButton = findViewById(R.id.select_xapk_button);
        selectXapkButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (checkPermissions()) {
                    if (checkUnknownSources()) {
                        openFileSelector();
                    } else {
                        requestUnknownSources();
                    }
                } else {
                    requestPermissions();
                }
            }
        });
    }

    private boolean checkPermissions() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            return Environment.isExternalStorageManager();
        } else {
            int readPermission = ContextCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE);
            int writePermission = ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE);
            return readPermission == PackageManager.PERMISSION_GRANTED && writePermission == PackageManager.PERMISSION_GRANTED;
        }
    }

    private void requestPermissions() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            try {
                Intent intent = new Intent(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION);
                intent.addCategory("android.intent.category.DEFAULT");
                intent.setData(Uri.parse(String.format("package:%s", getApplicationContext().getPackageName())));
                startActivityForResult(intent, PERMISSION_REQUEST_CODE);
            } catch (Exception e) {
                Intent intent = new Intent();
                intent.setAction(Settings.ACTION_MANAGE_ALL_FILES_ACCESS_PERMISSION);
                startActivityForResult(intent, PERMISSION_REQUEST_CODE);
            }
        } else {
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.READ_EXTERNAL_STORAGE, Manifest.permission.WRITE_EXTERNAL_STORAGE},
                    PERMISSION_REQUEST_CODE);
        }
    }

    private boolean checkUnknownSources() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            return getPackageManager().canRequestPackageInstalls();
        }
        return true; // For older versions, this permission is not needed or granted by default.
    }

    private void requestUnknownSources() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            Intent intent = new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES);
            intent.setData(Uri.parse(String.format("package:%s", getPackageName())));
            startActivityForResult(intent, UNKNOWN_SOURCES_REQUEST_CODE);
        }
    }


    private void openFileSelector() {
        Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
        intent.setType("*/*");
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        try {
            startActivityForResult(Intent.createChooser(intent, "Select an XAPK file"), FILE_SELECT_CODE);
        } catch (android.content.ActivityNotFoundException ex) {
            Toast.makeText(this, "Please install a File Manager.", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == PERMISSION_REQUEST_CODE) {
            if (checkPermissions()) {
                Toast.makeText(this, "Permissions Granted", Toast.LENGTH_SHORT).show();
                 if (checkUnknownSources()) {
                        openFileSelector();
                    } else {
                        requestUnknownSources();
                    }
            } else {
                Toast.makeText(this, "Permissions Denied", Toast.LENGTH_SHORT).show();
            }
        } else if (requestCode == FILE_SELECT_CODE && resultCode == Activity.RESULT_OK) {
            if (data != null) {
                Uri uri = data.getData();
                if (uri != null) {
                    String filePath = getPathFromUri(uri);
                    if (filePath != null && filePath.toLowerCase().endsWith(".xapk")) {
                        installXapk(filePath);
                    } else {
                        Toast.makeText(this, "Invalid file selected. Please select an XAPK file.", Toast.LENGTH_LONG).show();
                    }
                }
            }
        } else if (requestCode == UNKNOWN_SOURCES_REQUEST_CODE) {
            if (checkUnknownSources()) {
                Toast.makeText(this, "Unknown sources permission granted.", Toast.LENGTH_SHORT).show();
                openFileSelector();
            } else {
                Toast.makeText(this, "Unknown sources permission denied. Cannot install XAPK.", Toast.LENGTH_LONG).show();
            }
        }
    }

    // Basic implementation to get path from URI. This might need improvement for different URI types.
    private String getPathFromUri(Uri uri) {
        // For now, assume it's a file URI or can be directly converted.
        // A more robust solution would handle content URIs properly.
        try {
            InputStream inputStream = getContentResolver().openInputStream(uri);
            File tempFile = File.createTempFile("temp_xapk", ".xapk", getCacheDir());
            tempFile.deleteOnExit();
            try (OutputStream output = new FileOutputStream(tempFile)) {
                byte[] buffer = new byte[4 * 1024]; // or other buffer size
                int read;
                while ((read = inputStream.read(buffer)) != -1) {
                    output.write(buffer, 0, read);
                }
                output.flush();
            }
            return tempFile.getAbsolutePath();
        } catch (IOException e) {
            Log.e(TAG, "Error getting path from URI", e);
            Toast.makeText(this, "Error getting file path from URI.", Toast.LENGTH_SHORT).show();
        }
        return null;
    }


    private void installXapk(String xapkFilePath) {
        File xapkFile = new File(xapkFilePath);
        File outputDir = new File(getExternalFilesDir(null), "xapk_extracted");
        if (!outputDir.exists()) {
            outputDir.mkdirs();
        }

        Log.d(TAG, "Starting XAPK installation for: " + xapkFilePath);
        Toast.makeText(this, "Starting XAPK installation...", Toast.LENGTH_SHORT).show();


        try (ZipInputStream zis = new ZipInputStream(new FileInputStream(xapkFile))) {
            ZipEntry zipEntry;
            String mainApkPath = null;
            String obbPath = null;
            String obbFileName = null;

            while ((zipEntry = zis.getNextEntry()) != null) {
                String entryName = zipEntry.getName();
                File newFile = new File(outputDir, entryName);

                // Create directories if they don't exist
                if (entryName.endsWith("/")) {
                    newFile.mkdirs();
                    continue;
                } else {
                    new File(newFile.getParent()).mkdirs();
                }


                Log.d(TAG, "Extracting: " + entryName + " to " + newFile.getAbsolutePath());

                try (FileOutputStream fos = new FileOutputStream(newFile)) {
                    byte[] buffer = new byte[1024];
                    int len;
                    while ((len = zis.read(buffer)) > 0) {
                        fos.write(buffer, 0, len);
                    }
                }

                if (entryName.toLowerCase().endsWith(".apk")) {
                    mainApkPath = newFile.getAbsolutePath();
                    Log.d(TAG, "Found APK: " + mainApkPath);
                } else if (entryName.toLowerCase().startsWith("android/obb/") && entryName.toLowerCase().endsWith(".obb")) {
                    // The OBB file is inside a package-named folder within Android/obb/
                    obbPath = newFile.getAbsolutePath();
                    obbFileName = newFile.getName(); // e.g., main.123.com.example.app.obb
                    Log.d(TAG, "Found OBB: " + obbPath + " (filename: " + obbFileName + ")");
                }
                zis.closeEntry();
            }

            if (mainApkPath != null) {
                installApk(mainApkPath);
                // OBB handling will be done after APK installation is confirmed by the user.
                // For now, we just log it. We'll need a broadcast receiver or similar to handle OBB after install.
                if (obbPath != null && obbFileName != null) {
                    // The actual OBB placement needs the package name from the installed APK.
                    // This is a simplified version. A real app would get the package name after install.
                    // For now, let's try to infer it from the OBB filename if possible or the XAPK structure.
                    String packageName = extractPackageNameFromObb(obbFileName);
                    if (packageName == null) { // Try to find manifest.json for package name
                         File manifestJson = new File(outputDir, "manifest.json");
                         if (manifestJson.exists()) {
                             // Implement parsing of manifest.json to get package_name
                             // For simplicity, skipping this parsing here.
                             Log.w(TAG, "manifest.json exists but parsing not implemented yet.");
                         }
                    }
                     if (packageName == null && xapkFile.getName().contains(".")) {
                        // Fallback: try to infer from XAPK filename (less reliable)
                        // e.g. com.example.app.xapk
                        String xapkNameNoExt = xapkFile.getName().substring(0, xapkFile.getName().lastIndexOf('.'));
                        if (xapkNameNoExt.matches("([a-zA-Z_]{1}[a-zA-Z0-9_]*(\\.[a-zA-Z_]{1}[a-zA-Z0-9_]*)+)")) {
                            packageName = xapkNameNoExt;
                            Log.d(TAG, "Inferred package name from XAPK filename: " + packageName);
                        }
                    }


                    if (packageName != null) {
                        moveObbFile(obbPath, packageName, obbFileName);
                    } else {
                        Toast.makeText(this, "Could not determine package name for OBB. Manual placement required.", Toast.LENGTH_LONG).show();
                        Log.e(TAG, "Could not determine package name for OBB: " + obbFileName);
                    }
                }
            } else {
                Toast.makeText(this, "No APK found in XAPK.", Toast.LENGTH_LONG).show();
                Log.e(TAG, "No APK found in XAPK: " + xapkFilePath);
            }

        } catch (IOException e) {
            Log.e(TAG, "Error installing XAPK", e);
            Toast.makeText(this, "Error installing XAPK: " + e.getMessage(), Toast.LENGTH_LONG).show();
        } finally {
            // Clean up extracted files (optional, or do it after successful install)
            // deleteDirectory(outputDir);
        }
    }

    private String extractPackageNameFromObb(String obbFileName) {
        // OBB format: main.VERSION.PACKAGE_NAME.obb or patch.VERSION.PACKAGE_NAME.obb
        String[] parts = obbFileName.split("\\.");
        if (parts.length >= 4 && (parts[0].equals("main") || parts[0].equals("patch"))) {
            // Reconstruct package name: parts[2].parts[3]...parts[length-2]
            StringBuilder sb = new StringBuilder();
            for (int i = 2; i < parts.length -1; i++) {
                sb.append(parts[i]);
                if (i < parts.length - 2) {
                    sb.append(".");
                }
            }
            String packageName = sb.toString();
            Log.d(TAG, "Extracted package name from OBB: " + packageName);
            return packageName;
        }
        Log.w(TAG, "Could not extract package name from OBB filename: " + obbFileName);
        return null;
    }


    private void installApk(String apkPath) {
        File apkFile = new File(apkPath);
        if (!apkFile.exists()) {
            Toast.makeText(this, "APK file not found: " + apkPath, Toast.LENGTH_LONG).show();
            Log.e(TAG, "APK file not found: " + apkPath);
            return;
        }

        Uri apkUri;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            apkUri = FileProvider.getUriForFile(this, getApplicationContext().getPackageName() + ".provider", apkFile);
        } else {
            apkUri = Uri.fromFile(apkFile);
        }

        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setDataAndType(apkUri, "application/vnd.android.package-archive");
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK); // Important for starting installer

        try {
            startActivity(intent);
            Log.d(TAG, "Started APK installation for: " + apkPath);
        } catch (Exception e) {
            Log.e(TAG, "Error starting APK installation", e);
            Toast.makeText(this, "Error starting APK installation: " + e.getMessage(), Toast.LENGTH_LONG).show();
        }
    }

    private void moveObbFile(String sourceObbPath, String packageName, String obbFileName) {
        File sourceFile = new File(sourceObbPath);
        if (!sourceFile.exists()) {
            Log.e(TAG, "Source OBB file does not exist: " + sourceObbPath);
            return;
        }

        File obbDir = new File(Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/obb/" + packageName);
        if (!obbDir.exists()) {
            if (!obbDir.mkdirs()) {
                Log.e(TAG, "Failed to create OBB directory: " + obbDir.getAbsolutePath());
                Toast.makeText(this, "Failed to create OBB directory. Check permissions.", Toast.LENGTH_LONG).show();
                return;
            }
        }

        File destFile = new File(obbDir, obbFileName);

        Log.d(TAG, "Moving OBB file from " + sourceFile.getAbsolutePath() + " to " + destFile.getAbsolutePath());

        try (InputStream in = new FileInputStream(sourceFile);
             OutputStream out = new FileOutputStream(destFile)) {
            byte[] buf = new byte[1024];
            int len;
            while ((len = in.read(buf)) > 0) {
                out.write(buf, 0, len);
            }
            Toast.makeText(this, "OBB file moved successfully.", Toast.LENGTH_SHORT).show();
            Log.d(TAG, "OBB file moved to: " + destFile.getAbsolutePath());
            // Optionally delete the source OBB from the extracted folder
            // sourceFile.delete();
        } catch (IOException e) {
            Log.e(TAG, "Error moving OBB file", e);
            Toast.makeText(this, "Error moving OBB file: " + e.getMessage(), Toast.LENGTH_LONG).show();
        }
    }


    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == PERMISSION_REQUEST_CODE) {
            boolean allGranted = true;
            for (int grantResult : grantResults) {
                if (grantResult != PackageManager.PERMISSION_GRANTED) {
                    allGranted = false;
                    break;
                }
            }
            if (allGranted || checkPermissions()) { // checkPermissions() for Android R flow
                Toast.makeText(this, "Storage Permissions Granted", Toast.LENGTH_SHORT).show();
                if (checkUnknownSources()) {
                    openFileSelector();
                } else {
                    requestUnknownSources();
                }
            } else {
                Toast.makeText(this, "Storage Permissions Denied. Cannot proceed.", Toast.LENGTH_LONG).show();
            }
        }
    }

    // Utility to delete directory (use with caution)
    private boolean deleteDirectory(File path) {
        if (path.exists()) {
            File[] files = path.listFiles();
            if (files != null) {
                for (File file : files) {
                    if (file.isDirectory()) {
                        deleteDirectory(file);
                    } else {
                        file.delete();
                    }
                }
            }
        }
        return path.delete();
    }
}
