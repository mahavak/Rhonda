# Step-by-Step Hostinger Upload Instructions

## Files You Need to Upload

From your `/home/lau_1968/Rhonda` directory, you need these 6 files:
1. `index.html`
2. `style.css`
3. `script.js`
4. `database.js`
5. `database-ui.js`
6. `.htaccess`

## Method 1: Using Hostinger File Manager (Easiest)

1. **Login to Hostinger hPanel**
   - Go to https://hpanel.hostinger.com
   - Enter your credentials

2. **Navigate to File Manager**
   - Click on "Files" → "File Manager"
   - Or go directly to the file manager from your dashboard

3. **Open public_html folder**
   - Double-click on `public_html` folder
   - This is where your website files go

4. **Upload Files**
   - Click the "Upload" button (usually in top menu)
   - Select all 6 files from your computer:
     - index.html
     - style.css
     - script.js
     - database.js
     - database-ui.js
     - .htaccess
   - Click "Upload"

5. **Verify Upload**
   - Make sure all files appear in public_html
   - Check file sizes match

## Method 2: Using FTP (FileZilla)

1. **Get FTP Credentials**
   - In hPanel, go to "Files" → "FTP Accounts"
   - Note your:
     - FTP hostname (usually ftp.yourdomain.com)
     - FTP username
     - FTP password
     - Port (usually 21)

2. **Download FileZilla**
   - https://filezilla-project.org/

3. **Connect to Hostinger**
   - Open FileZilla
   - Enter your FTP credentials
   - Click "Quickconnect"

4. **Upload Files**
   - Left panel: Navigate to `/home/lau_1968/Rhonda`
   - Right panel: Navigate to `/public_html`
   - Select all 6 files on left
   - Drag to right panel

## Method 3: Using ZIP Upload

1. **Create ZIP file locally**
   ```bash
   cd /home/lau_1968/Rhonda
   zip website.zip index.html style.css script.js database.js database-ui.js .htaccess
   ```

2. **Upload ZIP via File Manager**
   - Upload the website.zip to public_html
   - Right-click on website.zip
   - Select "Extract"
   - Delete the zip file after extraction

## After Upload Checklist

- [ ] Visit your domain (e.g., https://yourdomain.com)
- [ ] Check that the website loads
- [ ] Test the database panel (top-right corner)
- [ ] Try tracking a supplement
- [ ] Check if data persists after refresh

## Troubleshooting

**Site shows "Index of /" listing:**
- Make sure `index.html` is in public_html, not in a subfolder

**404 Error:**
- Check that files are in `public_html`, not `public_html/Rhonda`

**Database not working:**
- Open browser console (F12) and check for errors
- Make sure all JavaScript files uploaded correctly

**Style looks broken:**
- Clear browser cache (Ctrl+Shift+R)
- Verify style.css uploaded correctly

## Your Domain

After upload, your site will be available at:
- https://yourdomain.com (if you connected a domain)
- https://yourusername.hostingersite.com (temporary URL)

## Need Help?

Contact Hostinger support via live chat in hPanel if you encounter any issues.