// Create placeholder icons for PWA testing
// This creates simple colored squares as placeholder icons

const fs = require('fs');
const path = require('path');

// Simple SVG icon generator
function createSVGIcon(size, text) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#2c3e50;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#3498db;stop-opacity:1" />
        </linearGradient>
    </defs>
    <rect width="${size}" height="${size}" fill="url(#grad1)" rx="16"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
          fill="white" font-family="Arial, sans-serif" font-weight="bold" 
          font-size="${Math.max(size * 0.12, 12)}">RP</text>
    <text x="50%" y="${size * 0.75}" dominant-baseline="middle" text-anchor="middle" 
          fill="white" font-family="Arial, sans-serif" 
          font-size="${Math.max(size * 0.08, 8)}" opacity="0.9">${text}</text>
</svg>`;
}

// Icon sizes needed for PWA
const iconSizes = [
    { size: 72, name: 'icon-72x72.svg' },
    { size: 96, name: 'icon-96x96.svg' },
    { size: 128, name: 'icon-128x128.svg' },
    { size: 144, name: 'icon-144x144.svg' },
    { size: 152, name: 'icon-152x152.svg' },
    { size: 192, name: 'icon-192x192.svg' },
    { size: 384, name: 'icon-384x384.svg' },
    { size: 512, name: 'icon-512x512.svg' }
];

// Create icons directory
const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir);
}

console.log('🎨 Creating placeholder PWA icons...\n');

// Generate SVG icons
iconSizes.forEach(({ size, name }) => {
    const iconPath = path.join(iconsDir, name);
    const svgContent = createSVGIcon(size, size);
    
    fs.writeFileSync(iconPath, svgContent);
    console.log(`✅ Created ${name} (${size}x${size})`);
});

// Create additional icons for different platforms
const additionalIcons = [
    { size: 180, name: 'icon-180x180.svg' }, // Apple touch icon
    { size: 32, name: 'icon-32x32.svg' },   // Favicon
    { size: 16, name: 'icon-16x16.svg' },   // Favicon
    { size: 70, name: 'icon-70x70.svg' },   // Windows tile
    { size: 150, name: 'icon-150x150.svg' }, // Windows tile
    { size: 310, name: 'icon-310x310.svg' }  // Windows tile
];

additionalIcons.forEach(({ size, name }) => {
    const iconPath = path.join(iconsDir, name);
    const svgContent = createSVGIcon(size, size);
    
    fs.writeFileSync(iconPath, svgContent);
    console.log(`✅ Created ${name} (${size}x${size})`);
});

// Create a favicon.ico placeholder
const faviconPath = path.join(__dirname, 'favicon.ico');
if (!fs.existsSync(faviconPath)) {
    // Create a minimal favicon placeholder
    const faviconSVG = createSVGIcon(32, '32');
    fs.writeFileSync(path.join(iconsDir, 'favicon.svg'), faviconSVG);
    console.log('✅ Created favicon.svg (convert to .ico for production)');
}

console.log('\n🎉 Placeholder icons created successfully!');
console.log('\n📝 Note: These are SVG placeholders for testing.');
console.log('For production, convert to PNG format and use custom branding.');
console.log('\n💡 Conversion tip:');
console.log('Use online tools or ImageMagick to convert SVG to PNG:');
console.log('convert icon-192x192.svg icon-192x192.png');

// Update manifest to use SVG icons for now
console.log('\n🔧 Consider updating manifest.json to use .svg icons for testing');
console.log('or convert these to PNG format for broader compatibility.');

module.exports = { createSVGIcon, iconSizes };