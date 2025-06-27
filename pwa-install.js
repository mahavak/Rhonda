// PWA Installation Manager
// Handles app installation prompts and service worker registration

class PWAInstallManager {
    constructor() {
        this.deferredPrompt = null;
        this.installButton = null;
        this.isInstalled = false;
        this.serviceWorkerRegistration = null;
        
        this.initializePWA();
    }

    async initializePWA() {
        document.addEventListener('DOMContentLoaded', () => {
            this.createInstallButton();
            this.bindEvents();
            this.checkInstallStatus();
        });
        
        await this.registerServiceWorker();
    }

    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                console.log('[PWA] Registering service worker...');
                
                this.serviceWorkerRegistration = await navigator.serviceWorker.register('/sw.js', {
                    scope: '/'
                });
                
                console.log('[PWA] Service Worker registered successfully');
                
                // Listen for updates
                this.serviceWorkerRegistration.addEventListener('updatefound', () => {
                    console.log('[PWA] New service worker found');
                    this.handleServiceWorkerUpdate();
                });
                
                // Check if there's a waiting service worker
                if (this.serviceWorkerRegistration.waiting) {
                    this.showUpdateNotification();
                }
                
            } catch (error) {
                console.error('[PWA] Service Worker registration failed:', error);
            }
        } else {
            console.log('[PWA] Service Worker not supported');
        }
    }

    createInstallButton() {
        // Create install button
        const installContainer = document.createElement('div');
        installContainer.className = 'pwa-install-container';
        installContainer.style.display = 'none';
        
        installContainer.innerHTML = `
            <div class="pwa-install-banner">
                <div class="pwa-install-content">
                    <div class="pwa-install-icon">📱</div>
                    <div class="pwa-install-text">
                        <strong>Install Rhonda Tracker</strong>
                        <p>Add to home screen for quick access and offline use</p>
                    </div>
                    <div class="pwa-install-actions">
                        <button id="pwa-install-btn" class="pwa-install-button">Install</button>
                        <button id="pwa-dismiss-btn" class="pwa-dismiss-button">×</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(installContainer);
        
        this.installButton = document.getElementById('pwa-install-btn');
        this.installContainer = installContainer;
    }

    bindEvents() {
        // Install button click
        if (this.installButton) {
            this.installButton.addEventListener('click', () => this.installApp());
        }

        // Dismiss button click
        const dismissButton = document.getElementById('pwa-dismiss-btn');
        if (dismissButton) {
            dismissButton.addEventListener('click', () => this.dismissInstallPrompt());
        }

        // Listen for beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('[PWA] beforeinstallprompt event fired');
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallPrompt();
        });

        // Listen for app installation
        window.addEventListener('appinstalled', () => {
            console.log('[PWA] App installed successfully');
            this.handleAppInstalled();
        });

        // Listen for online/offline status
        window.addEventListener('online', () => this.handleOnlineStatus(true));
        window.addEventListener('offline', () => this.handleOnlineStatus(false));
    }

    showInstallPrompt() {
        // Don't show if already installed or dismissed recently
        const dismissed = localStorage.getItem('pwa-install-dismissed');
        const dismissTime = dismissed ? parseInt(dismissed) : 0;
        const daysSinceDismiss = (Date.now() - dismissTime) / (1000 * 60 * 60 * 24);
        
        if (this.isInstalled || (dismissed && daysSinceDismiss < 7)) {
            return;
        }
        
        if (this.installContainer) {
            this.installContainer.style.display = 'block';
            
            // Animate in
            setTimeout(() => {
                this.installContainer.classList.add('pwa-install-visible');
            }, 100);
        }
    }

    dismissInstallPrompt() {
        if (this.installContainer) {
            this.installContainer.style.display = 'none';
            this.installContainer.classList.remove('pwa-install-visible');
        }
        
        // Remember dismissal
        localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    }

    async installApp() {
        if (!this.deferredPrompt) {
            console.log('[PWA] No deferred prompt available');
            return;
        }

        try {
            // Show install prompt
            this.deferredPrompt.prompt();
            
            // Wait for user response
            const { outcome } = await this.deferredPrompt.userChoice;
            
            console.log('[PWA] Install prompt outcome:', outcome);
            
            if (outcome === 'accepted') {
                this.trackInstallEvent('accepted');
            } else {
                this.trackInstallEvent('dismissed');
            }
            
            // Clear the deferred prompt
            this.deferredPrompt = null;
            this.dismissInstallPrompt();
            
        } catch (error) {
            console.error('[PWA] Install prompt failed:', error);
        }
    }

    handleAppInstalled() {
        this.isInstalled = true;
        this.dismissInstallPrompt();
        this.trackInstallEvent('installed');
        
        // Show welcome message
        this.showInstallSuccessMessage();
    }

    showInstallSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'pwa-success-message';
        message.innerHTML = `
            <div class="pwa-success-content">
                <div class="pwa-success-icon">✅</div>
                <div class="pwa-success-text">
                    <strong>App Installed!</strong>
                    <p>Rhonda Tracker is now available from your home screen</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(message);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 5000);
    }

    checkInstallStatus() {
        // Check if app is installed
        if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
            this.isInstalled = true;
            console.log('[PWA] App is running in standalone mode');
        }
        
        // Check if running as PWA
        if (window.navigator.standalone === true) {
            this.isInstalled = true;
            console.log('[PWA] App is running as PWA on iOS');
        }
    }

    handleServiceWorkerUpdate() {
        const newWorker = this.serviceWorkerRegistration.installing;
        
        newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                this.showUpdateNotification();
            }
        });
    }

    showUpdateNotification() {
        const updateBanner = document.createElement('div');
        updateBanner.className = 'pwa-update-banner';
        updateBanner.innerHTML = `
            <div class="pwa-update-content">
                <div class="pwa-update-text">
                    <strong>Update Available</strong>
                    <p>A new version of the app is available</p>
                </div>
                <button id="pwa-update-btn" class="pwa-update-button">Update</button>
            </div>
        `;
        
        document.body.appendChild(updateBanner);
        
        // Handle update button click
        const updateButton = updateBanner.querySelector('#pwa-update-btn');
        updateButton.addEventListener('click', () => {
            this.applyUpdate();
            updateBanner.remove();
        });
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (updateBanner.parentNode) {
                updateBanner.remove();
            }
        }, 10000);
    }

    applyUpdate() {
        if (this.serviceWorkerRegistration && this.serviceWorkerRegistration.waiting) {
            // Tell the waiting service worker to skip waiting
            this.serviceWorkerRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
            
            // Reload the page to use the new service worker
            window.location.reload();
        }
    }

    handleOnlineStatus(isOnline) {
        console.log('[PWA] Online status:', isOnline);
        
        // Show online/offline indicator
        this.showConnectionStatus(isOnline);
        
        // Trigger background sync when coming back online
        if (isOnline && this.serviceWorkerRegistration && this.serviceWorkerRegistration.sync) {
            this.serviceWorkerRegistration.sync.register('wellness-data-sync');
            this.serviceWorkerRegistration.sync.register('newsletter-signup-sync');
        }
    }

    showConnectionStatus(isOnline) {
        // Remove existing status
        const existingStatus = document.querySelector('.pwa-connection-status');
        if (existingStatus) {
            existingStatus.remove();
        }
        
        if (!isOnline) {
            const statusBar = document.createElement('div');
            statusBar.className = 'pwa-connection-status pwa-offline';
            statusBar.innerHTML = `
                <div class="pwa-status-content">
                    <span class="pwa-status-icon">📴</span>
                    <span class="pwa-status-text">You're offline - some features may be limited</span>
                </div>
            `;
            
            document.body.insertBefore(statusBar, document.body.firstChild);
        }
    }

    trackInstallEvent(action) {
        // Google Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'pwa_install', {
                'event_category': 'engagement',
                'event_label': action,
                'value': 1
            });
        }
        
        // Track in database if available
        if (window.rhondaDBUI?.db) {
            window.rhondaDBUI.db.addUserNote(`PWA ${action}`);
        }
        
        console.log('[PWA] Install event tracked:', action);
    }

    // Public methods for external integration
    isAppInstalled() {
        return this.isInstalled;
    }

    canInstall() {
        return this.deferredPrompt !== null;
    }

    forceShowInstallPrompt() {
        if (this.canInstall()) {
            this.showInstallPrompt();
        }
    }

    getServiceWorkerRegistration() {
        return this.serviceWorkerRegistration;
    }
}

// Initialize PWA functionality
const pwaInstallManager = new PWAInstallManager();

// Export for global access
window.pwaInstallManager = pwaInstallManager;