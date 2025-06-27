// Dark Mode Toggle Functionality
// Provides theme switching with user preference persistence

class DarkModeManager {
    constructor() {
        this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
        this.initializeDarkMode();
    }

    initializeDarkMode() {
        document.addEventListener('DOMContentLoaded', () => {
            this.createToggleButton();
            this.applyTheme(this.currentTheme);
            this.bindEvents();
        });
    }

    createToggleButton() {
        // Create dark mode toggle button
        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'dark-mode-toggle-container';
        toggleContainer.innerHTML = `
            <button id="darkModeToggle" class="dark-mode-toggle" aria-label="Toggle dark mode">
                <span class="toggle-icon">🌙</span>
                <span class="toggle-text">Dark</span>
            </button>
        `;

        // Add to navigation
        const navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            navContainer.appendChild(toggleContainer);
        }
    }

    bindEvents() {
        const toggle = document.getElementById('darkModeToggle');
        if (toggle) {
            toggle.addEventListener('click', () => this.toggleTheme());
        }

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            if (!this.hasUserPreference()) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
        this.storeTheme(newTheme);
        
        // Track theme change in analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'theme_change', {
                'event_category': 'engagement',
                'event_label': newTheme,
                'value': 1
            });
        }
    }

    applyTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update toggle button
        this.updateToggleButton(theme);
        
        // Update any charts if they exist
        this.updateChartsTheme(theme);
    }

    updateToggleButton(theme) {
        const toggle = document.getElementById('darkModeToggle');
        if (toggle) {
            const icon = toggle.querySelector('.toggle-icon');
            const text = toggle.querySelector('.toggle-text');
            
            if (theme === 'dark') {
                icon.textContent = '☀️';
                text.textContent = 'Light';
            } else {
                icon.textContent = '🌙';
                text.textContent = 'Dark';
            }
        }
    }

    updateChartsTheme(theme) {
        // Update Chart.js charts if they exist
        if (window.wellnessAnalytics && window.wellnessAnalytics.charts) {
            const isDark = theme === 'dark';
            const textColor = isDark ? '#e0e0e0' : '#2c3e50';
            const gridColor = isDark ? '#444' : '#e0e0e0';

            Object.values(window.wellnessAnalytics.charts).forEach(chart => {
                if (chart && chart.options) {
                    // Update text colors
                    if (chart.options.scales) {
                        if (chart.options.scales.x) {
                            chart.options.scales.x.ticks = chart.options.scales.x.ticks || {};
                            chart.options.scales.x.ticks.color = textColor;
                            chart.options.scales.x.grid = chart.options.scales.x.grid || {};
                            chart.options.scales.x.grid.color = gridColor;
                        }
                        if (chart.options.scales.y) {
                            chart.options.scales.y.ticks = chart.options.scales.y.ticks || {};
                            chart.options.scales.y.ticks.color = textColor;
                            chart.options.scales.y.grid = chart.options.scales.y.grid || {};
                            chart.options.scales.y.grid.color = gridColor;
                        }
                    }
                    chart.update();
                }
            });
        }
    }

    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    getStoredTheme() {
        try {
            return localStorage.getItem('theme-preference');
        } catch (error) {
            console.error('Error getting stored theme:', error);
            return null;
        }
    }

    storeTheme(theme) {
        try {
            localStorage.setItem('theme-preference', theme);
        } catch (error) {
            console.error('Error storing theme:', error);
        }
    }

    hasUserPreference() {
        return this.getStoredTheme() !== null;
    }

    // Public methods for external integration
    getCurrentTheme() {
        return this.currentTheme;
    }

    setTheme(theme) {
        if (theme === 'dark' || theme === 'light') {
            this.applyTheme(theme);
            this.storeTheme(theme);
        }
    }
}

// Initialize dark mode
const darkModeManager = new DarkModeManager();

// Export for global access
window.darkModeManager = darkModeManager;