# Google Analytics & Search Console Setup Guide

## Part 1: Google Analytics Setup

### Step 1: Create Google Analytics Account
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Start measuring"
3. Create account:
   - Account name: "Rhonda Patrick Wellness"
   - Select data sharing settings
   - Click "Next"

### Step 2: Create Property
1. Property name: "Rhonda Patrick Supplements & Sauna"
2. Select your timezone and currency
3. Click "Next"
4. Business details:
   - Industry: Health
   - Size: Small
5. Select goals: "Generate leads" and "Examine user behavior"

### Step 3: Create Data Stream
1. Choose platform: "Web"
2. Website URL: `https://yourdomain.com`
3. Stream name: "Main Website"
4. Click "Create stream"

### Step 4: Get Your Measurement ID
1. Copy your Measurement ID (looks like: G-XXXXXXXXXX)
2. Replace `GA_MEASUREMENT_ID` in `index.html` (lines 12 and 17) with your actual ID

### Step 5: Update Your Files
In `index.html`, change:
```javascript
gtag('config', 'GA_MEASUREMENT_ID');
```
To:
```javascript
gtag('config', 'G-YOUR_ACTUAL_ID');
```

### Step 6: Verify Installation
1. Upload updated `index.html` to Hostinger
2. Visit your website
3. In Google Analytics, go to Reports → Realtime
4. You should see yourself as an active user

## Part 2: Google Search Console Setup

### Step 1: Access Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Start now"
3. Choose property type: "URL prefix"
4. Enter: `https://yourdomain.com`

### Step 2: Verify Ownership (Choose ONE method)

#### Method A: HTML File (Recommended)
1. Download verification file from Google
2. Upload to your website root (public_html)
3. File should be accessible at: `https://yourdomain.com/google123abc.html`
4. Click "Verify"

#### Method B: HTML Tag
1. Copy the meta tag provided
2. Add to `index.html` in the `<head>` section:
```html
<meta name="google-site-verification" content="your_verification_code" />
```
3. Upload updated file
4. Click "Verify"

#### Method C: Google Analytics
1. If Analytics is already set up, just click "Verify"
2. Search Console will detect your Analytics code

### Step 3: Submit Sitemap
1. In Search Console, go to "Sitemaps"
2. Enter: `sitemap.xml`
3. Click "Submit"
4. Update `sitemap.xml` with your actual domain:
   - Replace all instances of `https://yourdomain.com` with your real URL

### Step 4: Request Indexing
1. Go to "URL Inspection"
2. Enter your homepage URL
3. Click "Request Indexing"
4. Google will crawl your site within a few days

## Part 3: Update Your Website Files

### Files to Update Before Upload:

1. **index.html**
   - Replace `GA_MEASUREMENT_ID` with your actual Google Analytics ID
   - Add Search Console meta tag if using that method

2. **sitemap.xml**
   - Replace `https://yourdomain.com` with your actual domain
   - Update dates if needed

3. **robots.txt**
   - Replace `https://yourdomain.com` with your actual domain

### Files to Upload:
- index.html (updated)
- sitemap.xml
- robots.txt
- google-verification.html (if using file method)

## Part 4: Monitor Your Success

### Google Analytics - What to Track:
- **Audience**: Who visits your site
- **Acquisition**: How they find you
- **Behavior**: What pages they view
- **Real-time**: Current visitors

### Search Console - What to Monitor:
- **Performance**: Search clicks and impressions
- **Coverage**: Indexing status
- **Mobile Usability**: Mobile issues
- **Core Web Vitals**: Page speed metrics

## Part 5: Advanced Setup (Optional)

### Enhanced Analytics Tracking:
Add event tracking for user interactions:

```javascript
// Track supplement tracking
gtag('event', 'track_supplement', {
    'event_category': 'engagement',
    'event_label': supplementName
});

// Track sauna session
gtag('event', 'track_sauna', {
    'event_category': 'engagement',
    'value': duration
});

// Track search
gtag('event', 'search', {
    'search_term': query
});
```

### Rich Snippets (SEO Enhancement):
Add structured data to index.html:

```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": "Rhonda Patrick Wellness Tracker",
    "description": "Track supplements and sauna sessions based on Dr. Rhonda Patrick's protocols",
    "url": "https://yourdomain.com"
}
</script>
```

## Troubleshooting

**Analytics not showing data:**
- Check if ad blockers are enabled
- Verify the tracking code is correct
- Wait 24-48 hours for data to appear

**Search Console verification failing:**
- Ensure file is in root directory (public_html)
- Check file permissions (should be readable)
- Try alternative verification method

**Sitemap errors:**
- Validate at: https://www.xml-sitemaps.com/validate-xml-sitemap.html
- Ensure all URLs are absolute (include https://)
- Check for typos in domain name

## Next Steps

1. Set up goals in Analytics (track conversions)
2. Create custom alerts for traffic spikes
3. Monitor search queries in Search Console
4. Optimize based on user behavior data
5. Submit site to Bing Webmaster Tools too

## Important Notes

- Analytics data takes 24-48 hours to populate
- Search indexing can take 1-2 weeks
- Keep your sitemap updated with new pages
- Monitor Core Web Vitals for SEO performance