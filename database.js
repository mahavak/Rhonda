// Simple database layer for Rhonda Patrick website
// Uses localStorage for client-side persistence and JSON structure

class RhondaDB {
    constructor() {
        this.dbName = 'rhondaPatrickDB';
        this.version = '1.0';
        this.initializeDB();
    }

    initializeDB() {
        if (!localStorage.getItem(this.dbName)) {
            const initialData = {
                version: this.version,
                supplements: this.getSupplementsData(),
                saunaProtocol: this.getSaunaData(),
                userNotes: [],
                userProgress: {
                    supplementsTracked: [],
                    saunaSession: []
                },
                researchUpdates: [],
                lastUpdated: new Date().toISOString()
            };
            localStorage.setItem(this.dbName, JSON.stringify(initialData));
        }
    }

    // Get all data
    getData() {
        return JSON.parse(localStorage.getItem(this.dbName));
    }

    // Save data
    saveData(data) {
        data.lastUpdated = new Date().toISOString();
        localStorage.setItem(this.dbName, JSON.stringify(data));
    }

    // Supplement data structure
    getSupplementsData() {
        return {
            morning: [
                {
                    id: 'creatine',
                    name: 'Creatine',
                    brand: 'Thorne',
                    dosage: '5-20g variable',
                    timing: 'morning',
                    notes: 'Variable based on activity: 5g run days, 10g normal, 20g travel/sleep deprived',
                    benefits: ['Cognitive function', 'Physical performance', 'Brain energy'],
                    certifications: ['NSF Certified'],
                    cost_per_month: 25,
                    research_rating: 5,
                    last_updated: '2024-06-26'
                },
                {
                    id: 'glutamine',
                    name: 'Glutamine',
                    brand: 'Thorne',
                    dosage: '5g',
                    timing: 'morning',
                    notes: 'Taken with creatine',
                    benefits: ['Gut health', 'Recovery', 'Immune support'],
                    certifications: ['NSF Certified'],
                    cost_per_month: 20,
                    research_rating: 4,
                    last_updated: '2024-06-26'
                },
                {
                    id: 'beetroot',
                    name: 'Beetroot Extract',
                    brand: 'Now Foods',
                    dosage: '1 tablespoon',
                    timing: 'morning (performance days)',
                    notes: 'Only on endurance days or podcast/Q&A days',
                    benefits: ['Nitric oxide boost', 'Performance', 'Blood flow'],
                    certifications: ['NSF Certified'],
                    cost_per_month: 15,
                    research_rating: 4,
                    last_updated: '2024-06-26'
                }
            ],
            breakfast: [
                {
                    id: 'fish_oil_am',
                    name: 'Fish Oil',
                    brand: 'Generic',
                    dosage: '~1g',
                    timing: 'breakfast',
                    notes: 'Part of 2g total daily (reduced from 4g because omega-3 index was 16%)',
                    benefits: ['Heart health', 'Brain function', 'Anti-inflammatory'],
                    cost_per_month: 30,
                    research_rating: 5,
                    last_updated: '2024-06-26'
                },
                {
                    id: 'alpha_lipoic_acid',
                    name: 'Alpha Lipoic Acid',
                    brand: 'Generic',
                    dosage: 'Standard dose',
                    timing: 'breakfast',
                    notes: 'Antioxidant support',
                    benefits: ['Antioxidant', 'Blood sugar support'],
                    cost_per_month: 18,
                    research_rating: 4,
                    last_updated: '2024-06-26'
                },
                {
                    id: 'sulforaphane',
                    name: 'Sulforaphane',
                    brand: 'Avmacol',
                    dosage: 'Per package',
                    timing: 'breakfast',
                    notes: 'Powerful antioxidant from broccoli',
                    benefits: ['Detoxification', 'Cancer prevention', 'Nrf2 activation'],
                    cost_per_month: 45,
                    research_rating: 5,
                    last_updated: '2024-06-26'
                }
            ],
            afternoon: [
                {
                    id: 'multivitamin',
                    name: 'Multivitamin O.N.E.',
                    brand: 'Pure Encapsulations',
                    dosage: '1 capsule',
                    timing: 'afternoon',
                    notes: 'Contains 2,000 IU Vitamin D',
                    benefits: ['Complete micronutrient coverage'],
                    cost_per_month: 28,
                    research_rating: 4,
                    last_updated: '2024-06-26'
                },
                {
                    id: 'pqq',
                    name: 'PQQ',
                    brand: 'Life Extension',
                    dosage: '20mg',
                    timing: 'afternoon',
                    notes: 'Mitochondrial biogenesis',
                    benefits: ['Mitochondrial health', 'Cognitive function'],
                    cost_per_month: 35,
                    research_rating: 4,
                    last_updated: '2024-06-26'
                },
                {
                    id: 'cocoavia',
                    name: 'CocoaVia',
                    brand: 'CocoaVia',
                    dosage: 'Per package',
                    timing: 'afternoon',
                    notes: 'Cocoa flavanols for brain health',
                    benefits: ['Brain health', 'Heart health', 'Blood flow'],
                    cost_per_month: 40,
                    research_rating: 4,
                    last_updated: '2024-06-26'
                }
            ],
            evening: [
                {
                    id: 'vitamin_d',
                    name: 'Vitamin D3',
                    brand: 'Generic',
                    dosage: '2,000 IU',
                    timing: 'evening',
                    notes: '+ 2,000 IU from multivitamin = 4,000 IU total daily',
                    benefits: ['Immune health', 'Bone health', 'Hormone regulation'],
                    cost_per_month: 12,
                    research_rating: 5,
                    last_updated: '2024-06-26'
                },
                {
                    id: 'magnesium',
                    name: 'Magnesium Glycinate',
                    brand: 'Pure Encapsulations',
                    dosage: '~125mg',
                    timing: 'evening',
                    notes: 'Sleep quality and muscle relaxation',
                    benefits: ['Sleep quality', 'Muscle relaxation', 'Stress reduction'],
                    cost_per_month: 22,
                    research_rating: 5,
                    last_updated: '2024-06-26'
                },
                {
                    id: 'melatonin',
                    name: 'Melatonin',
                    brand: 'Generic',
                    dosage: '3mg',
                    timing: 'evening',
                    notes: 'Higher dose for night terrors + antioxidant benefits',
                    benefits: ['Sleep regulation', 'Antioxidant', 'Neuroprotection'],
                    cost_per_month: 8,
                    research_rating: 5,
                    last_updated: '2024-06-26'
                },
                {
                    id: 'ubiquinol',
                    name: 'Ubiquinol (CoQ10)',
                    brand: 'Pure Encapsulations Vesisorb',
                    dosage: 'Standard dose',
                    timing: 'evening',
                    notes: 'Vesisorb for dramatically increased bioavailability',
                    benefits: ['Mitochondrial energy', 'Heart health', 'Antioxidant'],
                    cost_per_month: 55,
                    research_rating: 4,
                    last_updated: '2024-06-26'
                },
                {
                    id: 'myoinositol',
                    name: 'Myoinositol',
                    brand: 'Pure Encapsulations',
                    dosage: '1 scoop',
                    timing: 'evening',
                    notes: 'Sleep and metabolic support',
                    benefits: ['Sleep support', 'Metabolic health', 'Mood regulation'],
                    cost_per_month: 32,
                    research_rating: 4,
                    last_updated: '2024-06-26'
                }
            ]
        };
    }

