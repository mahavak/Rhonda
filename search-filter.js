// Advanced Search & Filtering System
// Powerful search and filter functionality for supplements

class SearchFilterManager {
    constructor() {
        this.supplements = this.extractSupplementDatabase();
        this.filteredSupplements = [...this.supplements];
        this.activeFilters = {
            search: '',
            category: 'all',
            brand: 'all',
            timing: 'all',
            benefit: 'all'
        };
        this.initializeSearchSystem();
    }

    initializeSearchSystem() {
        document.addEventListener('DOMContentLoaded', () => {
            this.createSearchInterface();
            this.bindEvents();
            this.createQuickLookup();
        });
    }

    extractSupplementDatabase() {
        return [
            // Morning supplements
            {
                name: 'Creatine',
                brand: 'Thorne',
                dose: '10g total (2×5g)',
                timing: 'Morning',
                category: 'Performance',
                benefits: ['Muscle strength', 'Cognitive enhancement', 'Energy'],
                cost: '$25-35',
                certifications: ['NSF Certified'],
                notes: 'Varies by activity: 5g (run days), 10g (training), 15-20g (travel/sleep deprived)',
                keyIngredients: ['Creatine Monohydrate'],
                searchTerms: ['creatine', 'muscle', 'strength', 'cognitive', 'thorne', 'morning']
            },
            {
                name: 'Glutamine',
                brand: 'Thorne',
                dose: '5g',
                timing: 'Morning',
                category: 'Recovery',
                benefits: ['Gut health', 'Immune support', 'Recovery'],
                cost: '$20-30',
                certifications: ['NSF Certified'],
                notes: 'Important for gut lining integrity',
                keyIngredients: ['L-Glutamine'],
                searchTerms: ['glutamine', 'gut', 'immune', 'recovery', 'thorne', 'morning']
            },
            {
                name: 'Beetroot Extract',
                brand: 'Now Foods',
                dose: '1 tbsp',
                timing: 'Morning (as needed)',
                category: 'Performance',
                benefits: ['Endurance', 'Nitric oxide', 'Blood flow'],
                cost: '$15-25',
                certifications: [],
                notes: 'Only on endurance training days',
                keyIngredients: ['Beetroot', 'Natural nitrates'],
                searchTerms: ['beetroot', 'endurance', 'nitric oxide', 'now foods', 'performance']
            },
            
            // Breakfast supplements
            {
                name: 'Fish Oil',
                brand: 'Various',
                dose: '2g total daily (split)',
                timing: 'Breakfast & Evening',
                category: 'Essential',
                benefits: ['Heart health', 'Brain function', 'Anti-inflammatory'],
                cost: '$20-40',
                certifications: ['Third-party tested'],
                notes: 'Reduced from 4g due to high omega-3 index (16%)',
                keyIngredients: ['EPA', 'DHA', 'Omega-3'],
                searchTerms: ['fish oil', 'omega 3', 'heart', 'brain', 'epa', 'dha', 'anti-inflammatory']
            },
            {
                name: 'Alpha Lipoic Acid',
                brand: 'Various',
                dose: 'Standard',
                timing: 'Breakfast',
                category: 'Antioxidant',
                benefits: ['Blood sugar', 'Antioxidant', 'Mitochondrial'],
                cost: '$15-25',
                certifications: [],
                notes: 'Universal antioxidant',
                keyIngredients: ['Alpha Lipoic Acid'],
                searchTerms: ['alpha lipoic acid', 'antioxidant', 'blood sugar', 'mitochondrial']
            },
            {
                name: 'Sulforaphane',
                brand: 'Avmacol',
                dose: 'Per package',
                timing: 'Breakfast',
                category: 'Antioxidant',
                benefits: ['Cancer prevention', 'Detoxification', 'Nrf2 activation'],
                cost: '$30-50',
                certifications: [],
                notes: 'Potent Nrf2 activator from broccoli sprouts',
                keyIngredients: ['Sulforaphane', 'Myrosinase'],
                searchTerms: ['sulforaphane', 'avmacol', 'cancer', 'detox', 'nrf2', 'broccoli']
            },
            
            // Lunch supplements
            {
                name: 'Multivitamin O.N.E.',
                brand: 'Pure Encapsulations',
                dose: '1 capsule',
                timing: 'Lunch',
                category: 'Essential',
                benefits: ['Comprehensive nutrition', 'Vitamin D', 'B vitamins'],
                cost: '$35-45',
                certifications: ['NSF Certified'],
                notes: 'Contains 2,000 IU Vitamin D3',
                keyIngredients: ['Multiple vitamins', 'Minerals'],
                searchTerms: ['multivitamin', 'pure encapsulations', 'vitamin d', 'b vitamins', 'one']
            },
            {
                name: 'PQQ',
                brand: 'Various',
                dose: 'Standard',
                timing: 'Lunch',
                category: 'Mitochondrial',
                benefits: ['Mitochondrial biogenesis', 'Cognitive function', 'Energy'],
                cost: '$25-40',
                certifications: [],
                notes: 'Promotes new mitochondria formation',
                keyIngredients: ['Pyrroloquinoline quinone'],
                searchTerms: ['pqq', 'mitochondrial', 'energy', 'cognitive', 'biogenesis']
            },
            {
                name: 'CocoaVia',
                brand: 'CocoaVia',
                dose: 'Per package',
                timing: 'Lunch',
                category: 'Brain Health',
                benefits: ['Cognitive function', 'Blood flow', 'Flavonoids'],
                cost: '$30-40',
                certifications: [],
                notes: 'Clinically studied cocoa flavanols',
                keyIngredients: ['Cocoa flavanols'],
                searchTerms: ['cocoavia', 'cocoa', 'cognitive', 'flavonoids', 'brain']
            },
            
            // Evening supplements
            {
                name: 'Vitamin D3',
                brand: 'Various',
                dose: '4,000 IU total daily',
                timing: 'Evening',
                category: 'Essential',
                benefits: ['Bone health', 'Immune function', 'Hormone regulation'],
                cost: '$10-20',
                certifications: [],
                notes: '2,000 IU from multivitamin + 2,000 IU evening dose',
                keyIngredients: ['Cholecalciferol'],
                searchTerms: ['vitamin d', 'vitamin d3', 'bone', 'immune', 'hormone']
            },
            {
                name: 'Magnesium Glycinate',
                brand: 'Pure Encapsulations',
                dose: '125mg',
                timing: 'Evening',
                category: 'Sleep',
                benefits: ['Sleep quality', 'Muscle relaxation', 'Stress reduction'],
                cost: '$20-30',
                certifications: ['NSF Certified'],
                notes: 'Chelated form for better absorption',
                keyIngredients: ['Magnesium Glycinate'],
                searchTerms: ['magnesium', 'sleep', 'relaxation', 'stress', 'pure encapsulations']
            },
            {
                name: 'Vitamin K2',
                brand: 'Various',
                dose: 'Standard',
                timing: 'Evening',
                category: 'Essential',
                benefits: ['Bone health', 'Cardiovascular', 'Calcium regulation'],
                cost: '$15-25',
                certifications: [],
                notes: 'Works synergistically with Vitamin D',
                keyIngredients: ['Menaquinone-7'],
                searchTerms: ['vitamin k2', 'bone', 'cardiovascular', 'calcium']
            },
            {
                name: 'Melatonin',
                brand: 'Various',
                dose: '3mg',
                timing: 'Evening',
                category: 'Sleep',
                benefits: ['Sleep quality', 'Night terrors', 'Antioxidant'],
                cost: '$10-20',
                certifications: [],
                notes: 'Higher dose for specific needs, not addictive for her',
                keyIngredients: ['Melatonin'],
                searchTerms: ['melatonin', 'sleep', 'night terrors', 'antioxidant']
            },
            {
                name: 'Vitamin C',
                brand: 'Various',
                dose: 'Standard',
                timing: 'Evening',
                category: 'Antioxidant',
                benefits: ['Immune support', 'Collagen synthesis', 'Antioxidant'],
                cost: '$10-20',
                certifications: [],
                notes: 'Essential antioxidant vitamin',
                keyIngredients: ['Ascorbic Acid'],
                searchTerms: ['vitamin c', 'immune', 'collagen', 'antioxidant']
            },
            {
                name: 'Ubiquinol CoQ10 Vesisorb',
                brand: 'Pure Encapsulations',
                dose: 'Standard',
                timing: 'Evening',
                category: 'Mitochondrial',
                benefits: ['Energy production', 'Heart health', 'Antioxidant'],
                cost: '$40-60',
                certifications: ['NSF Certified'],
                notes: 'Vesisorb technology for dramatically increased bioavailability',
                keyIngredients: ['Ubiquinol', 'CoQ10'],
                searchTerms: ['coq10', 'ubiquinol', 'energy', 'heart', 'mitochondrial', 'vesisorb']
            },
            {
                name: 'Myoinositol',
                brand: 'Pure Encapsulations',
                dose: '1 scoop',
                timing: 'Evening',
                category: 'Sleep',
                benefits: ['Sleep quality', 'Anxiety reduction', 'Hormonal balance'],
                cost: '$25-35',
                certifications: ['NSF Certified'],
                notes: 'Helps with sleep and stress management',
                keyIngredients: ['Myo-inositol'],
                searchTerms: ['myoinositol', 'inositol', 'sleep', 'anxiety', 'hormonal']
            }
        ];
    }

