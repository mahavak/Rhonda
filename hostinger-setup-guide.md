# Hostinger Setup Guide for Rhonda Patrick Website

## Quick Start (Using Current LocalStorage Database)

1. **Rename main file:**
   ```bash
   mv rhonda-patrick-wellness.html index.html
   ```

2. **Upload via Hostinger File Manager:**
   - Login to Hostinger hPanel
   - Go to Files → File Manager
   - Navigate to `public_html` folder
   - Upload these files:
     - `index.html`
     - `style.css`
     - `script.js`
     - `database.js`
     - `database-ui.js`

3. **Your site is ready!** Visit your domain to see it live.

## Advanced: MySQL Database Setup

### Step 1: Create MySQL Database in Hostinger

1. Login to hPanel
2. Go to Databases → MySQL Databases
3. Create new database:
   - Database name: `rhonda_wellness`
   - Username: `rhonda_user`
   - Password: [create strong password]
4. Note down these credentials

### Step 2: Import Database Schema

1. Go to Databases → phpMyAdmin
2. Select your database
3. Click "Import" tab
4. Upload `database-setup.sql`
5. Click "Go"

### Step 3: Configure PHP Files

1. Edit `config.php`:
   ```php
   $host = 'localhost';
   $dbname = 'u123456789_rhonda_wellness'; // Your actual database name
   $username = 'u123456789_rhonda_user';    // Your actual username
   $password = 'YourPasswordHere';          // Your actual password
   ```

### Step 4: Upload PHP Files

Upload these additional files to `public_html`:
- `config.php`
- `api.php`

### Step 5: Update JavaScript for API Calls

Create `database-api.js` to replace localStorage with API calls:

```javascript
// Replace localStorage methods with API calls
class RhondaDBAPI {
    constructor() {
        this.apiUrl = '/api.php';
    }
    
    async trackSupplement(supplementId, taken, notes) {
        const response = await fetch(`${this.apiUrl}/track-supplement`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                supplement_id: supplementId,
                taken: taken,
                notes: notes
            })
        });
        return response.json();
    }
    
    async trackSaunaSession(duration, temperature, notes) {
        const response = await fetch(`${this.apiUrl}/track-sauna`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                duration: duration,
                temperature: temperature,
                notes: notes
            })
        });
        return response.json();
    }
    
    async getUserStats() {
        const response = await fetch(`${this.apiUrl}/stats`);
        return response.json();
    }
}
```

## Folder Structure on Hostinger

```
public_html/
├── index.html
├── style.css
├── script.js
├── database.js
├── database-ui.js
├── config.php (only if using MySQL)
├── api.php (only if using MySQL)
└── .htaccess (optional, for clean URLs)
```

## Security Considerations

1. **For LocalStorage version:**
   - Data is stored in user's browser
   - Each user has their own data
   - No server-side storage needed

2. **For MySQL version:**
   - Add user authentication
   - Use prepared statements (already included)
   - Implement rate limiting
   - Add HTTPS (Hostinger provides free SSL)

## Testing Your Site

1. Visit: `https://yourdomain.com`
2. Check browser console for errors (F12)
3. Test all features:
   - View supplement list
   - Track supplements
   - Log sauna sessions
   - Search functionality
   - Export data

## Troubleshooting

- **404 Error**: Make sure `index.html` is in `public_html`
- **Database not working**: Check localStorage is enabled in browser
- **PHP errors**: Check PHP version (needs 7.0+)
- **CORS issues**: Update `.htaccess` file

## Next Steps

1. Add custom domain in Hostinger
2. Enable SSL certificate
3. Set up regular backups
4. Add Google Analytics (optional)
5. Implement user accounts (for MySQL version)