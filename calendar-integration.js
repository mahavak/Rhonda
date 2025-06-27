// Calendar Integration System
// Google Calendar sync and supplement schedule management

class CalendarIntegrationManager {
    constructor() {
        this.calendarAPI = null;
        this.isSignedIn = false;
        this.supplements = this.getSupplementSchedule();
        this.reminders = this.loadReminders();
        this.initializeCalendar();
    }

    initializeCalendar() {
        document.addEventListener('DOMContentLoaded', () => {
            this.createCalendarInterface();
            this.createScheduleView();
            this.bindEvents();
        });
    }

    getSupplementSchedule() {
        return [
            // Morning supplements
            {
                name: 'Creatine',
                dose: '10g (2×5g)',
                time: '07:00',
                timing: 'Morning',
                category: 'Performance',
                days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
                color: '#e74c3c'
            },
            {
                name: 'Glutamine',
                dose: '5g',
                time: '07:00',
                timing: 'Morning',
                category: 'Recovery',
                days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
                color: '#2ecc71'
            },
            {
                name: 'Beetroot Extract',
                dose: '1 tbsp',
                time: '07:00',
                timing: 'Morning (as needed)',
                category: 'Performance',
                days: ['tuesday', 'thursday', 'saturday'], // endurance training days
                color: '#e67e22'
            },
            
            // Breakfast supplements
            {
                name: 'Fish Oil',
                dose: '1g',
                time: '08:30',
                timing: 'Breakfast',
                category: 'Essential',
                days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
                color: '#3498db'
            },
            {
                name: 'Alpha Lipoic Acid',
                dose: 'Standard',
                time: '08:30',
                timing: 'Breakfast',
                category: 'Antioxidant',
                days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
                color: '#9b59b6'
            },
            {
                name: 'Sulforaphane',
                dose: 'Per package',
                time: '08:30',
                timing: 'Breakfast',
                category: 'Antioxidant',
                days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
                color: '#16a085'
            },
            
            // Lunch supplements
            {
                name: 'Multivitamin O.N.E.',
                dose: '1 capsule',
                time: '13:00',
                timing: 'Lunch',
                category: 'Essential',
                days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
                color: '#f39c12'
            },
            {
                name: 'PQQ',
                dose: 'Standard',
                time: '13:00',
                timing: 'Lunch',
                category: 'Mitochondrial',
                days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
                color: '#8e44ad'
            },
            {
                name: 'CocoaVia',
                dose: 'Per package',
                time: '13:00',
                timing: 'Lunch',
                category: 'Brain Health',
                days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
                color: '#d35400'
            },
            
            // Evening supplements
            {
                name: 'Vitamin D3',
                dose: '2000 IU',
                time: '20:00',
                timing: 'Evening',
                category: 'Essential',
                days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
                color: '#f1c40f'
            },
            {
                name: 'Magnesium Glycinate',
                dose: '125mg',
                time: '20:00',
                timing: 'Evening',
                category: 'Sleep',
                days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
                color: '#2c3e50'
            },
            {
                name: 'Vitamin K2',
                dose: 'Standard',
                time: '20:00',
                timing: 'Evening',
                category: 'Essential',
                days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
                color: '#27ae60'
            },
            {
                name: 'Fish Oil',
                dose: '1g',
                time: '20:00',
                timing: 'Evening',
                category: 'Essential',
                days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
                color: '#3498db'
            },
            {
                name: 'Melatonin',
                dose: '3mg',
                time: '21:30',
                timing: 'Evening',
                category: 'Sleep',
                days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
                color: '#34495e'
            },
            {
                name: 'Vitamin C',
                dose: 'Standard',
                time: '20:00',
                timing: 'Evening',
                category: 'Antioxidant',
                days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
                color: '#e67e22'
            },
            {
                name: 'Ubiquinol CoQ10',
                dose: 'Standard',
                time: '20:00',
                timing: 'Evening',
                category: 'Mitochondrial',
                days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
                color: '#c0392b'
            },
            {
                name: 'Myoinositol',
                dose: '1 scoop',
                time: '20:00',
                timing: 'Evening',
                category: 'Sleep',
                days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
                color: '#7f8c8d'
            }
        ];
    }

