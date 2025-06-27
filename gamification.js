// Gamification System
// Achievement badges, streaks, progress levels, and wellness challenges

class GamificationManager {
    constructor() {
        this.userStats = this.loadUserStats();
        this.achievements = this.initializeAchievements();
        this.challenges = this.initializeChallenges();
        this.streaks = this.loadStreaks();
        this.level = this.calculateLevel();
        this.points = this.userStats.totalPoints || 0;
        this.initializeGamification();
    }

    initializeGamification() {
        document.addEventListener('DOMContentLoaded', () => {
            this.createGamificationPanel();
            this.createProgressDashboard();
            this.createAchievementBadges();
            this.createChallengesSection();
            this.bindEvents();
            this.checkDailyProgress();
            this.updateProgressVisual();
        });
    }

    loadUserStats() {
        const saved = localStorage.getItem('user-wellness-stats');
        return saved ? JSON.parse(saved) : {
            totalPoints: 0,
            supplementsTaken: 0,
            streakDays: 0,
            longestStreak: 0,
            saunaSessionsCompleted: 0,
            challengesCompleted: 0,
            perfectDays: 0,
            joinDate: new Date().toISOString(),
            lastActivity: new Date().toISOString(),
            achievements: [],
            dailyGoals: {
                supplements: 8, // Taking 8+ supplements per day
                consistency: 5, // 5 days in a row
                engagement: 3   // 3 app interactions per day
            }
        };
    }

