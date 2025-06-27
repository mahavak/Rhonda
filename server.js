// Simple Node.js development server for testing PWA functionality
// Serves static files with proper MIME types and HTTPS support

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

class DevServer {
    constructor(options = {}) {
        this.port = options.port || 3000;
        this.httpsPort = options.httpsPort || 3001;
        this.host = options.host || 'localhost';
        this.staticDir = options.staticDir || __dirname;
        
        // MIME types for proper file serving
        this.mimeTypes = {
            '.html': 'text/html',
            '.js': 'application/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.ico': 'image/x-icon',
            '.xml': 'application/xml',
            '.webmanifest': 'application/manifest+json'
        };
    }

    start() {
        // Create HTTP server
        const httpServer = http.createServer((req, res) => {
            this.handleRequest(req, res);
        });

        httpServer.listen(this.port, this.host, () => {
            console.log(`🌐 HTTP Server running at http://${this.host}:${this.port}/`);
            console.log(`📱 PWA testing: Use HTTPS for full PWA features`);
        });

        // Try to create HTTPS server for PWA testing
        this.startHTTPS();
    }

    startHTTPS() {
        try {
            // Generate self-signed certificate for testing
            const cert = this.generateSelfSignedCert();
            
            const httpsServer = https.createServer({
                key: cert.key,
                cert: cert.cert
            }, (req, res) => {
                this.handleRequest(req, res);
            });

            httpsServer.listen(this.httpsPort, this.host, () => {
                console.log(`🔒 HTTPS Server running at https://${this.host}:${this.httpsPort}/`);
                console.log(`✅ PWA features fully available on HTTPS`);
                console.log(`⚠️  Accept the self-signed certificate warning in your browser`);
            });
        } catch (error) {
            console.log(`❌ HTTPS server failed: ${error.message}`);
            console.log(`💡 Install openssl or use HTTP for basic testing`);
        }
    }

    handleRequest(req, res) {
        const parsedUrl = url.parse(req.url, true);
        let pathname = parsedUrl.pathname;
        
        // Default to index.html for root
        if (pathname === '/') {
            pathname = '/index.html';
        }
        
        const filePath = path.join(this.staticDir, pathname);
        const ext = path.extname(filePath).toLowerCase();
        const mimeType = this.mimeTypes[ext] || 'application/octet-stream';
        
        // Security headers for PWA
        const headers = {
            'Content-Type': mimeType,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'SAMEORIGIN',
            'Referrer-Policy': 'strict-origin-when-cross-origin'
        };
        
        // Service Worker specific headers
        if (pathname === '/sw.js') {
            headers['Service-Worker-Allowed'] = '/';
            headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
        }
        
        // Manifest specific headers
        if (pathname === '/manifest.json') {
            headers['Content-Type'] = 'application/manifest+json';
        }
        
        // Check if file exists
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                // File not found
                res.writeHead(404, headers);
                res.end('404 - File Not Found');
                console.log(`❌ 404: ${pathname}`);
                return;
            }
            
            // Read and serve file
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500, headers);
                    res.end('500 - Internal Server Error');
                    console.log(`❌ 500: ${pathname}`);
                    return;
                }
                
                res.writeHead(200, headers);
                res.end(data);
                console.log(`✅ ${res.statusCode}: ${pathname}`);
            });
        });
    }
    
    generateSelfSignedCert() {
        // Basic self-signed certificate for testing
        // In production, use proper SSL certificates
        const key = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC7VIJjTAGVCLAY
example_key_content_for_testing_only
-----END PRIVATE KEY-----`;

        const cert = `-----BEGIN CERTIFICATE-----
MIICljCCAX4CCQCKOjxm4vfauzANBgkqhkiG9w0BAQsFADANMQswCQYDVQQGEwJV
example_cert_content_for_testing_only
-----END CERTIFICATE-----`;
        
        return { key, cert };
    }
}

// PWA Testing utilities
class PWATestUtils {
    static async checkPWARequirements() {
        console.log('\n🔍 PWA Requirements Check:');
        
        const requirements = [
            { name: 'manifest.json', path: './manifest.json' },
            { name: 'service worker', path: './sw.js' },
            { name: 'index.html', path: './index.html' },
            { name: 'HTTPS (for full PWA)', note: 'Required for service workers' }
        ];
        
        for (const req of requirements) {
            if (req.path) {
                try {
                    await fs.promises.access(req.path);
                    console.log(`✅ ${req.name}`);
                } catch {
                    console.log(`❌ ${req.name} - Missing!`);
                }
            } else {
                console.log(`⚠️  ${req.name} - ${req.note}`);
            }
        }
        
        console.log('\n📋 Testing Instructions:');
        console.log('1. Open https://localhost:3001/ in Chrome/Edge');
        console.log('2. Accept the security warning');
        console.log('3. Open DevTools > Application > Service Workers');
        console.log('4. Check for install prompt in address bar');
        console.log('5. Test offline: DevTools > Network > Offline');
        console.log('6. Mobile: Chrome > Menu > Install App');
    }
    
    static printTestingGuide() {
        console.log('\n📱 PWA Testing Guide:');
        console.log('═══════════════════════');
        
        console.log('\n🖥️  Desktop Testing:');
        console.log('• Chrome: Look for install icon in address bar');
        console.log('• Edge: Menu > Apps > Install this site as an app');
        console.log('• Firefox: Limited PWA support');
        
        console.log('\n📱 Mobile Testing:');
        console.log('• Android Chrome: Banner appears automatically');
        console.log('• iOS Safari: Share > Add to Home Screen');
        console.log('• Test offline functionality');
        
        console.log('\n🛠️  Developer Tools:');
        console.log('• Application tab > Service Workers');
        console.log('• Application tab > Manifest');
        console.log('• Lighthouse audit for PWA score');
        console.log('• Network tab > Offline checkbox');
        
        console.log('\n🎯 Test Features:');
        console.log('• Install prompt appears');
        console.log('• App works offline');
        console.log('• Dark mode toggle persists');
        console.log('• Data syncs when back online');
        console.log('• Charts update in dark mode');
        console.log('• Newsletter signup works offline');
    }
}

// Start the development server
if (require.main === module) {
    console.log('🚀 Starting Rhonda Patrick PWA Development Server...\n');
    
    PWATestUtils.checkPWARequirements().then(() => {
        const server = new DevServer({
            port: 3000,
            httpsPort: 3001,
            host: 'localhost'
        });
        
        server.start();
        PWATestUtils.printTestingGuide();
        
        console.log('\n🔥 Ready for PWA testing!');
        console.log('Press Ctrl+C to stop the server');
    });
}

module.exports = { DevServer, PWATestUtils };