    createSearchInterface() {
        const supplementsSection = document.getElementById('supplements');
        if (!supplementsSection) return;

        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-filter-container';
        searchContainer.innerHTML = `
            <div class="search-header">
                <h3>🔍 Find Your Supplements</h3>
                <p>Search and filter Dr. Rhonda Patrick's supplement routine</p>
            </div>
            
            <div class="search-controls">
                <div class="search-box">
                    <input type="text" 
                           id="supplement-search" 
                           placeholder="Search by name, benefit, or ingredient..."
                           autocomplete="off">
                    <span class="search-icon">🔍</span>
                </div>
                
                <div class="filter-controls">
                    <select id="category-filter" class="filter-select">
                        <option value="all">All Categories</option>
                        <option value="Essential">Essential</option>
                        <option value="Performance">Performance</option>
                        <option value="Sleep">Sleep</option>
                        <option value="Antioxidant">Antioxidant</option>
                        <option value="Mitochondrial">Mitochondrial</option>
                        <option value="Recovery">Recovery</option>
                        <option value="Brain Health">Brain Health</option>
                    </select>
                    
                    <select id="brand-filter" class="filter-select">
                        <option value="all">All Brands</option>
                        <option value="Thorne">Thorne</option>
                        <option value="Pure Encapsulations">Pure Encapsulations</option>
                        <option value="Now Foods">Now Foods</option>
                        <option value="Avmacol">Avmacol</option>
                        <option value="CocoaVia">CocoaVia</option>
                        <option value="Various">Various</option>
                    </select>
                    
                    <select id="timing-filter" class="filter-select">
                        <option value="all">All Timing</option>
                        <option value="Morning">Morning</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Evening">Evening</option>
                    </select>
                    
                    <select id="benefit-filter" class="filter-select">
                        <option value="all">All Benefits</option>
                        <option value="Sleep quality">Sleep Quality</option>
                        <option value="Cognitive">Cognitive Function</option>
                        <option value="Energy">Energy & Performance</option>
                        <option value="Heart">Heart Health</option>
                        <option value="Immune">Immune Support</option>
                        <option value="Antioxidant">Antioxidant</option>
                        <option value="Recovery">Recovery</option>
                    </select>
                </div>
                
                <div class="search-actions">
                    <button id="clear-filters" class="clear-btn">Clear All</button>
                    <span class="results-count" id="results-count">Showing ${this.supplements.length} supplements</span>
                </div>
            </div>
            
            <div class="search-results" id="search-results"></div>
        `;

        // Insert after the section header
        const container = supplementsSection.querySelector('.container');
        const header = container.querySelector('header');
        if (header) {
            header.after(searchContainer);
        }
    }