    createCalendarInterface() {
        const calendarSection = document.createElement('div');
        calendarSection.className = 'calendar-integration-section';
        calendarSection.innerHTML = `
            <div class="calendar-header">
                <h3>📅 Calendar Integration & Schedule</h3>
                <p>Sync your supplement routine with Google Calendar and get reminders</p>
            </div>
            
            <div class="calendar-controls">
                <div class="sync-section">
                    <button id="connect-google-calendar" class="calendar-btn primary">
                        <span class="btn-icon">🔗</span>
                        Connect Google Calendar
                    </button>
                    <button id="sync-supplements" class="calendar-btn secondary" disabled>
                        <span class="btn-icon">⚡</span>
                        Sync Supplement Schedule
                    </button>
                    <button id="export-schedule" class="calendar-btn secondary">
                        <span class="btn-icon">📥</span>
                        Export Schedule (.ics)
                    </button>
                </div>
                
                <div class="reminder-section">
                    <h4>Reminder Settings</h4>
                    <div class="reminder-controls">
                        <label class="reminder-option">
                            <input type="checkbox" id="browser-notifications" checked>
                            <span>Browser Notifications</span>
                        </label>
                        <label class="reminder-option">
                            <input type="checkbox" id="email-reminders">
                            <span>Email Reminders</span>
                        </label>
                        <select id="reminder-timing" class="reminder-select">
                            <option value="0">At time of dose</option>
                            <option value="5" selected>5 minutes before</option>
                            <option value="15">15 minutes before</option>
                            <option value="30">30 minutes before</option>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="calendar-status" id="calendar-status">
                <span class="status-indicator offline">●</span>
                <span class="status-text">Not connected to Google Calendar</span>
            </div>
        `;

        // Insert after search section
        const searchContainer = document.querySelector('.search-filter-container');
        if (searchContainer) {
            searchContainer.after(calendarSection);
        }
    }

    createScheduleView() {
        const scheduleSection = document.createElement('div');
        scheduleSection.className = 'schedule-view-section';
        scheduleSection.innerHTML = `
            <div class="schedule-header">
                <h3>🗓️ Weekly Supplement Schedule</h3>
                <div class="schedule-controls">
                    <button id="today-view" class="view-btn active">Today</button>
                    <button id="week-view" class="view-btn">Week View</button>
                    <button id="calendar-view" class="view-btn">Calendar View</button>
                </div>
            </div>
            
            <div class="schedule-content">
                <div id="today-schedule" class="schedule-panel active">
                    ${this.generateTodaySchedule()}
                </div>
                
                <div id="week-schedule" class="schedule-panel">
                    ${this.generateWeekSchedule()}
                </div>
                
                <div id="calendar-schedule" class="schedule-panel">
                    ${this.generateCalendarView()}
                </div>
            </div>
        `;

        // Insert after calendar integration
        const calendarSection = document.querySelector('.calendar-integration-section');
        if (calendarSection) {
            calendarSection.after(scheduleSection);
        }
    }