    initializeAchievements() {
        return [
            // Beginner Achievements
            {
                id: 'first_supplement',
                name: 'First Step',
                description: 'Take your first supplement',
                icon: '🎯',
                category: 'Getting Started',
                points: 10,
                requirement: { type: 'supplements_taken', value: 1 },
                rarity: 'common'
            },
            {
                id: 'first_week',
                name: 'Week Warrior',
                description: 'Complete your first week of tracking',
                icon: '📅',
                category: 'Consistency',
                points: 50,
                requirement: { type: 'days_tracked', value: 7 },
                rarity: 'common'
            },
            {
                id: 'supplement_explorer',
                name: 'Supplement Explorer',
                description: 'Try all categories of supplements',
                icon: '🧪',
                category: 'Discovery',
                points: 75,
                requirement: { type: 'categories_tried', value: 7 },
                rarity: 'uncommon'
            },

            // Consistency Achievements
            {
                id: 'streak_starter',
                name: 'Streak Starter',
                description: 'Maintain a 7-day supplement streak',
                icon: '🔥',
                category: 'Consistency',
                points: 100,
                requirement: { type: 'streak_days', value: 7 },
                rarity: 'uncommon'
            },
            {
                id: 'committed_crusader',
                name: 'Committed Crusader',
                description: 'Maintain a 30-day supplement streak',
                icon: '⚡',
                category: 'Consistency',
                points: 300,
                requirement: { type: 'streak_days', value: 30 },
                rarity: 'rare'
            },
            {
                id: 'unstoppable_force',
                name: 'Unstoppable Force',
                description: 'Maintain a 100-day supplement streak',
                icon: '💎',
                category: 'Consistency',
                points: 1000,
                requirement: { type: 'streak_days', value: 100 },
                rarity: 'legendary'
            },

            // Supplement Mastery
            {
                id: 'supplement_scholar',
                name: 'Supplement Scholar',
                description: 'Take 100 supplements total',
                icon: '📚',
                category: 'Mastery',
                points: 200,
                requirement: { type: 'supplements_taken', value: 100 },
                rarity: 'uncommon'
            },
            {
                id: 'wellness_guru',
                name: 'Wellness Guru',
                description: 'Take 500 supplements total',
                icon: '🧙‍♂️',
                category: 'Mastery',
                points: 500,
                requirement: { type: 'supplements_taken', value: 500 },
                rarity: 'rare'
            },
            {
                id: 'supplement_master',
                name: 'Supplement Master',
                description: 'Take 1000 supplements total',
                icon: '👑',
                category: 'Mastery',
                points: 1000,
                requirement: { type: 'supplements_taken', value: 1000 },
                rarity: 'legendary'
            },

            // Perfect Days
            {
                id: 'perfect_day',
                name: 'Perfect Day',
                description: 'Complete all scheduled supplements in one day',
                icon: '⭐',
                category: 'Excellence',
                points: 75,
                requirement: { type: 'perfect_days', value: 1 },
                rarity: 'uncommon'
            },
            {
                id: 'perfect_week',
                name: 'Perfect Week',
                description: 'Achieve 7 perfect days in a row',
                icon: '🌟',
                category: 'Excellence',
                points: 400,
                requirement: { type: 'perfect_streak', value: 7 },
                rarity: 'rare'
            },

            // Sauna Protocol
            {
                id: 'heat_seeker',
                name: 'Heat Seeker',
                description: 'Complete your first sauna session',
                icon: '🔥',
                category: 'Sauna',
                points: 50,
                requirement: { type: 'sauna_sessions', value: 1 },
                rarity: 'common'
            },
            {
                id: 'sauna_warrior',
                name: 'Sauna Warrior',
                description: 'Complete 50 sauna sessions',
                icon: '♨️',
                category: 'Sauna',
                points: 300,
                requirement: { type: 'sauna_sessions', value: 50 },
                rarity: 'rare'
            },

            // Special Achievements
            {
                id: 'early_bird',
                name: 'Early Bird',
                description: 'Take morning supplements before 8 AM for 7 days',
                icon: '🌅',
                category: 'Timing',
                points: 150,
                requirement: { type: 'early_morning_streak', value: 7 },
                rarity: 'uncommon'
            },
            {
                id: 'night_owl',
                name: 'Night Owl',
                description: 'Take evening supplements consistently for 14 days',
                icon: '🦉',
                category: 'Timing',
                points: 200,
                requirement: { type: 'evening_consistency', value: 14 },
                rarity: 'uncommon'
            },
            {
                id: 'data_enthusiast',
                name: 'Data Enthusiast',
                description: 'Export your schedule and print guides',
                icon: '📊',
                category: 'Analytics',
                points: 100,
                requirement: { type: 'exports_completed', value: 3 },
                rarity: 'uncommon'
            },
            {
                id: 'social_sharer',
                name: 'Social Sharer',
                description: 'Share your progress or achievements',
                icon: '📱',
                category: 'Social',
                points: 75,
                requirement: { type: 'shares_completed', value: 1 },
                rarity: 'common'
            }
        ];
    }

    initializeChallenges() {
        return [
            {
                id: 'weekly_consistency',
                name: 'Weekly Consistency Challenge',
                description: 'Take supplements every day this week',
                icon: '📅',
                duration: 7, // days
                points: 200,
                type: 'streak',
                target: 7,
                progress: 0,
                active: true,
                startDate: new Date().toISOString()
            },
            {
                id: 'perfect_timing',
                name: 'Perfect Timing Challenge',
                description: 'Take supplements within 30 minutes of scheduled time for 5 days',
                icon: '⏰',
                duration: 5,
                points: 150,
                type: 'timing_accuracy',
                target: 5,
                progress: 0,
                active: false,
                requirements: 'Take supplements within ±30 minutes of scheduled time'
            },
            {
                id: 'complete_routine',
                name: 'Complete Routine Challenge',
                description: 'Complete all 16 scheduled supplements in one day',
                icon: '✅',
                duration: 1,
                points: 300,
                type: 'completion',
                target: 16,
                progress: 0,
                active: false,
                requirements: 'Take all morning, breakfast, lunch, and evening supplements'
            },
            {
                id: 'sauna_dedication',
                name: 'Sauna Dedication Challenge',
                description: 'Complete 4 sauna sessions this week',
                icon: '♨️',
                duration: 7,
                points: 250,
                type: 'sauna_frequency',
                target: 4,
                progress: 0,
                active: false,
                requirements: 'Log sauna sessions in the tracker'
            },
            {
                id: 'explorer_challenge',
                name: 'Supplement Explorer Challenge',
                description: 'Try supplements from at least 5 different categories',
                icon: '🗺️',
                duration: 14,
                points: 175,
                type: 'category_exploration',
                target: 5,
                progress: 0,
                active: false,
                requirements: 'Performance, Recovery, Essential, Sleep, Antioxidant, etc.'
            }
        ];
    }