    // Sauna protocol data
    getSaunaData() {
        return {
            research_protocol: {
                temperature: {
                    fahrenheit: 174,
                    celsius: 79,
                    humidity: '10-20%',
                    type: 'Traditional sauna'
                },
                duration: {
                    optimal: 20,
                    minimum: 11,
                    benefit_difference: 'Duration matters: 20+ min = 50% mortality reduction vs 8% for 11 min'
                },
                frequency: {
                    optimal: '4-7x per week',
                    benefits: '4-7x = 63% less cardiac death vs 22% for 2-3x/week'
                },
                heat_shock_proteins: {
                    activation_temp: 163,
                    duration: 30,
                    increase: '50% over baseline',
                    duration_active: '48+ hours'
                }
            },
            personal_protocol: {
                temperature: 186,
                duration: '20-30 minutes',
                frequency: '4+ times per week',
                combination: 'Often with Peloton bike first',
                hydration: ['Green juice', 'Electrolyte supplements', 'LMNT', 'Keto Start']
            },
            benefits: {
                cardiovascular: [
                    '40% lower all-cause mortality',
                    '63% less sudden cardiac death',
                    '~40% reduced stroke risk',
                    '46% lower hypertension'
                ],
                brain: [
                    '60-66% less dementia/Alzheimer\'s',
                    'Heat shock proteins prevent brain plaques',
                    'Increased BDNF',
                    '6 weeks antidepressant effect from single session'
                ],
                performance: [
                    'Improves endurance',
                    '40% less muscle atrophy when injured',
                    'Better heat adaptation',
                    'Enhanced heart rate variability'
                ],
                cellular: [
                    'Activates autophagy',
                    'Anti-inflammatory (increases IL-10)',
                    '122x more cadmium excretion',
                    'Detoxifies aluminum and heavy metals'
                ]
            },
            alternatives: {
                hot_bath: {
                    temperature: 104,
                    duration: '20+ minutes',
                    position: 'Shoulders submerged',
                    benefits: 'Similar to sauna for cardiovascular and brain health'
                }
            },
            safety: {
                contraindications: [
                    'Never use alcohol before/during',
                    'Recent heart attack',
                    'Unstable angina',
                    'Pregnant women (entire pregnancy)',
                    'Children under 8-9 years'
                ],
                precautions: [
                    'Start at 140°F and build tolerance',
                    'Use timer',
                    'Stay hydrated with electrolytes',
                    'Wait 2-5 min before cold exposure'
                ]
            }
        };
    }

