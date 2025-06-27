// PWA Validation Script
// Checks if all PWA requirements are met

const fs = require('fs');
const path = require('path');

class PWAValidator {
    constructor() {
        this.errors = [];
        this.warnings = [];
        this.passed = [];
    }

    async validate() {
        console.log('🔍 Validating PWA Requirements...\n');
        
        await this.checkManifest();
        await this.checkServiceWorker();
        await this.checkHTML();
        await this.checkIcons();
        await this.checkFiles();
        
        this.printResults();
        return this.errors.length === 0;
    }

    async checkManifest() {
        try {
            const manifestPath = path.join(__dirname, 'manifest.json');
            const manifest = JSON.parse(await fs.promises.readFile(manifestPath, 'utf8'));
            
            // Required fields
            const required = ['name', 'short_name', 'start_url', 'display', 'icons'];
            for (const field of required) {
                if (!manifest[field]) {
                    this.errors.push(`Manifest missing required field: ${field}`);
                } else {
                    this.passed.push(`Manifest has ${field}`);
                }
            }
            
            // Check icons
            if (manifest.icons && manifest.icons.length > 0) {
                const has192 = manifest.icons.some(icon => icon.sizes.includes('192x192'));
                const has512 = manifest.icons.some(icon => icon.sizes.includes('512x512'));
                
                if (!has192) this.warnings.push('Missing 192x192 icon');
                if (!has512) this.warnings.push('Missing 512x512 icon');
                
                if (has192 && has512) {
                    this.passed.push('Manifest has required icon sizes');
                }
            }
            
            // Check display mode
            if (manifest.display === 'standalone' || manifest.display === 'fullscreen') {
                this.passed.push('Manifest has app-like display mode');
            } else {
                this.warnings.push('Display mode should be "standalone" for better PWA experience');
            }
            
        } catch (error) {
            this.errors.push(`Manifest validation failed: ${error.message}`);
        }
    }

    async checkServiceWorker() {
        try {
            const swPath = path.join(__dirname, 'sw.js');
            const swContent = await fs.promises.readFile(swPath, 'utf8');
            
            // Check for essential service worker features
            const features = [
                { name: 'install event', pattern: /addEventListener\s*\(\s*['"]install['"]/ },
                { name: 'activate event', pattern: /addEventListener\s*\(\s*['"]activate['"]/ },
                { name: 'fetch event', pattern: /addEventListener\s*\(\s*['"]fetch['"]/ },
                { name: 'cache API', pattern: /caches\.(open|match|keys)/ },
                { name: 'skip waiting', pattern: /skipWaiting/ }
            ];
            
            for (const feature of features) {
                if (feature.pattern.test(swContent)) {
                    this.passed.push(`Service Worker has ${feature.name}`);
                } else {
                    this.warnings.push(`Service Worker missing ${feature.name}`);
                }
            }
            
        } catch (error) {
            this.errors.push(`Service Worker validation failed: ${error.message}`);
        }
    }

    async checkHTML() {
        try {
            const htmlPath = path.join(__dirname, 'index.html');
            const htmlContent = await fs.promises.readFile(htmlPath, 'utf8');
            
            // Check for PWA meta tags
            const checks = [
                { name: 'manifest link', pattern: /<link[^>]+rel=["']manifest["']/ },
                { name: 'viewport meta', pattern: /<meta[^>]+name=["']viewport["']/ },
                { name: 'theme color', pattern: /<meta[^>]+name=["']theme-color["']/ },
                { name: 'apple touch icon', pattern: /<link[^>]+apple-touch-icon/ },
                { name: 'apple web app capable', pattern: /<meta[^>]+apple-mobile-web-app-capable/ }
            ];
            
            for (const check of checks) {
                if (check.pattern.test(htmlContent)) {
                    this.passed.push(`HTML has ${check.name}`);
                } else {
                    this.warnings.push(`HTML missing ${check.name}`);
                }
            }
            
            // Check for PWA JavaScript
            if (htmlContent.includes('pwa-install.js')) {
                this.passed.push('HTML includes PWA install script');
            } else {
                this.warnings.push('HTML missing PWA install script');
            }
            
        } catch (error) {
            this.errors.push(`HTML validation failed: ${error.message}`);
        }
    }

    async checkIcons() {
        const iconSizes = ['72x72', '96x96', '128x128', '144x144', '152x152', '192x192', '384x384', '512x512'];
        let iconCount = 0;
        
        for (const size of iconSizes) {
            // Check for both PNG and SVG formats
            try {
                await fs.promises.access(path.join(__dirname, 'icons', `icon-${size}.png`));
                iconCount++;
            } catch {
                try {
                    await fs.promises.access(path.join(__dirname, 'icons', `icon-${size}.svg`));
                    iconCount++;
                } catch {
                    // Icon missing - not an error, just a note
                }
            }
        }
        
        if (iconCount > 0) {
            this.passed.push(`Found ${iconCount} icon files`);
        } else {
            this.warnings.push('No icon files found in /icons/ directory');
        }
    }

    async checkFiles() {
        const requiredFiles = [
            { path: 'index.html', name: 'Main HTML file' },
            { path: 'manifest.json', name: 'Web App Manifest' },
            { path: 'sw.js', name: 'Service Worker' },
            { path: 'style.css', name: 'Main stylesheet' },
            { path: 'pwa-install.js', name: 'PWA install manager' }
        ];
        
        for (const file of requiredFiles) {
            try {
                await fs.promises.access(path.join(__dirname, file.path));
                this.passed.push(`${file.name} exists`);
            } catch {
                this.errors.push(`Missing required file: ${file.path}`);
            }
        }
    }

    printResults() {
        console.log('📊 PWA Validation Results');
        console.log('========================\n');
        
        if (this.passed.length > 0) {
            console.log('✅ Passed Checks:');
            this.passed.forEach(item => console.log(`   • ${item}`));
            console.log('');
        }
        
        if (this.warnings.length > 0) {
            console.log('⚠️  Warnings:');
            this.warnings.forEach(item => console.log(`   • ${item}`));
            console.log('');
        }
        
        if (this.errors.length > 0) {
            console.log('❌ Errors:');
            this.errors.forEach(item => console.log(`   • ${item}`));
            console.log('');
        }
        
        console.log('📈 Summary:');
        console.log(`   Passed: ${this.passed.length}`);
        console.log(`   Warnings: ${this.warnings.length}`);
        console.log(`   Errors: ${this.errors.length}`);
        
        if (this.errors.length === 0) {
            console.log('\n🎉 PWA validation passed! Ready for testing.');
        } else {
            console.log('\n❌ PWA validation failed. Fix errors before testing.');
        }
    }
}

// Run validation if called directly
if (require.main === module) {
    const validator = new PWAValidator();
    validator.validate().then(success => {
        process.exit(success ? 0 : 1);
    });
}

module.exports = PWAValidator;