    createGamificationPanel() {
        const panel = document.createElement('div');
        panel.className = 'gamification-panel';
        panel.innerHTML = `
            <div class="gamification-header">
                <h3>🎮 Your Wellness Journey</h3>
                <div class="user-level">
                    <span class="level-badge">Level ${this.level}</span>
                    <span class="points-display">${this.points.toLocaleString()} XP</span>
                </div>
            </div>
            
            <div class="gamification-tabs">
                <button class="tab-btn active" data-tab="overview">Overview</button>
                <button class="tab-btn" data-tab="achievements">Achievements</button>
                <button class="tab-btn" data-tab="challenges">Challenges</button>
                <button class="tab-btn" data-tab="leaderboard">Stats</button>
            </div>
            
            <div class="gamification-content">
                <div id="overview-tab" class="tab-content active">
                    ${this.generateOverviewContent()}
                </div>
                
                <div id="achievements-tab" class="tab-content">
                    ${this.generateAchievementsContent()}
                </div>
                
                <div id="challenges-tab" class="tab-content">
                    ${this.generateChallengesContent()}
                </div>
                
                <div id="leaderboard-tab" class="tab-content">
                    ${this.generateStatsContent()}
                </div>
            </div>
        `;

        // Insert after schedule section
        const scheduleSection = document.querySelector('.schedule-view-section');
        if (scheduleSection) {
            scheduleSection.after(panel);
        }
    }