    createQuickLookup() {
        const quickLookupHtml = `
            <div class="quick-lookup-section">
                <h4>⚡ Quick Lookup</h4>
                <div class="quick-buttons">
                    <button class="quick-btn" data-search="sleep">Sleep Support</button>
                    <button class="quick-btn" data-search="energy">Energy & Performance</button>
                    <button class="quick-btn" data-search="brain">Brain Health</button>
                    <button class="quick-btn" data-search="heart">Heart Health</button>
                    <button class="quick-btn" data-search="immune">Immune Support</button>
                    <button class="quick-btn" data-search="nsf certified">NSF Certified</button>
                    <button class="quick-btn" data-search="thorne">Thorne Products</button>
                    <button class="quick-btn" data-search="pure encapsulations">Pure Encapsulations</button>
                </div>
            </div>
        `;

        const searchContainer = document.querySelector('.search-filter-container');
        if (searchContainer) {
            searchContainer.insertAdjacentHTML('beforeend', quickLookupHtml);
        }
    }

    bindEvents() {
        // Search input
        document.addEventListener('input', (e) => {
            if (e.target.id === 'supplement-search') {
                this.activeFilters.search = e.target.value.toLowerCase();
                this.applyFilters();
            }
        });

        // Filter selects
        ['category-filter', 'brand-filter', 'timing-filter', 'benefit-filter'].forEach(filterId => {
            document.addEventListener('change', (e) => {
                if (e.target.id === filterId) {
                    const filterType = filterId.replace('-filter', '');
                    this.activeFilters[filterType] = e.target.value;
                    this.applyFilters();
                }
            });
        });

        // Clear filters
        document.addEventListener('click', (e) => {
            if (e.target.id === 'clear-filters') {
                this.clearAllFilters();
            }
        });

        // Quick lookup buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-btn')) {
                const searchTerm = e.target.dataset.search;
                document.getElementById('supplement-search').value = searchTerm;
                this.activeFilters.search = searchTerm.toLowerCase();
                this.applyFilters();
            }
        });

        // Real-time search suggestions
        document.addEventListener('keyup', (e) => {
            if (e.target.id === 'supplement-search') {
                this.showSearchSuggestions(e.target.value);
            }
        });
    }

    applyFilters() {
        this.filteredSupplements = this.supplements.filter(supplement => {
            // Search filter
            const searchMatch = this.activeFilters.search === '' || 
                supplement.searchTerms.some(term => 
                    term.includes(this.activeFilters.search)
                ) ||
                supplement.name.toLowerCase().includes(this.activeFilters.search) ||
                supplement.benefits.some(benefit => 
                    benefit.toLowerCase().includes(this.activeFilters.search)
                );

            // Category filter
            const categoryMatch = this.activeFilters.category === 'all' || 
                supplement.category === this.activeFilters.category;

            // Brand filter
            const brandMatch = this.activeFilters.brand === 'all' || 
                supplement.brand === this.activeFilters.brand;

            // Timing filter
            const timingMatch = this.activeFilters.timing === 'all' || 
                supplement.timing.includes(this.activeFilters.timing);

            // Benefit filter
            const benefitMatch = this.activeFilters.benefit === 'all' ||
                supplement.benefits.some(benefit => 
                    benefit.toLowerCase().includes(this.activeFilters.benefit.toLowerCase())
                );

            return searchMatch && categoryMatch && brandMatch && timingMatch && benefitMatch;
        });

        this.displayResults();
        this.updateResultsCount();
    }

    displayResults() {
        const resultsContainer = document.getElementById('search-results');
        if (!resultsContainer) return;

        if (this.filteredSupplements.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <span class="no-results-icon">🔍</span>
                    <h4>No supplements found</h4>
                    <p>Try adjusting your search terms or filters</p>
                </div>
            `;
            return;
        }

        const resultsHtml = this.filteredSupplements.map(supplement => `
            <div class="search-result-card">
                <div class="result-header">
                    <h4 class="supplement-name">${supplement.name}</h4>
                    <span class="category-badge ${supplement.category.toLowerCase().replace(' ', '-')}">${supplement.category}</span>
                </div>
                
                <div class="result-details">
                    <div class="detail-row">
                        <span class="detail-label">Brand:</span>
                        <span class="brand-value">${supplement.brand}</span>
                        ${supplement.certifications.length > 0 ? 
                            `<span class="cert-badge">${supplement.certifications[0]}</span>` : ''}
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">Dose:</span>
                        <span class="dose-value">${supplement.dose}</span>
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">Timing:</span>
                        <span class="timing-value">${supplement.timing}</span>
                    </div>
                    
                    <div class="detail-row">
                        <span class="detail-label">Cost:</span>
                        <span class="cost-value">${supplement.cost}</span>
                    </div>
                </div>
                
                <div class="benefits-list">
                    <span class="detail-label">Benefits:</span>
                    <div class="benefit-tags">
                        ${supplement.benefits.map(benefit => 
                            `<span class="benefit-tag">${benefit}</span>`
                        ).join('')}
                    </div>
                </div>
                
                ${supplement.notes ? `
                    <div class="supplement-notes">
                        <span class="detail-label">Notes:</span>
                        <p>${supplement.notes}</p>
                    </div>
                ` : ''}
            </div>
        `).join('');

        resultsContainer.innerHTML = resultsHtml;
    }

    updateResultsCount() {
        const countElement = document.getElementById('results-count');
        if (countElement) {
            countElement.textContent = `Showing ${this.filteredSupplements.length} of ${this.supplements.length} supplements`;
        }
    }

    clearAllFilters() {
        // Reset filters
        this.activeFilters = {
            search: '',
            category: 'all',
            brand: 'all',
            timing: 'all',
            benefit: 'all'
        };

        // Reset form controls
        document.getElementById('supplement-search').value = '';
        document.getElementById('category-filter').value = 'all';
        document.getElementById('brand-filter').value = 'all';
        document.getElementById('timing-filter').value = 'all';
        document.getElementById('benefit-filter').value = 'all';

        // Reset results
        this.filteredSupplements = [...this.supplements];
        this.displayResults();
        this.updateResultsCount();
    }

    showSearchSuggestions(query) {
        if (query.length < 2) return;

        const suggestions = this.supplements
            .filter(supp => 
                supp.searchTerms.some(term => term.includes(query.toLowerCase()))
            )
            .slice(0, 5)
            .map(supp => supp.name);

        // Could implement dropdown suggestions here
        console.log('Suggestions:', suggestions);
    }

    // Public method for external integration
    searchSupplements(query) {
        document.getElementById('supplement-search').value = query;
        this.activeFilters.search = query.toLowerCase();
        this.applyFilters();
    }

    // Get supplement details by name
    getSupplementDetails(name) {
        return this.supplements.find(supp => 
            supp.name.toLowerCase() === name.toLowerCase()
        );
    }

    // Get supplements by category
    getSupplementsByCategory(category) {
        return this.supplements.filter(supp => 
            supp.category.toLowerCase() === category.toLowerCase()
        );
    }
}

// Initialize search and filter system
const searchFilterManager = new SearchFilterManager();

// Export for global access
window.searchFilterManager = searchFilterManager;