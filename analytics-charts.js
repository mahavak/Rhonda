// Advanced Analytics and Charts for Rhonda Patrick Wellness Tracker
// Integrates with existing database to provide visual insights

class WellnessAnalytics {
    constructor(database) {
        this.db = database;
        this.charts = {};
        this.initializeAnalytics();
    }

    initializeAnalytics() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupAnalytics());
        } else {
            this.setupAnalytics();
        }
    }

    setupAnalytics() {
        this.addAnalyticsTab();
        this.bindAnalyticsEvents();
    }

    addAnalyticsTab() {
        // Add Analytics tab to existing database UI
        const tabsContainer = document.querySelector('.db-tabs');
        if (tabsContainer) {
            const analyticsTab = document.createElement('button');
            analyticsTab.className = 'db-tab';
            analyticsTab.setAttribute('data-tab', 'analytics');
            analyticsTab.textContent = 'Analytics';
            tabsContainer.appendChild(analyticsTab);

            // Add analytics content pane
            const tabContent = document.querySelector('.db-tab-content');
            if (tabContent) {
                const analyticsPane = document.createElement('div');
                analyticsPane.id = 'analytics-tab';
                analyticsPane.className = 'tab-pane';
                analyticsPane.innerHTML = this.getAnalyticsHTML();
                tabContent.appendChild(analyticsPane);
            }
        }
    }

    getAnalyticsHTML() {
        return `
            <div class="analytics-dashboard">
                <h4>📊 Your Wellness Analytics</h4>
                
                <div class="analytics-summary">
                    <div class="summary-cards">
                        <div class="summary-card">
                            <div class="summary-number" id="total-supplements">0</div>
                            <div class="summary-label">Total Supplements Tracked</div>
                        </div>
                        <div class="summary-card">
                            <div class="summary-number" id="total-sauna">0</div>
                            <div class="summary-label">Total Sauna Sessions</div>
                        </div>
                        <div class="summary-card">
                            <div class="summary-number" id="current-streak">0</div>
                            <div class="summary-label">Current Streak (Days)</div>
                        </div>
                        <div class="summary-card">
                            <div class="summary-number" id="avg-consistency">0%</div>
                            <div class="summary-label">Avg Weekly Consistency</div>
                        </div>
                    </div>
                </div>

                <div class="charts-container">
                    <div class="chart-section">
                        <h5>📈 Supplement Tracking Over Time</h5>
                        <canvas id="supplementTrendChart" width="400" height="200"></canvas>
                    </div>
                    
                    <div class="chart-section">
                        <h5>🔥 Sauna Session Analysis</h5>
                        <canvas id="saunaAnalysisChart" width="400" height="200"></canvas>
                    </div>
                    
                    <div class="chart-section">
                        <h5>💊 Most Tracked Supplements</h5>
                        <canvas id="supplementFrequencyChart" width="400" height="200"></canvas>
                    </div>
                    
                    <div class="chart-section">
                        <h5>📅 Weekly Consistency Heatmap</h5>
                        <div id="consistencyHeatmap" class="heatmap-container"></div>
                    </div>
                </div>

                <div class="insights-section">
                    <h5>🧠 Personalized Insights</h5>
                    <div id="personalizedInsights" class="insights-list"></div>
                </div>
            </div>
        `;
    }

    bindAnalyticsEvents() {
        // Listen for tab switches to analytics
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-tab="analytics"]')) {
                this.loadAnalytics();
            }
        });
    }

    loadAnalytics() {
        this.updateSummaryCards();
        this.createSupplementTrendChart();
        this.createSaunaAnalysisChart();
        this.createSupplementFrequencyChart();
        this.createConsistencyHeatmap();
        this.generatePersonalizedInsights();
    }

    updateSummaryCards() {
        const data = this.db.getData();
        
        // Total supplements tracked
        const totalSupplements = data.userProgress.supplementsTracked.length;
        document.getElementById('total-supplements').textContent = totalSupplements;

        // Total sauna sessions
        const totalSauna = data.userProgress.saunaSession.length;
        document.getElementById('total-sauna').textContent = totalSauna;

        // Current streak
        const streak = this.calculateCurrentStreak(data);
        document.getElementById('current-streak').textContent = streak;

        // Average consistency
        const consistency = this.calculateAverageConsistency(data);
        document.getElementById('avg-consistency').textContent = `${consistency}%`;
    }

    calculateCurrentStreak(data) {
        const recentActivities = [
            ...data.userProgress.supplementsTracked,
            ...data.userProgress.saunaSession
        ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        let streak = 0;
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        for (let activity of recentActivities) {
            const activityDate = new Date(activity.timestamp);
            activityDate.setHours(0, 0, 0, 0);
            
            const daysDiff = Math.floor((currentDate - activityDate) / (1000 * 60 * 60 * 24));
            
            if (daysDiff === streak) {
                streak++;
            } else if (daysDiff > streak) {
                break;
            }
        }

        return streak;
    }

    calculateAverageConsistency(data) {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const recentSupplements = data.userProgress.supplementsTracked.filter(
            s => new Date(s.timestamp) > thirtyDaysAgo
        );

        const recentSauna = data.userProgress.saunaSession.filter(
            s => new Date(s.timestamp) > thirtyDaysAgo
        );

        const totalDays = 30;
        const activeDays = new Set([
            ...recentSupplements.map(s => s.date),
            ...recentSauna.map(s => s.date)
        ]).size;

        return Math.round((activeDays / totalDays) * 100);
    }

    createSupplementTrendChart() {
        const ctx = document.getElementById('supplementTrendChart').getContext('2d');
        const data = this.getSupplementTrendData();

        if (this.charts.supplementTrend) {
            this.charts.supplementTrend.destroy();
        }

        this.charts.supplementTrend = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Daily Supplements',
                    data: data.values,
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    getSupplementTrendData() {
        const data = this.db.getData();
        const last30Days = [];
        const now = new Date();

        // Generate last 30 days
        for (let i = 29; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            last30Days.push(date.toISOString().split('T')[0]);
        }

        const supplementCounts = last30Days.map(date => {
            return data.userProgress.supplementsTracked.filter(s => s.date === date).length;
        });

        return {
            labels: last30Days.map(date => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
            values: supplementCounts
        };
    }

    createSaunaAnalysisChart() {
        const ctx = document.getElementById('saunaAnalysisChart').getContext('2d');
        const data = this.getSaunaAnalysisData();

        if (this.charts.saunaAnalysis) {
            this.charts.saunaAnalysis.destroy();
        }

        this.charts.saunaAnalysis = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Duration vs Temperature',
                    data: data.points,
                    backgroundColor: '#e74c3c',
                    borderColor: '#c0392b',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Temperature (°F)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Duration (minutes)'
                        }
                    }
                }
            }
        });
    }

    getSaunaAnalysisData() {
        const data = this.db.getData();
        const points = data.userProgress.saunaSession.map(session => ({
            x: session.temperature,
            y: session.duration
        }));

        return { points };
    }

    createSupplementFrequencyChart() {
        const ctx = document.getElementById('supplementFrequencyChart').getContext('2d');
        const data = this.getSupplementFrequencyData();

        if (this.charts.supplementFrequency) {
            this.charts.supplementFrequency.destroy();
        }

        this.charts.supplementFrequency = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.values,
                    backgroundColor: [
                        '#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6',
                        '#1abc9c', '#34495e', '#e67e22', '#95a5a6', '#16a085'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    getSupplementFrequencyData() {
        const data = this.db.getData();
        const frequency = {};

        data.userProgress.supplementsTracked.forEach(track => {
            frequency[track.supplementId] = (frequency[track.supplementId] || 0) + 1;
        });

        const sortedEntries = Object.entries(frequency)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 8); // Top 8 supplements

        return {
            labels: sortedEntries.map(([id]) => {
                // Find supplement name from database
                const allSupplements = [
                    ...data.supplements.morning,
                    ...data.supplements.breakfast,
                    ...data.supplements.afternoon,
                    ...data.supplements.evening
                ];
                const supplement = allSupplements.find(s => s.id === id);
                return supplement ? supplement.name : id;
            }),
            values: sortedEntries.map(([,count]) => count)
        };
    }

    createConsistencyHeatmap() {
        const container = document.getElementById('consistencyHeatmap');
        const data = this.getConsistencyHeatmapData();
        
        container.innerHTML = this.generateHeatmapHTML(data);
    }

    getConsistencyHeatmapData() {
        const data = this.db.getData();
        const last90Days = [];
        const now = new Date();

        // Generate last 90 days
        for (let i = 89; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            last90Days.push({
                date: date.toISOString().split('T')[0],
                day: date.getDay(),
                activity: 0
            });
        }

        // Count activities per day
        last90Days.forEach(day => {
            const supplementCount = data.userProgress.supplementsTracked.filter(s => s.date === day.date).length;
            const saunaCount = data.userProgress.saunaSession.filter(s => s.date === day.date).length;
            day.activity = supplementCount + saunaCount;
        });

        return last90Days;
    }

    generateHeatmapHTML(data) {
        const weeks = [];
        let currentWeek = [];

        data.forEach((day, index) => {
            currentWeek.push(day);
            if (day.day === 6 || index === data.length - 1) { // Sunday or last day
                weeks.push([...currentWeek]);
                currentWeek = [];
            }
        });

        const maxActivity = Math.max(...data.map(d => d.activity));

        return `
            <div class="heatmap-grid">
                ${weeks.map(week => `
                    <div class="heatmap-week">
                        ${week.map(day => {
                            const intensity = maxActivity > 0 ? day.activity / maxActivity : 0;
                            const color = this.getHeatmapColor(intensity);
                            return `<div class="heatmap-day" style="background-color: ${color}" title="${day.date}: ${day.activity} activities"></div>`;
                        }).join('')}
                    </div>
                `).join('')}
            </div>
            <div class="heatmap-legend">
                <span>Less</span>
                <div class="legend-colors">
                    ${[0, 0.25, 0.5, 0.75, 1].map(intensity => 
                        `<div class="legend-color" style="background-color: ${this.getHeatmapColor(intensity)}"></div>`
                    ).join('')}
                </div>
                <span>More</span>
            </div>
        `;
    }

    getHeatmapColor(intensity) {
        const colors = ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'];
        const index = Math.floor(intensity * (colors.length - 1));
        return colors[Math.min(index, colors.length - 1)];
    }

    generatePersonalizedInsights() {
        const container = document.getElementById('personalizedInsights');
        const insights = this.calculateInsights();
        
        container.innerHTML = insights.map(insight => `
            <div class="insight-item">
                <div class="insight-icon">${insight.icon}</div>
                <div class="insight-content">
                    <div class="insight-title">${insight.title}</div>
                    <div class="insight-description">${insight.description}</div>
                </div>
            </div>
        `).join('');
    }

    calculateInsights() {
        const data = this.db.getData();
        const insights = [];

        // Consistency insight
        const consistency = this.calculateAverageConsistency(data);
        if (consistency >= 80) {
            insights.push({
                icon: '🏆',
                title: 'Excellent Consistency!',
                description: `You're maintaining ${consistency}% consistency. Keep up the great work!`
            });
        } else if (consistency >= 60) {
            insights.push({
                icon: '📈',
                title: 'Good Progress',
                description: `${consistency}% consistency is solid. Try to improve by 10% next month.`
            });
        } else {
            insights.push({
                icon: '💪',
                title: 'Room for Improvement',
                description: `${consistency}% consistency. Small daily habits compound over time!`
            });
        }

        // Sauna insight
        const recentSauna = data.userProgress.saunaSession.filter(
            s => new Date(s.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        );
        
        if (recentSauna.length >= 4) {
            insights.push({
                icon: '🔥',
                title: 'Sauna Champion',
                description: `${recentSauna.length} sauna sessions this week! You're hitting Rhonda's optimal frequency.`
            });
        } else if (recentSauna.length >= 2) {
            insights.push({
                icon: '🧖‍♀️',
                title: 'Solid Sauna Practice',
                description: `${recentSauna.length} sessions this week. Aim for 4-7 weekly for maximum benefits.`
            });
        }

        // Cost insight
        const costs = this.db.getSupplementCosts();
        insights.push({
            icon: '💰',
            title: 'Monthly Investment',
            description: `You're investing $${costs.total_monthly}/month in your health. That's $${(costs.total_monthly * 12).toFixed(0)}/year.`
        });

        return insights;
    }
}

// Initialize analytics when the database UI is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait for database to be initialized
    setTimeout(() => {
        if (window.rhondaDBUI && window.rhondaDBUI.db) {
            window.wellnessAnalytics = new WellnessAnalytics(window.rhondaDBUI.db);
        }
    }, 1000);
});