    // User tracking methods
    addUserNote(note) {
        const data = this.getData();
        const newNote = {
            id: Date.now().toString(),
            content: note,
            timestamp: new Date().toISOString(),
            type: 'user_note'
        };
        data.userNotes.push(newNote);
        this.saveData(data);
        return newNote;
    }

    trackSupplement(supplementId, taken = true, notes = '') {
        const data = this.getData();
        const tracking = {
            supplementId,
            taken,
            date: new Date().toISOString().split('T')[0],
            timestamp: new Date().toISOString(),
            notes
        };
        data.userProgress.supplementsTracked.push(tracking);
        this.saveData(data);
        return tracking;
    }

    trackSaunaSession(duration, temperature, notes = '') {
        const data = this.getData();
        const session = {
            id: Date.now().toString(),
            duration,
            temperature,
            date: new Date().toISOString().split('T')[0],
            timestamp: new Date().toISOString(),
            notes
        };
        data.userProgress.saunaSession.push(session);
        this.saveData(data);
        return session;
    }

    // Search functionality
    searchSupplements(query) {
        const data = this.getData();
        const allSupplements = [
            ...data.supplements.morning,
            ...data.supplements.breakfast,
            ...data.supplements.afternoon,
            ...data.supplements.evening
        ];
        
        return allSupplements.filter(supplement => 
            supplement.name.toLowerCase().includes(query.toLowerCase()) ||
            supplement.benefits.some(benefit => benefit.toLowerCase().includes(query.toLowerCase())) ||
            supplement.notes.toLowerCase().includes(query.toLowerCase())
        );
    }

    // Analytics
    getSupplementCosts() {
        const data = this.getData();
        const allSupplements = [
            ...data.supplements.morning,
            ...data.supplements.breakfast,
            ...data.supplements.afternoon,
            ...data.supplements.evening
        ];
        
        const totalCost = allSupplements.reduce((sum, supp) => sum + (supp.cost_per_month || 0), 0);
        return {
            total_monthly: totalCost,
            average_per_supplement: totalCost / allSupplements.length,
            supplements_with_cost: allSupplements.filter(s => s.cost_per_month),
            breakdown_by_timing: {
                morning: data.supplements.morning.reduce((sum, s) => sum + (s.cost_per_month || 0), 0),
                breakfast: data.supplements.breakfast.reduce((sum, s) => sum + (s.cost_per_month || 0), 0),
                afternoon: data.supplements.afternoon.reduce((sum, s) => sum + (s.cost_per_month || 0), 0),
                evening: data.supplements.evening.reduce((sum, s) => sum + (s.cost_per_month || 0), 0)
            }
        };
    }

    getUserStats() {
        const data = this.getData();
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
        
        const recentSupplements = data.userProgress.supplementsTracked.filter(
            track => new Date(track.timestamp) > thirtyDaysAgo
        );
        
        const recentSaunaSession = data.userProgress.saunaSession.filter(
            session => new Date(session.timestamp) > thirtyDaysAgo
        );
        
        return {
            supplements_tracked_30_days: recentSupplements.length,
            sauna_sessions_30_days: recentSaunaSession.length,
            average_sauna_duration: recentSaunaSession.length > 0 ? 
                recentSaunaSession.reduce((sum, s) => sum + s.duration, 0) / recentSaunaSession.length : 0,
            most_tracked_supplement: this.getMostTrackedSupplement(recentSupplements),
            consistency_score: this.calculateConsistencyScore(recentSupplements, recentSaunaSession)
        };
    }

    getMostTrackedSupplement(supplements) {
        const counts = {};
        supplements.forEach(s => {
            counts[s.supplementId] = (counts[s.supplementId] || 0) + 1;
        });
        
        const max = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b, '');
        return max || null;
    }

    calculateConsistencyScore(supplements, saunaSessions) {
        const days = 30;
        const targetSupplements = 10; // Target supplements per day
        const targetSauna = 4; // Target sauna sessions per week
        
        const suppScore = Math.min(100, (supplements.length / (days * targetSupplements)) * 100);
        const saunaScore = Math.min(100, (saunaSessions.length / (4 * 4)) * 100); // 4 weeks * 4 sessions
        
        return Math.round((suppScore + saunaScore) / 2);
    }

    // Export data
    exportData() {
        return JSON.stringify(this.getData(), null, 2);
    }

    // Import data
    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            this.saveData(data);
            return true;
        } catch (error) {
            console.error('Failed to import data:', error);
            return false;
        }
    }

    // Reset database
    reset() {
        localStorage.removeItem(this.dbName);
        this.initializeDB();
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RhondaDB;
} else {
    window.RhondaDB = RhondaDB;
}