    generateOverviewContent() {
        const recentAchievements = this.userStats.achievements.slice(-3);
        const activeChallenge = this.challenges.find(c => c.active);
        const nextLevel = this.level + 1;
        const pointsToNext = this.getPointsToNextLevel();

        return `
            <div class="overview-grid">
                <div class="progress-card">
                    <div class="progress-header">
                        <h4>Level Progress</h4>
                        <span class="progress-percentage">${Math.round((this.points % 1000) / 10)}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(this.points % 1000) / 10}%"></div>
                    </div>
                    <p class="progress-text">${pointsToNext} XP to Level ${nextLevel}</p>
                </div>
                
                <div class="streak-card">
                    <div class="streak-icon">🔥</div>
                    <div class="streak-info">
                        <span class="streak-number">${this.streaks.current || 0}</span>
                        <span class="streak-label">Day Streak</span>
                    </div>
                </div>
                
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-number">${this.userStats.supplementsTaken || 0}</span>
                        <span class="stat-label">Supplements Taken</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${this.userStats.perfectDays || 0}</span>
                        <span class="stat-label">Perfect Days</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${this.userStats.achievements.length || 0}</span>
                        <span class="stat-label">Achievements</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">${this.userStats.challengesCompleted || 0}</span>
                        <span class="stat-label">Challenges Won</span>
                    </div>
                </div>
                
                ${activeChallenge ? `
                    <div class="active-challenge">
                        <h4>🎯 Active Challenge</h4>
                        <div class="challenge-preview">
                            <div class="challenge-icon">${activeChallenge.icon}</div>
                            <div class="challenge-details">
                                <h5>${activeChallenge.name}</h5>
                                <p>${activeChallenge.description}</p>
                                <div class="challenge-progress">
                                    <div class="progress-bar small">
                                        <div class="progress-fill" style="width: ${(activeChallenge.progress / activeChallenge.target) * 100}%"></div>
                                    </div>
                                    <span class="progress-text">${activeChallenge.progress}/${activeChallenge.target}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ` : ''}
                
                ${recentAchievements.length > 0 ? `
                    <div class="recent-achievements">
                        <h4>🏆 Recent Achievements</h4>
                        <div class="achievement-list">
                            ${recentAchievements.map(achievementId => {
                                const achievement = this.achievements.find(a => a.id === achievementId);
                                return achievement ? `
                                    <div class="mini-achievement">
                                        <span class="achievement-icon">${achievement.icon}</span>
                                        <span class="achievement-name">${achievement.name}</span>
                                        <span class="achievement-points">+${achievement.points} XP</span>
                                    </div>
                                ` : '';
                            }).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    generateAchievementsContent() {
        const categories = [...new Set(this.achievements.map(a => a.category))];
        
        return `
            <div class="achievements-section">
                <div class="achievements-header">
                    <h4>🏆 Achievement Collection</h4>
                    <div class="achievement-stats">
                        <span class="unlocked-count">${this.userStats.achievements.length}/${this.achievements.length} Unlocked</span>
                        <div class="rarity-legend">
                            <span class="rarity common">Common</span>
                            <span class="rarity uncommon">Uncommon</span>
                            <span class="rarity rare">Rare</span>
                            <span class="rarity legendary">Legendary</span>
                        </div>
                    </div>
                </div>
                
                ${categories.map(category => `
                    <div class="achievement-category">
                        <h5>${category}</h5>
                        <div class="achievements-grid">
                            ${this.achievements
                                .filter(a => a.category === category)
                                .map(achievement => {
                                    const isUnlocked = this.userStats.achievements.includes(achievement.id);
                                    const progress = this.getAchievementProgress(achievement);
                                    
                                    return `
                                        <div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'} ${achievement.rarity}">
                                            <div class="achievement-icon ${isUnlocked ? '' : 'grayscale'}">${achievement.icon}</div>
                                            <div class="achievement-info">
                                                <h6>${achievement.name}</h6>
                                                <p>${achievement.description}</p>
                                                <div class="achievement-meta">
                                                    <span class="achievement-points">${achievement.points} XP</span>
                                                    <span class="achievement-rarity ${achievement.rarity}">${achievement.rarity}</span>
                                                </div>
                                                ${!isUnlocked && progress < 100 ? `
                                                    <div class="achievement-progress">
                                                        <div class="progress-bar micro">
                                                            <div class="progress-fill" style="width: ${progress}%"></div>
                                                        </div>
                                                        <span class="progress-text">${Math.round(progress)}%</span>
                                                    </div>
                                                ` : ''}
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    generateChallengesContent() {
        return `
            <div class="challenges-section">
                <div class="challenges-header">
                    <h4>🎯 Weekly Challenges</h4>
                    <p>Complete challenges to earn bonus XP and unlock achievements</p>
                </div>
                
                <div class="challenges-grid">
                    ${this.challenges.map(challenge => `
                        <div class="challenge-card ${challenge.active ? 'active' : ''} ${challenge.progress >= challenge.target ? 'completed' : ''}">
                            <div class="challenge-header">
                                <div class="challenge-icon">${challenge.icon}</div>
                                <div class="challenge-meta">
                                    <h5>${challenge.name}</h5>
                                    <span class="challenge-points">+${challenge.points} XP</span>
                                </div>
                            </div>
                            
                            <p class="challenge-description">${challenge.description}</p>
                            
                            <div class="challenge-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${(challenge.progress / challenge.target) * 100}%"></div>
                                </div>
                                <div class="progress-details">
                                    <span class="progress-text">${challenge.progress}/${challenge.target}</span>
                                    <span class="time-remaining">${this.getTimeRemaining(challenge)} remaining</span>
                                </div>
                            </div>
                            
                            ${challenge.requirements ? `
                                <div class="challenge-requirements">
                                    <small>Requirements: ${challenge.requirements}</small>
                                </div>
                            ` : ''}
                            
                            <div class="challenge-actions">
                                ${!challenge.active && challenge.progress < challenge.target ? `
                                    <button class="start-challenge-btn" data-challenge="${challenge.id}">
                                        Start Challenge
                                    </button>
                                ` : ''}
                                ${challenge.progress >= challenge.target ? `
                                    <button class="claim-reward-btn" data-challenge="${challenge.id}">
                                        Claim Reward
                                    </button>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    generateStatsContent() {
        const memberSince = new Date(this.userStats.joinDate).toLocaleDateString();
        const daysActive = Math.floor((Date.now() - new Date(this.userStats.joinDate)) / (1000 * 60 * 60 * 24));

        return `
            <div class="stats-section">
                <div class="stats-header">
                    <h4>📊 Wellness Statistics</h4>
                    <p>Track your journey and see your progress over time</p>
                </div>
                
                <div class="stats-overview">
                    <div class="stat-card primary">
                        <div class="stat-icon">🎯</div>
                        <div class="stat-content">
                            <span class="stat-value">${this.level}</span>
                            <span class="stat-label">Current Level</span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">⭐</div>
                        <div class="stat-content">
                            <span class="stat-value">${this.points.toLocaleString()}</span>
                            <span class="stat-label">Total XP</span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">🔥</div>
                        <div class="stat-content">
                            <span class="stat-value">${this.userStats.longestStreak || 0}</span>
                            <span class="stat-label">Longest Streak</span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon">📅</div>
                        <div class="stat-content">
                            <span class="stat-value">${daysActive}</span>
                            <span class="stat-label">Days Active</span>
                        </div>
                    </div>
                </div>
                
                <div class="detailed-stats">
                    <div class="stat-category">
                        <h5>💊 Supplement Tracking</h5>
                        <div class="stat-list">
                            <div class="stat-row">
                                <span>Total Supplements Taken</span>
                                <span class="stat-number">${this.userStats.supplementsTaken || 0}</span>
                            </div>
                            <div class="stat-row">
                                <span>Perfect Days</span>
                                <span class="stat-number">${this.userStats.perfectDays || 0}</span>
                            </div>
                            <div class="stat-row">
                                <span>Current Streak</span>
                                <span class="stat-number">${this.streaks.current || 0} days</span>
                            </div>
                            <div class="stat-row">
                                <span>Consistency Rate</span>
                                <span class="stat-number">${this.calculateConsistencyRate()}%</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="stat-category">
                        <h5>🏆 Achievements & Challenges</h5>
                        <div class="stat-list">
                            <div class="stat-row">
                                <span>Achievements Unlocked</span>
                                <span class="stat-number">${this.userStats.achievements.length}/${this.achievements.length}</span>
                            </div>
                            <div class="stat-row">
                                <span>Challenges Completed</span>
                                <span class="stat-number">${this.userStats.challengesCompleted || 0}</span>
                            </div>
                            <div class="stat-row">
                                <span>Member Since</span>
                                <span class="stat-number">${memberSince}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="stat-category">
                        <h5>♨️ Sauna Protocol</h5>
                        <div class="stat-list">
                            <div class="stat-row">
                                <span>Sessions Completed</span>
                                <span class="stat-number">${this.userStats.saunaSessionsCompleted || 0}</span>
                            </div>
                            <div class="stat-row">
                                <span>Weekly Average</span>
                                <span class="stat-number">${this.calculateWeeklySaunaAverage()}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="sharing-section">
                    <h5>📱 Share Your Progress</h5>
                    <div class="share-buttons">
                        <button class="share-btn" data-type="level">Share Level Achievement</button>
                        <button class="share-btn" data-type="streak">Share Current Streak</button>
                        <button class="share-btn" data-type="stats">Share Overall Stats</button>
                    </div>
                </div>
            </div>
        `;
    }

    bindEvents() {
        // Tab switching
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-btn')) {
                this.switchTab(e.target.dataset.tab);
            }
        });

        // Challenge actions
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('start-challenge-btn')) {
                this.startChallenge(e.target.dataset.challenge);
            } else if (e.target.classList.contains('claim-reward-btn')) {
                this.claimChallengeReward(e.target.dataset.challenge);
            }
        });

        // Share buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('share-btn')) {
                this.shareProgress(e.target.dataset.type);
            }
        });

