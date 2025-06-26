// Database UI integration for Rhonda Patrick website
// Handles all database interactions and UI updates

class RhondaDBUI {
    constructor() {
        this.db = new RhondaDB();
        this.currentTab = 'overview';
        this.initializeUI();
        this.loadData();
    }

    initializeUI() {
        this.createDatabasePanel();
        this.bindEvents();
    }

    createDatabasePanel() {
        // Create floating database panel
        const panel = document.createElement('div');
        panel.id = 'db-panel';
        panel.className = 'db-panel';
        panel.innerHTML = `
            <div class="db-header">
                <h3>📊 Personal Tracking</h3>
                <button id="db-toggle" class="db-toggle">−</button>
            </div>
            <div class="db-content">
                <div class="db-tabs">
                    <button class="db-tab active" data-tab="overview">Overview</button>
                    <button class="db-tab" data-tab="track">Track</button>
                    <button class="db-tab" data-tab="search">Search</button>
                    <button class="db-tab" data-tab="stats">Stats</button>
                </div>
                <div class="db-tab-content">
                    <div id="overview-tab" class="tab-pane active">
                        <div id="overview-content"></div>
                    </div>
                    <div id="track-tab" class="tab-pane">
                        <div id="track-content"></div>
                    </div>
                    <div id="search-tab" class="tab-pane">
                        <div id="search-content"></div>
                    </div>
                    <div id="stats-tab" class="tab-pane">
                        <div id="stats-content"></div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(panel);
        this.addDatabaseStyles();
    }

    addDatabaseStyles() {
        const styles = `
            .db-panel {
                position: fixed;
                top: 80px;
                right: 20px;
                width: 350px;
                max-height: 80vh;
                background: white;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                z-index: 1000;
                overflow: hidden;
                transition: all 0.3s ease;
            }

            .db-panel.collapsed .db-content {
                display: none;
            }

            .db-header {
                background: #3498db;
                color: white;
                padding: 12px 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .db-header h3 {
                margin: 0;
                font-size: 1rem;
            }

            .db-toggle {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 4px;
            }

            .db-toggle:hover {
                background: rgba(255,255,255,0.2);
            }

            .db-content {
                max-height: calc(80vh - 60px);
                overflow-y: auto;
            }

            .db-tabs {
                display: flex;
                background: #f8f9fa;
                border-bottom: 1px solid #e0e0e0;
            }

            .db-tab {
                flex: 1;
                padding: 8px 4px;
                border: none;
                background: none;
                cursor: pointer;
                font-size: 0.85rem;
                color: #6c757d;
                transition: all 0.2s;
            }

            .db-tab.active {
                background: white;
                color: #3498db;
                border-bottom: 2px solid #3498db;
            }

            .db-tab:hover:not(.active) {
                background: #e9ecef;
            }

            .tab-pane {
                display: none;
                padding: 16px;
            }

            .tab-pane.active {
                display: block;
            }

            .overview-stats {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 12px;
                margin-bottom: 16px;
            }

            .stat-card {
                background: #f8f9fa;
                padding: 12px;
                border-radius: 6px;
                text-align: center;
                border-left: 3px solid #3498db;
            }

            .stat-number {
                font-size: 1.5rem;
                font-weight: bold;
                color: #3498db;
                margin-bottom: 4px;
            }

            .stat-label {
                font-size: 0.8rem;
                color: #6c757d;
            }

            .track-form {
                margin-bottom: 16px;
            }

            .form-group {
                margin-bottom: 12px;
            }

            .form-group label {
                display: block;
                margin-bottom: 4px;
                font-size: 0.9rem;
                font-weight: 500;
                color: #495057;
            }

            .form-group input,
            .form-group select,
            .form-group textarea {
                width: 100%;
                padding: 8px;
                border: 1px solid #ced4da;
                border-radius: 4px;
                font-size: 0.9rem;
            }

            .form-group textarea {
                resize: vertical;
                min-height: 60px;
            }

            .btn-primary {
                background: #3498db;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.9rem;
                width: 100%;
                transition: background 0.2s;
            }

            .btn-primary:hover {
                background: #2980b9;
            }

            .search-results {
                margin-top: 12px;
            }

            .search-result {
                background: #f8f9fa;
                padding: 12px;
                margin-bottom: 8px;
                border-radius: 6px;
                border-left: 3px solid #28a745;
            }

            .search-result-name {
                font-weight: 600;
                color: #495057;
                margin-bottom: 4px;
            }

            .search-result-details {
                font-size: 0.85rem;
                color: #6c757d;
            }

            .cost-breakdown {
                margin-bottom: 16px;
            }

            .cost-item {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                border-bottom: 1px solid #e9ecef;
            }

            .cost-total {
                font-weight: bold;
                font-size: 1.1rem;
                color: #e74c3c;
                margin-top: 8px;
                padding-top: 8px;
                border-top: 2px solid #e74c3c;
            }

            .recent-activity {
                margin-top: 16px;
            }

            .activity-item {
                display: flex;
                align-items: center;
                padding: 8px 0;
                border-bottom: 1px solid #f1f3f4;
            }

            .activity-icon {
                margin-right: 8px;
                font-size: 1.1rem;
            }

            .activity-text {
                flex: 1;
                font-size: 0.9rem;
                color: #495057;
            }

            .activity-time {
                font-size: 0.8rem;
                color: #6c757d;
            }

            @media (max-width: 768px) {
                .db-panel {
                    position: fixed;
                    top: auto;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    width: 100%;
                    max-height: 50vh;
                    border-radius: 16px 16px 0 0;
                }

                .overview-stats {
                    grid-template-columns: 1fr;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    bindEvents() {
        // Tab switching
        document.querySelectorAll('.db-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Panel toggle
        document.getElementById('db-toggle').addEventListener('click', () => {
            this.togglePanel();
        });

        // Track supplement form
        this.setupTrackingForms();

        // Search
        this.setupSearch();
    }

    switchTab(tabName) {
        // Update active tab
        document.querySelectorAll('.db-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update active content
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');

        this.currentTab = tabName;
        this.loadTabContent(tabName);
    }

    togglePanel() {
        const panel = document.getElementById('db-panel');
        const toggle = document.getElementById('db-toggle');
        
        panel.classList.toggle('collapsed');
        toggle.textContent = panel.classList.contains('collapsed') ? '+' : '−';
    }

    loadData() {
        this.loadTabContent(this.currentTab);
    }

    loadTabContent(tabName) {
        switch (tabName) {
            case 'overview':
                this.loadOverview();
                break;
            case 'track':
                this.loadTracking();
                break;
            case 'search':
                this.loadSearch();
                break;
            case 'stats':
                this.loadStats();
                break;
        }
    }

    loadOverview() {
        const stats = this.db.getUserStats();
        const costs = this.db.getSupplementCosts();
        
        const content = `
            <div class="overview-stats">
                <div class="stat-card">
                    <div class="stat-number">${stats.supplements_tracked_30_days}</div>
                    <div class="stat-label">Supplements (30d)</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${stats.sauna_sessions_30_days}</div>
                    <div class="stat-label">Sauna Sessions (30d)</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">$${costs.total_monthly}</div>
                    <div class="stat-label">Monthly Cost</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${stats.consistency_score}%</div>
                    <div class="stat-label">Consistency Score</div>
                </div>
            </div>
            <div class="quick-actions">
                <button class="btn-primary" onclick="rhondaDBUI.quickTrackSauna()">
                    🧖‍♀️ Log Sauna Session
                </button>
            </div>
        `;
        
        document.getElementById('overview-content').innerHTML = content;
    }

    loadTracking() {
        const content = `
            <div class="track-form">
                <h4>📊 Track Supplement</h4>
                <div class="form-group">
                    <label>Supplement</label>
                    <select id="supplement-select">
                        <option value="">Select supplement...</option>
                        ${this.getSupplementOptions()}
                    </select>
                </div>
                <div class="form-group">
                    <label>Notes</label>
                    <textarea id="supplement-notes" placeholder="How did you feel? Any effects?"></textarea>
                </div>
                <button class="btn-primary" onclick="rhondaDBUI.trackSupplement()">
                    Track Supplement
                </button>
            </div>

            <div class="track-form">
                <h4>🔥 Track Sauna Session</h4>
                <div class="form-group">
                    <label>Duration (minutes)</label>
                    <input type="number" id="sauna-duration" value="20" min="5" max="60">
                </div>
                <div class="form-group">
                    <label>Temperature (°F)</label>
                    <input type="number" id="sauna-temp" value="174" min="100" max="200">
                </div>
                <div class="form-group">
                    <label>Notes</label>
                    <textarea id="sauna-notes" placeholder="How did you feel? With exercise?"></textarea>
                </div>
                <button class="btn-primary" onclick="rhondaDBUI.trackSauna()">
                    Track Sauna Session
                </button>
            </div>
        `;
        
        document.getElementById('track-content').innerHTML = content;
    }

    loadSearch() {
        const content = `
            <div class="form-group">
                <label>Search Supplements</label>
                <input type="text" id="search-input" placeholder="Search by name, benefit, or notes...">
            </div>
            <div id="search-results" class="search-results"></div>
        `;
        
        document.getElementById('search-content').innerHTML = content;
        
        // Bind search
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.performSearch(e.target.value);
        });
    }

    loadStats() {
        const costs = this.db.getSupplementCosts();
        const stats = this.db.getUserStats();
        
        const content = `
            <div class="cost-breakdown">
                <h4>💰 Monthly Costs</h4>
                <div class="cost-item">
                    <span>Morning</span>
                    <span>$${costs.breakdown_by_timing.morning}</span>
                </div>
                <div class="cost-item">
                    <span>Breakfast</span>
                    <span>$${costs.breakdown_by_timing.breakfast}</span>
                </div>
                <div class="cost-item">
                    <span>Afternoon</span>
                    <span>$${costs.breakdown_by_timing.afternoon}</span>
                </div>
                <div class="cost-item">
                    <span>Evening</span>
                    <span>$${costs.breakdown_by_timing.evening}</span>
                </div>
                <div class="cost-total">
                    <span>Total Monthly</span>
                    <span>$${costs.total_monthly}</span>
                </div>
            </div>

            <div class="stats-details">
                <h4>📈 Your Stats</h4>
                <p><strong>Average Sauna Duration:</strong> ${Math.round(stats.average_sauna_duration)} minutes</p>
                <p><strong>Most Tracked:</strong> ${stats.most_tracked_supplement || 'None yet'}</p>
                <p><strong>Consistency Score:</strong> ${stats.consistency_score}%</p>
            </div>

            <div class="data-export">
                <h4>💾 Data Management</h4>
                <button class="btn-primary" onclick="rhondaDBUI.exportData()" style="margin-bottom: 8px;">
                    Export Data
                </button>
                <button class="btn-primary" onclick="rhondaDBUI.showImportForm()">
                    Import Data
                </button>
            </div>
        `;
        
        document.getElementById('stats-content').innerHTML = content;
    }

    getSupplementOptions() {
        const data = this.db.getData();
        const allSupplements = [
            ...data.supplements.morning,
            ...data.supplements.breakfast,
            ...data.supplements.afternoon,
            ...data.supplements.evening
        ];
        
        return allSupplements.map(supp => 
            `<option value="${supp.id}">${supp.name} (${supp.timing})</option>`
        ).join('');
    }

    setupTrackingForms() {
        // Forms are set up dynamically when tab is loaded
    }

    setupSearch() {
        // Search is set up dynamically when tab is loaded
    }

    performSearch(query) {
        if (query.length < 2) {
            document.getElementById('search-results').innerHTML = '';
            return;
        }

        const results = this.db.searchSupplements(query);
        
        // Google Analytics search tracking
        if (typeof gtag !== 'undefined' && query.length >= 2) {
            gtag('event', 'search', {
                'search_term': query,
                'event_category': 'engagement'
            });
        }
        
        const resultsHTML = results.map(supp => `
            <div class="search-result">
                <div class="search-result-name">${supp.name}</div>
                <div class="search-result-details">
                    <strong>${supp.dosage}</strong> - ${supp.timing}<br>
                    Brand: ${supp.brand}<br>
                    ${supp.notes}
                </div>
            </div>
        `).join('');
        
        document.getElementById('search-results').innerHTML = resultsHTML || '<p>No results found.</p>';
    }

    trackSupplement() {
        const supplementId = document.getElementById('supplement-select').value;
        const notes = document.getElementById('supplement-notes').value;
        
        if (!supplementId) {
            alert('Please select a supplement');
            return;
        }
        
        this.db.trackSupplement(supplementId, true, notes);
        
        // Google Analytics tracking
        if (typeof gtag !== 'undefined') {
            const supplementName = document.getElementById('supplement-select').selectedOptions[0].text;
            gtag('event', 'track_supplement', {
                'event_category': 'engagement',
                'event_label': supplementName
            });
        }
        
        // Clear form
        document.getElementById('supplement-select').value = '';
        document.getElementById('supplement-notes').value = '';
        
        // Show feedback
        this.showNotification('✅ Supplement tracked!');
        
        // Refresh overview if visible
        if (this.currentTab === 'overview') {
            this.loadOverview();
        }
    }

    trackSauna() {
        const duration = parseInt(document.getElementById('sauna-duration').value);
        const temperature = parseInt(document.getElementById('sauna-temp').value);
        const notes = document.getElementById('sauna-notes').value;
        
        if (!duration || !temperature) {
            alert('Please enter duration and temperature');
            return;
        }
        
        this.db.trackSaunaSession(duration, temperature, notes);
        
        // Google Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'track_sauna', {
                'event_category': 'engagement',
                'event_label': 'sauna_session',
                'value': duration
            });
        }
        
        // Clear form
        document.getElementById('sauna-duration').value = '20';
        document.getElementById('sauna-temp').value = '174';
        document.getElementById('sauna-notes').value = '';
        
        // Show feedback
        this.showNotification('🔥 Sauna session tracked!');
        
        // Refresh overview if visible
        if (this.currentTab === 'overview') {
            this.loadOverview();
        }
    }

    quickTrackSauna() {
        this.db.trackSaunaSession(20, 174, 'Quick log');
        this.showNotification('🔥 20min sauna session logged!');
        this.loadOverview();
    }

    exportData() {
        const data = this.db.exportData();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rhonda-patrick-data-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    showImportForm() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (this.db.importData(e.target.result)) {
                        this.showNotification('✅ Data imported successfully!');
                        this.loadData();
                    } else {
                        this.showNotification('❌ Failed to import data');
                    }
                };
                reader.readAsText(file);
            }
        });
        input.click();
    }

    showNotification(message) {
        // Create temporary notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add slide in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize database UI
    window.rhondaDBUI = new RhondaDBUI();
});