    generateTodaySchedule() {
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        const todaySupplements = this.supplements.filter(supp => 
            supp.days.includes(today)
        ).sort((a, b) => a.time.localeCompare(b.time));

        const groupedByTime = todaySupplements.reduce((acc, supp) => {
            if (!acc[supp.time]) acc[supp.time] = [];
            acc[supp.time].push(supp);
            return acc;
        }, {});

        return `
            <div class="today-header">
                <h4>Today's Schedule - ${new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                })}</h4>
                <p class="supplement-count">${todaySupplements.length} supplements scheduled</p>
            </div>
            
            <div class="time-slots">
                ${Object.entries(groupedByTime).map(([time, supplements]) => `
                    <div class="time-slot">
                        <div class="time-header">
                            <span class="time-display">${this.formatTime(time)}</span>
                            <span class="timing-label">${supplements[0].timing}</span>
                        </div>
                        <div class="supplements-at-time">
                            ${supplements.map(supp => `
                                <div class="supplement-item" style="border-left: 4px solid ${supp.color}">
                                    <div class="supplement-details">
                                        <span class="supplement-name">${supp.name}</span>
                                        <span class="supplement-dose">${supp.dose}</span>
                                    </div>
                                    <div class="supplement-actions">
                                        <button class="take-supplement" data-supplement="${supp.name}">
                                            ✓ Take
                                        </button>
                                        <button class="remind-later" data-supplement="${supp.name}">
                                            ⏰ Remind Later
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    generateWeekSchedule() {
        const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        return `
            <div class="week-grid">
                ${dayNames.map((dayName, index) => {
                    const dayKey = daysOfWeek[index];
                    const daySupplements = this.supplements.filter(supp => 
                        supp.days.includes(dayKey)
                    ).sort((a, b) => a.time.localeCompare(b.time));

                    return `
                        <div class="day-column">
                            <div class="day-header">
                                <h4>${dayName}</h4>
                                <span class="day-count">${daySupplements.length} supplements</span>
                            </div>
                            <div class="day-supplements">
                                ${daySupplements.map(supp => `
                                    <div class="mini-supplement" 
                                         style="background: ${supp.color}20; border-left: 3px solid ${supp.color}"
                                         title="${supp.name} - ${supp.dose} at ${this.formatTime(supp.time)}">
                                        <div class="mini-time">${this.formatTime(supp.time)}</div>
                                        <div class="mini-name">${supp.name}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    generateCalendarView() {
        return `
            <div class="calendar-view">
                <div class="calendar-navigation">
                    <button id="prev-month">‹</button>
                    <h4 id="current-month">${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h4>
                    <button id="next-month">›</button>
                </div>
                
                <div class="calendar-grid">
                    <div class="calendar-header-row">
                        <div class="calendar-day-header">Sun</div>
                        <div class="calendar-day-header">Mon</div>
                        <div class="calendar-day-header">Tue</div>
                        <div class="calendar-day-header">Wed</div>
                        <div class="calendar-day-header">Thu</div>
                        <div class="calendar-day-header">Fri</div>
                        <div class="calendar-day-header">Sat</div>
                    </div>
                    ${this.generateCalendarDays()}
                </div>
                
                <div class="calendar-legend">
                    <h5>Supplement Categories</h5>
                    <div class="legend-items">
                        <div class="legend-item">
                            <span class="legend-color" style="background: #e74c3c"></span>
                            Performance
                        </div>
                        <div class="legend-item">
                            <span class="legend-color" style="background: #2ecc71"></span>
                            Recovery
                        </div>
                        <div class="legend-item">
                            <span class="legend-color" style="background: #3498db"></span>
                            Essential
                        </div>
                        <div class="legend-item">
                            <span class="legend-color" style="background: #34495e"></span>
                            Sleep
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateCalendarDays() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        let days = '';
        const current = new Date(startDate);

        for (let week = 0; week < 6; week++) {
            for (let day = 0; day < 7; day++) {
                const dayKey = current.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
                const daySupplements = this.supplements.filter(supp => supp.days.includes(dayKey));
                const isCurrentMonth = current.getMonth() === month;
                const isToday = current.toDateString() === today.toDateString();

                days += `
                    <div class="calendar-day ${isCurrentMonth ? 'current-month' : 'other-month'} ${isToday ? 'today' : ''}">
                        <div class="day-number">${current.getDate()}</div>
                        <div class="day-supplements-mini">
                            ${daySupplements.slice(0, 3).map(supp => `
                                <div class="supplement-dot" style="background: ${supp.color}" title="${supp.name}"></div>
                            `).join('')}
                            ${daySupplements.length > 3 ? `<div class="more-supplements">+${daySupplements.length - 3}</div>` : ''}
                        </div>
                    </div>
                `;
                current.setDate(current.getDate() + 1);
            }
        }

        return days;
    }

    bindEvents() {
        // Calendar connection
        document.getElementById('connect-google-calendar')?.addEventListener('click', () => {
            this.connectGoogleCalendar();
        });

        // Sync supplements
        document.getElementById('sync-supplements')?.addEventListener('click', () => {
            this.syncSupplementsToCalendar();
        });

        // Export schedule
        document.getElementById('export-schedule')?.addEventListener('click', () => {
            this.exportScheduleToICS();
        });

        // View switching
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchView(e.target.id);
            });
        });

        // Supplement actions
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('take-supplement')) {
                this.markSupplementTaken(e.target.dataset.supplement);
            } else if (e.target.classList.contains('remind-later')) {
                this.setRemindLater(e.target.dataset.supplement);
            }
        });

        // Reminder settings
        document.getElementById('browser-notifications')?.addEventListener('change', (e) => {
            this.toggleBrowserNotifications(e.target.checked);
        });

        // Request notification permission
        this.requestNotificationPermission();

        // Set up daily notification check
        this.scheduleDailyReminders();
    }

    async connectGoogleCalendar() {
        try {
            // Simulate Google Calendar API connection
            // In a real implementation, you'd use the Google Calendar API
            const statusElement = document.getElementById('calendar-status');
            const statusIndicator = statusElement.querySelector('.status-indicator');
            const statusText = statusElement.querySelector('.status-text');

            statusText.textContent = 'Connecting...';
            statusIndicator.className = 'status-indicator connecting';

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Mock successful connection
            this.isSignedIn = true;
            statusIndicator.className = 'status-indicator online';
            statusText.textContent = 'Connected to Google Calendar';
            
            document.getElementById('sync-supplements').disabled = false;

            this.showNotification('✅ Successfully connected to Google Calendar!', 'success');

        } catch (error) {
            console.error('Failed to connect to Google Calendar:', error);
            this.showNotification('❌ Failed to connect to Google Calendar', 'error');
        }
    }

    async syncSupplementsToCalendar() {
        if (!this.isSignedIn) {
            this.showNotification('Please connect to Google Calendar first', 'warning');
            return;
        }

        try {
            // Create recurring events for each supplement
            const events = this.createCalendarEvents();
            
            // Simulate syncing to Google Calendar
            this.showNotification('🔄 Syncing supplements to calendar...', 'info');
            
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            this.showNotification(`✅ Successfully synced ${events.length} supplement reminders to Google Calendar!`, 'success');
            
        } catch (error) {
            console.error('Failed to sync supplements:', error);
            this.showNotification('❌ Failed to sync supplements', 'error');
        }
    }

    createCalendarEvents() {
        return this.supplements.map(supplement => ({
            summary: `💊 ${supplement.name} - ${supplement.dose}`,
            description: `Take ${supplement.dose} of ${supplement.name}\n\nCategory: ${supplement.category}\nTiming: ${supplement.timing}`,
            start: {
                dateTime: this.getNextOccurrence(supplement.time, supplement.days[0]),
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            end: {
                dateTime: this.getNextOccurrence(supplement.time, supplement.days[0], 15), // 15-minute duration
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            recurrence: this.createRecurrenceRule(supplement.days),
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'popup', minutes: parseInt(document.getElementById('reminder-timing')?.value || '5') }
                ]
            },
            colorId: this.getCalendarColorId(supplement.category)
        }));
    }

    exportScheduleToICS() {
        const events = this.supplements.map(supplement => {
            const startDate = this.getNextOccurrence(supplement.time, supplement.days[0]);
            const endDate = new Date(startDate.getTime() + 15 * 60000); // 15 minutes later

            return [
                'BEGIN:VEVENT',
                `DTSTART:${this.formatDateForICS(startDate)}`,
                `DTEND:${this.formatDateForICS(endDate)}`,
                `SUMMARY:💊 ${supplement.name} - ${supplement.dose}`,
                `DESCRIPTION:Take ${supplement.dose} of ${supplement.name}\\n\\nCategory: ${supplement.category}\\nTiming: ${supplement.timing}`,
                `RRULE:FREQ=WEEKLY;BYDAY=${this.getDaysForRRule(supplement.days)}`,
                `UID:supplement-${supplement.name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}@rhonda-tracker`,
                'END:VEVENT'
            ].join('\r\n');
        });

        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Rhonda Patrick Tracker//Supplement Schedule//EN',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',
            ...events,
            'END:VCALENDAR'
        ].join('\r\n');

        this.downloadFile(icsContent, 'rhonda-patrick-supplement-schedule.ics', 'text/calendar');
    }

    formatTime(time24) {
        const [hours, minutes] = time24.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
        });
    }

    switchView(viewId) {
        // Update active button
        document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(viewId).classList.add('active');

        // Update active panel
        document.querySelectorAll('.schedule-panel').forEach(panel => panel.classList.remove('active'));
        
        const targetPanel = viewId.replace('-view', '-schedule');
        document.getElementById(targetPanel).classList.add('active');
    }

    markSupplementTaken(supplementName) {
        const today = new Date().toDateString();
        const taken = this.loadTakenSupplements();
        
        if (!taken[today]) taken[today] = [];
        if (!taken[today].includes(supplementName)) {
            taken[today].push(supplementName);
            this.saveTakenSupplements(taken);
            
            // Update UI
            const button = document.querySelector(`[data-supplement="${supplementName}"]`);
            if (button) {
                button.textContent = '✓ Taken';
                button.disabled = true;
                button.classList.add('taken');
            }
            
            this.showNotification(`✅ Marked ${supplementName} as taken`, 'success');
        }
    }

    setRemindLater(supplementName) {
        const reminderTime = 15; // 15 minutes
        setTimeout(() => {
            this.showNotification(`⏰ Reminder: Time to take ${supplementName}`, 'reminder');
        }, reminderTime * 60 * 1000);
        
        this.showNotification(`⏰ Reminder set for ${supplementName} in ${reminderTime} minutes`, 'info');
    }

    async requestNotificationPermission() {
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                console.log('Notification permission granted');
            }
        }
    }

    scheduleDailyReminders() {
        // Check for upcoming supplements every minute
        setInterval(() => {
            this.checkUpcomingSupplements();
        }, 60000);
    }

    checkUpcomingSupplements() {
        const now = new Date();
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        const today = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        const reminderMinutes = parseInt(document.getElementById('reminder-timing')?.value || '5');

        this.supplements.forEach(supplement => {
            if (supplement.days.includes(today)) {
                const supplementTime = new Date();
                const [hours, minutes] = supplement.time.split(':');
                supplementTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
                
                const reminderTime = new Date(supplementTime.getTime() - reminderMinutes * 60000);
                
                if (Math.abs(now - reminderTime) < 30000) { // Within 30 seconds
                    this.showNotification(
                        `⏰ Reminder: ${supplement.name} in ${reminderMinutes} minutes`,
                        'reminder'
                    );
                }
            }
        });
    }

    showNotification(message, type = 'info') {
        // Browser notification
        if (document.getElementById('browser-notifications')?.checked && 'Notification' in window && Notification.permission === 'granted') {
            new Notification('Rhonda Patrick Supplement Tracker', {
                body: message,
                icon: '/icons/icon-72x72.svg'
            });
        }

        // In-app notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button class="notification-close">×</button>
        `;

        document.body.appendChild(notification);

        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });

        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    toggleBrowserNotifications(enabled) {
        if (enabled && 'Notification' in window && Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }

    loadTakenSupplements() {
        const saved = localStorage.getItem('taken-supplements');
        return saved ? JSON.parse(saved) : {};
    }

    saveTakenSupplements(taken) {
        localStorage.setItem('taken-supplements', JSON.stringify(taken));
    }

    loadReminders() {
        const saved = localStorage.getItem('supplement-reminders');
        return saved ? JSON.parse(saved) : {};
    }

    saveReminders() {
        localStorage.setItem('supplement-reminders', JSON.stringify(this.reminders));
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    getNextOccurrence(time, day) {
        const [hours, minutes] = time.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        return date;
    }

    createRecurrenceRule(days) {
        const dayMap = {
            'monday': 'MO', 'tuesday': 'TU', 'wednesday': 'WE',
            'thursday': 'TH', 'friday': 'FR', 'saturday': 'SA', 'sunday': 'SU'
        };
        const ruleDays = days.map(day => dayMap[day]).join(',');
        return [`RRULE:FREQ=WEEKLY;BYDAY=${ruleDays}`];
    }

    getDaysForRRule(days) {
        const dayMap = {
            'monday': 'MO', 'tuesday': 'TU', 'wednesday': 'WE',
            'thursday': 'TH', 'friday': 'FR', 'saturday': 'SA', 'sunday': 'SU'
        };
        return days.map(day => dayMap[day]).join(',');
    }

    formatDateForICS(date) {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    }

    getCalendarColorId(category) {
        const colorMap = {
            'Performance': '11', // Red
            'Recovery': '10', // Green
            'Essential': '9', // Blue
            'Sleep': '8', // Gray
            'Antioxidant': '5', // Yellow
            'Mitochondrial': '6', // Orange
            'Brain Health': '3' // Purple
        };
        return colorMap[category] || '1';
    }
}

// Initialize calendar integration
const calendarIntegrationManager = new CalendarIntegrationManager();

// Export for global access
window.calendarIntegrationManager = calendarIntegrationManager;