        // Listen for supplement tracking events
        document.addEventListener('supplement-taken', (e) => {
            this.handleSupplementTaken(e.detail);
        });

        // Daily check
        this.setupDailyCheck();
    }

    switchTab(tabId) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById(`${tabId}-tab`).classList.add('active');
    }

    startChallenge(challengeId) {
        const challenge = this.challenges.find(c => c.id === challengeId);
        if (challenge) {
            // Stop other active challenges
            this.challenges.forEach(c => c.active = false);
            
            // Start new challenge
            challenge.active = true;
            challenge.progress = 0;
            challenge.startDate = new Date().toISOString();
            
            this.saveChallenges();
            this.updateGamificationPanel();
            this.showNotification(`🎯 Started challenge: ${challenge.name}`, 'success');
        }
    }

    claimChallengeReward(challengeId) {
        const challenge = this.challenges.find(c => c.id === challengeId);
        if (challenge && challenge.progress >= challenge.target) {
            this.awardPoints(challenge.points);
            this.userStats.challengesCompleted++;
            challenge.active = false;
            challenge.progress = 0;
            
            this.saveUserStats();
            this.saveChallenges();
            this.updateGamificationPanel();
            this.showNotification(`🎉 Challenge completed! +${challenge.points} XP`, 'success');
            this.checkAchievements();
        }
    }

    handleSupplementTaken(supplementData) {
        this.userStats.supplementsTaken++;
        this.updateStreak();
        this.updateChallengeProgress('supplements_taken', 1);
        this.awardPoints(5); // 5 XP per supplement
        
        this.saveUserStats();
        this.checkAchievements();
        this.updateProgressVisual();
    }

    updateStreak() {
        const today = new Date().toDateString();
        const lastActivity = new Date(this.userStats.lastActivity).toDateString();
        
        if (today !== lastActivity) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastActivity === yesterday.toDateString()) {
                this.streaks.current++;
            } else {
                this.streaks.current = 1;
            }
            
            if (this.streaks.current > this.userStats.longestStreak) {
                this.userStats.longestStreak = this.streaks.current;
            }
            
            this.userStats.lastActivity = new Date().toISOString();
            this.saveStreaks();
        }
    }

    awardPoints(points) {
        this.points += points;
        this.userStats.totalPoints = this.points;
        
        const oldLevel = this.level;
        this.level = this.calculateLevel();
        
        if (this.level > oldLevel) {
            this.showLevelUpNotification(this.level);
        }
    }

    calculateLevel() {
        return Math.floor(this.points / 1000) + 1;
    }

    getPointsToNextLevel() {
        const currentLevelPoints = (this.level - 1) * 1000;
        const nextLevelPoints = this.level * 1000;
        return nextLevelPoints - this.points;
    }

    checkAchievements() {
        this.achievements.forEach(achievement => {
            if (!this.userStats.achievements.includes(achievement.id)) {
                if (this.meetsRequirement(achievement.requirement)) {
                    this.unlockAchievement(achievement);
                }
            }
        });
    }

    meetsRequirement(requirement) {
        switch (requirement.type) {
            case 'supplements_taken':
                return this.userStats.supplementsTaken >= requirement.value;
            case 'streak_days':
                return this.streaks.current >= requirement.value;
            case 'perfect_days':
                return this.userStats.perfectDays >= requirement.value;
            case 'sauna_sessions':
                return this.userStats.saunaSessionsCompleted >= requirement.value;
            case 'days_tracked':
                const daysSinceStart = Math.floor((Date.now() - new Date(this.userStats.joinDate)) / (1000 * 60 * 60 * 24));
                return daysSinceStart >= requirement.value;
            default:
                return false;
        }
    }

    unlockAchievement(achievement) {
        this.userStats.achievements.push(achievement.id);
        this.awardPoints(achievement.points);
        this.saveUserStats();
        this.showAchievementNotification(achievement);
        this.updateGamificationPanel();
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-popup">
                <div class="achievement-header">
                    <span class="achievement-icon large">${achievement.icon}</span>
                    <h4>Achievement Unlocked!</h4>
                </div>
                <div class="achievement-details">
                    <h5>${achievement.name}</h5>
                    <p>${achievement.description}</p>
                    <span class="achievement-points">+${achievement.points} XP</span>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    }

    showLevelUpNotification(level) {
        const notification = document.createElement('div');
        notification.className = 'level-up-notification';
        notification.innerHTML = `
            <div class="level-up-popup">
                <div class="level-up-animation">✨</div>
                <h4>Level Up!</h4>
                <div class="new-level">Level ${level}</div>
                <p>Congratulations on your wellness journey!</p>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 5000);
    }

    updateGamificationPanel() {
        // Refresh the gamification panel content
        const panel = document.querySelector('.gamification-panel');
        if (panel) {
            const activeTab = document.querySelector('.tab-btn.active').dataset.tab;
            
            // Update content based on active tab
            switch (activeTab) {
                case 'overview':
                    document.getElementById('overview-tab').innerHTML = this.generateOverviewContent();
                    break;
                case 'achievements':
                    document.getElementById('achievements-tab').innerHTML = this.generateAchievementsContent();
                    break;
                case 'challenges':
                    document.getElementById('challenges-tab').innerHTML = this.generateChallengesContent();
                    break;
                case 'leaderboard':
                    document.getElementById('leaderboard-tab').innerHTML = this.generateStatsContent();
                    break;
            }

            // Update header
            const levelBadge = panel.querySelector('.level-badge');
            const pointsDisplay = panel.querySelector('.points-display');
            if (levelBadge) levelBadge.textContent = `Level ${this.level}`;
            if (pointsDisplay) pointsDisplay.textContent = `${this.points.toLocaleString()} XP`;
        }
    }

    getAchievementProgress(achievement) {
        const current = this.getCurrentValueForRequirement(achievement.requirement);
        return Math.min((current / achievement.requirement.value) * 100, 100);
    }

    getCurrentValueForRequirement(requirement) {
        switch (requirement.type) {
            case 'supplements_taken':
                return this.userStats.supplementsTaken;
            case 'streak_days':
                return this.streaks.current;
            case 'perfect_days':
                return this.userStats.perfectDays;
            case 'sauna_sessions':
                return this.userStats.saunaSessionsCompleted;
            default:
                return 0;
        }
    }

    calculateConsistencyRate() {
        const daysSinceStart = Math.floor((Date.now() - new Date(this.userStats.joinDate)) / (1000 * 60 * 60 * 24));
        if (daysSinceStart === 0) return 100;
        
        const expectedSupplements = daysSinceStart * 8; // 8 supplements per day target
        const actualSupplements = this.userStats.supplementsTaken;
        
        return Math.min(Math.round((actualSupplements / expectedSupplements) * 100), 100);
    }

    shareProgress(type) {
        let shareText = '';
        
        switch (type) {
            case 'level':
                shareText = `🎮 Just reached Level ${this.level} in my wellness journey with Dr. Rhonda Patrick's supplement routine! 💪 #WellnessGoals #SupplementTracking`;
                break;
            case 'streak':
                shareText = `🔥 ${this.streaks.current} day streak of consistent supplement tracking! Following Dr. Rhonda Patrick's evidence-based routine. #HealthyHabits #ConsistencyWins`;
                break;
            case 'stats':
                shareText = `📊 My wellness stats: Level ${this.level}, ${this.userStats.supplementsTaken} supplements taken, ${this.userStats.achievements.length} achievements unlocked! 🏆 #WellnessJourney`;
                break;
        }

        if (navigator.share) {
            navigator.share({
                title: 'My Wellness Journey Progress',
                text: shareText,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(shareText);
            this.showNotification('📋 Progress copied to clipboard!', 'success');
        }

        // Award points for sharing
        this.updateChallengeProgress('shares_completed', 1);
        this.awardPoints(10);
        this.saveUserStats();
    }

    // Storage methods
    saveUserStats() {
        localStorage.setItem('user-wellness-stats', JSON.stringify(this.userStats));
    }

    loadStreaks() {
        const saved = localStorage.getItem('wellness-streaks');
        return saved ? JSON.parse(saved) : { current: 0, longest: 0 };
    }

    saveStreaks() {
        localStorage.setItem('wellness-streaks', JSON.stringify(this.streaks));
    }

    saveChallenges() {
        localStorage.setItem('wellness-challenges', JSON.stringify(this.challenges));
    }

    showNotification(message, type = 'info') {
        // Reuse the existing notification system
        if (window.calendarIntegrationManager) {
            window.calendarIntegrationManager.showNotification(message, type);
        }
    }

    // Additional helper methods would go here...
    updateProgressVisual() {
        // Update any visual progress indicators
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            // Animate progress bar updates
            bar.style.transition = 'width 0.5s ease';
        });
    }

    setupDailyCheck() {
        // Check for new day and reset daily challenges
        setInterval(() => {
            this.checkDailyProgress();
        }, 60000); // Check every minute
    }

    checkDailyProgress() {
        const today = new Date().toDateString();
        const lastCheck = localStorage.getItem('last-daily-check');
        
        if (lastCheck !== today) {
            // New day - reset daily challenges if needed
            localStorage.setItem('last-daily-check', today);
            this.processDailyReset();
        }
    }

    processDailyReset() {
        // Reset daily progress counters
        // This would be expanded based on specific daily mechanics
    }

    updateChallengeProgress(type, amount) {
        const activeChallenge = this.challenges.find(c => c.active);
        if (activeChallenge && activeChallenge.type === type) {
            activeChallenge.progress = Math.min(activeChallenge.progress + amount, activeChallenge.target);
            this.saveChallenges();
        }
    }

    getTimeRemaining(challenge) {
        if (!challenge.active || !challenge.startDate) return 'Not started';
        
        const start = new Date(challenge.startDate);
        const end = new Date(start.getTime() + challenge.duration * 24 * 60 * 60 * 1000);
        const remaining = end - new Date();
        
        if (remaining <= 0) return 'Expired';
        
        const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
        const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        
        if (days > 0) return `${days}d ${hours}h`;
        return `${hours}h`;
    }

    calculateWeeklySaunaAverage() {
        // This would calculate based on actual sauna tracking data
        const weeksActive = Math.max(1, Math.floor((Date.now() - new Date(this.userStats.joinDate)) / (7 * 24 * 60 * 60 * 1000)));
        return Math.round((this.userStats.saunaSessionsCompleted || 0) / weeksActive * 10) / 10;
    }
}

// Initialize gamification system
const gamificationManager = new GamificationManager();

// Export for global access
window.gamificationManager = gamificationManager;

// Create custom event for supplement tracking
function trackSupplementTaken(supplementName, category) {
    const event = new CustomEvent('supplement-taken', {
        detail: { name: supplementName, category: category }
    });
    document.dispatchEvent(event);
}

// Export tracking function
window.trackSupplementTaken = trackSupplementTaken;