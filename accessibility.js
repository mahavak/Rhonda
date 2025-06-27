// Localization & Accessibility System
// Comprehensive accessibility and multi-language support

class AccessibilityManager {
    constructor() {
        this.currentLanguage = 'en';
        this.voiceEnabled = false;
        this.speechSynthesis = window.speechSynthesis;
        this.recognition = null;
        this.translations = this.initializeTranslations();
        this.accessibilitySettings = this.loadAccessibilitySettings();
        this.initializeAccessibility();
    }

    initializeTranslations() {
        return {
            en: {
                // Navigation
                home: 'Home',
                supplements: 'Supplements',
                sauna: 'Sauna Protocol',
                about: 'About',
                
                // Search & Filter
                searchPlaceholder: 'Search by name, benefit, or ingredient...',
                allCategories: 'All Categories',
                allBrands: 'All Brands',
                allTiming: 'All Timing',
                allBenefits: 'All Benefits',
                clearFilters: 'Clear All',
                showingResults: 'Showing {count} supplements',
                noResults: 'No supplements found',
                quickLookup: 'Quick Lookup',
                
                // Supplement details
                morning: 'Morning',
                breakfast: 'Breakfast',
                lunch: 'Lunch',
                evening: 'Evening',
                dose: 'Dose',
                brand: 'Brand',
                timing: 'Timing',
                cost: 'Cost',
                benefits: 'Benefits',
                notes: 'Notes',
                
                // Categories
                essential: 'Essential',
                performance: 'Performance',
                sleep: 'Sleep',
                antioxidant: 'Antioxidant',
                mitochondrial: 'Mitochondrial',
                recovery: 'Recovery',
                brainHealth: 'Brain Health',
                
                // Voice commands
                voiceEnabled: 'Voice commands enabled',
                voiceDisabled: 'Voice commands disabled',
                sayHelpForCommands: 'Say "help" to see available commands',
                listeningForCommand: 'Listening for voice command...',
                
                // Accessibility
                highContrast: 'High Contrast',
                largeText: 'Large Text',
                reduceMotion: 'Reduce Motion',
                screenReader: 'Screen Reader Mode',
                dyslexiaFont: 'Dyslexia-Friendly Font',
                colorBlindness: 'Color Blind Support',
                
                // Print/Export
                printRoutine: 'Print {section}',
                exportPdf: 'Export PDF',
                generateShoppingList: 'Generate Shopping List',
                
                // Help
                keyboardShortcuts: 'Keyboard Shortcuts',
                accessibilityHelp: 'Accessibility Help'
            },
            
            es: {
                // Navigation
                home: 'Inicio',
                supplements: 'Suplementos',
                sauna: 'Protocolo de Sauna',
                about: 'Acerca de',
                
                // Search & Filter
                searchPlaceholder: 'Buscar por nombre, beneficio o ingrediente...',
                allCategories: 'Todas las Categorías',
                allBrands: 'Todas las Marcas',
                allTiming: 'Todos los Horarios',
                allBenefits: 'Todos los Beneficios',
                clearFilters: 'Limpiar Todo',
                showingResults: 'Mostrando {count} suplementos',
                noResults: 'No se encontraron suplementos',
                quickLookup: 'Búsqueda Rápida',
                
                // Supplement details
                morning: 'Mañana',
                breakfast: 'Desayuno',
                lunch: 'Almuerzo',
                evening: 'Noche',
                dose: 'Dosis',
                brand: 'Marca',
                timing: 'Horario',
                cost: 'Costo',
                benefits: 'Beneficios',
                notes: 'Notas',
                
                // Categories
                essential: 'Esencial',
                performance: 'Rendimiento',
                sleep: 'Sueño',
                antioxidant: 'Antioxidante',
                mitochondrial: 'Mitocondrial',
                recovery: 'Recuperación',
                brainHealth: 'Salud Cerebral'
            },
            
            fr: {
                // Navigation
                home: 'Accueil',
                supplements: 'Suppléments',
                sauna: 'Protocole Sauna',
                about: 'À propos',
                
                // Search & Filter
                searchPlaceholder: 'Rechercher par nom, bénéfice ou ingrédient...',
                allCategories: 'Toutes les Catégories',
                allBrands: 'Toutes les Marques',
                allTiming: 'Tous les Horaires',
                allBenefits: 'Tous les Bénéfices',
                clearFilters: 'Tout Effacer',
                showingResults: 'Affichage de {count} suppléments',
                noResults: 'Aucun supplément trouvé',
                quickLookup: 'Recherche Rapide',
                
                // Supplement details
                morning: 'Matin',
                breakfast: 'Petit-déjeuner',
                lunch: 'Déjeuner',
                evening: 'Soir',
                dose: 'Dose',
                brand: 'Marque',
                timing: 'Horaire',
                cost: 'Coût',
                benefits: 'Bénéfices',
                notes: 'Notes'
            }
        };
    }

    initializeAccessibility() {
        document.addEventListener('DOMContentLoaded', () => {
            this.createAccessibilityPanel();
            this.createLanguageSelector();
            this.setupKeyboardNavigation();
            this.setupVoiceCommands();
            this.applyAccessibilitySettings();
            this.addAriaLabels();
            this.setupFocusManagement();
        });
    }

    createAccessibilityPanel() {
        const panel = document.createElement('div');
        panel.className = 'accessibility-panel';
        panel.innerHTML = `
            <button class="accessibility-toggle" aria-label="Open accessibility options">
                <span class="accessibility-icon">♿</span>
                <span class="toggle-text">Accessibility</span>
            </button>
            
            <div class="accessibility-menu" role="dialog" aria-labelledby="accessibility-title">
                <div class="accessibility-header">
                    <h3 id="accessibility-title">Accessibility Options</h3>
                    <button class="close-accessibility" aria-label="Close accessibility panel">×</button>
                </div>
                
                <div class="accessibility-content">
                    <div class="accessibility-section">
                        <h4>Visual</h4>
                        <div class="accessibility-controls">
                            <label class="accessibility-option">
                                <input type="checkbox" id="high-contrast" name="accessibility">
                                <span class="option-text">${this.translate('highContrast')}</span>
                            </label>
                            
                            <label class="accessibility-option">
                                <input type="checkbox" id="large-text" name="accessibility">
                                <span class="option-text">${this.translate('largeText')}</span>
                            </label>
                            
                            <label class="accessibility-option">
                                <input type="checkbox" id="dyslexia-font" name="accessibility">
                                <span class="option-text">${this.translate('dyslexiaFont')}</span>
                            </label>
                            
                            <label class="accessibility-option">
                                <input type="checkbox" id="color-blind-support" name="accessibility">
                                <span class="option-text">${this.translate('colorBlindness')}</span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="accessibility-section">
                        <h4>Motion & Animation</h4>
                        <div class="accessibility-controls">
                            <label class="accessibility-option">
                                <input type="checkbox" id="reduce-motion" name="accessibility">
                                <span class="option-text">${this.translate('reduceMotion')}</span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="accessibility-section">
                        <h4>Screen Reader</h4>
                        <div class="accessibility-controls">
                            <label class="accessibility-option">
                                <input type="checkbox" id="screen-reader-mode" name="accessibility">
                                <span class="option-text">${this.translate('screenReader')}</span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="accessibility-section">
                        <h4>Voice Commands</h4>
                        <div class="accessibility-controls">
                            <button id="toggle-voice" class="voice-toggle-btn">
                                ${this.translate('voiceDisabled')}
                            </button>
                            <p class="voice-help">
                                ${this.translate('sayHelpForCommands')}
                            </p>
                        </div>
                    </div>
                    
                    <div class="accessibility-section">
                        <h4>${this.translate('keyboardShortcuts')}</h4>
                        <div class="keyboard-shortcuts">
                            <div class="shortcut-item">
                                <kbd>Alt + 1</kbd> <span>Jump to supplements</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd>Alt + 2</kbd> <span>Jump to sauna protocol</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd>Alt + S</kbd> <span>Focus search</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd>Alt + V</kbd> <span>Toggle voice commands</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd>Esc</kbd> <span>Close panels</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add to page
        document.body.appendChild(panel);
        this.bindAccessibilityEvents();
    }

    createLanguageSelector() {
        const selector = document.createElement('div');
        selector.className = 'language-selector';
        selector.innerHTML = `
            <button class="language-toggle" aria-label="Select language">
                <span class="language-icon">🌐</span>
                <span class="current-language">${this.currentLanguage.toUpperCase()}</span>
            </button>
            
            <div class="language-menu" role="menu">
                <button class="language-option" data-lang="en" role="menuitem">
                    <span class="flag">🇺🇸</span> English
                </button>
                <button class="language-option" data-lang="es" role="menuitem">
                    <span class="flag">🇪🇸</span> Español
                </button>
                <button class="language-option" data-lang="fr" role="menuitem">
                    <span class="flag">🇫🇷</span> Français
                </button>
            </div>
        `;

        // Insert in navbar
        const navbar = document.querySelector('.nav-menu');
        if (navbar) {
            navbar.appendChild(selector);
            this.bindLanguageEvents();
        }
    }

    setupKeyboardNavigation() {
        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.altKey) {
                switch(e.key) {
                    case '1':
                        e.preventDefault();
                        document.getElementById('supplements')?.scrollIntoView();
                        break;
                    case '2':
                        e.preventDefault();
                        document.getElementById('sauna')?.scrollIntoView();
                        break;
                    case 's':
                    case 'S':
                        e.preventDefault();
                        document.getElementById('supplement-search')?.focus();
                        break;
                    case 'v':
                    case 'V':
                        e.preventDefault();
                        this.toggleVoiceCommands();
                        break;
                }
            }
            
            if (e.key === 'Escape') {
                this.closeAllPanels();
            }
        });

        // Skip to content link
        this.addSkipLink();
    }

    setupVoiceCommands() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            console.log('Speech recognition not supported');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = false;
        this.recognition.lang = this.currentLanguage;

        this.recognition.onresult = (event) => {
            const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
            this.processVoiceCommand(command);
        };

        this.recognition.onerror = (event) => {
            console.error('Voice recognition error:', event.error);
        };
    }

    processVoiceCommand(command) {
        console.log('Voice command:', command);
        
        // Navigation commands
        if (command.includes('supplements') || command.includes('supplement')) {
            document.getElementById('supplements')?.scrollIntoView({ behavior: 'smooth' });
            this.speak('Navigating to supplements section');
        } else if (command.includes('sauna')) {
            document.getElementById('sauna')?.scrollIntoView({ behavior: 'smooth' });
            this.speak('Navigating to sauna protocol');
        } else if (command.includes('search')) {
            document.getElementById('supplement-search')?.focus();
            this.speak('Search box focused');
        } else if (command.includes('help')) {
            this.speakHelp();
        } else if (command.includes('read') || command.includes('speak')) {
            this.readCurrentSection();
        } else if (command.includes('stop')) {
            this.speechSynthesis.cancel();
        } else {
            // Try searching for the command
            if (window.searchFilterManager) {
                window.searchFilterManager.searchSupplements(command);
                this.speak(`Searching for ${command}`);
            }
        }
    }

    bindAccessibilityEvents() {
        // Toggle accessibility panel
        document.querySelector('.accessibility-toggle').addEventListener('click', () => {
            this.toggleAccessibilityPanel();
        });

        // Close accessibility panel
        document.querySelector('.close-accessibility').addEventListener('click', () => {
            this.closeAccessibilityPanel();
        });

        // Accessibility option changes
        document.querySelectorAll('input[name="accessibility"]').forEach(input => {
            input.addEventListener('change', (e) => {
                this.handleAccessibilityChange(e.target.id, e.target.checked);
            });
        });

        // Voice commands toggle
        document.getElementById('toggle-voice').addEventListener('click', () => {
            this.toggleVoiceCommands();
        });
    }

    bindLanguageEvents() {
        document.querySelector('.language-toggle').addEventListener('click', () => {
            this.toggleLanguageMenu();
        });

        document.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const lang = e.currentTarget.dataset.lang;
                this.changeLanguage(lang);
            });
        });
    }

    handleAccessibilityChange(setting, enabled) {
        this.accessibilitySettings[setting] = enabled;
        this.saveAccessibilitySettings();
        this.applyAccessibilitySetting(setting, enabled);
    }

    applyAccessibilitySetting(setting, enabled) {
        const body = document.body;
        
        switch(setting) {
            case 'high-contrast':
                body.classList.toggle('high-contrast', enabled);
                break;
            case 'large-text':
                body.classList.toggle('large-text', enabled);
                break;
            case 'dyslexia-font':
                body.classList.toggle('dyslexia-font', enabled);
                break;
            case 'reduce-motion':
                body.classList.toggle('reduce-motion', enabled);
                break;
            case 'screen-reader-mode':
                body.classList.toggle('screen-reader-mode', enabled);
                this.enhanceForScreenReader(enabled);
                break;
            case 'color-blind-support':
                body.classList.toggle('color-blind-support', enabled);
                break;
        }
    }

    enhanceForScreenReader(enabled) {
        if (enabled) {
            // Add more descriptive labels
            this.addScreenReaderEnhancements();
        } else {
            this.removeScreenReaderEnhancements();
        }
    }

    addScreenReaderEnhancements() {
        // Add live regions for dynamic content
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-live-region';
        liveRegion.style.position = 'absolute';
        liveRegion.style.left = '-10000px';
        document.body.appendChild(liveRegion);

        // Announce page changes
        this.announceToScreenReader = (message) => {
            liveRegion.textContent = message;
        };
    }

    toggleVoiceCommands() {
        if (this.voiceEnabled) {
            this.voiceEnabled = false;
            this.recognition?.stop();
            document.getElementById('toggle-voice').textContent = this.translate('voiceDisabled');
            this.speak('Voice commands disabled');
        } else {
            this.voiceEnabled = true;
            this.recognition?.start();
            document.getElementById('toggle-voice').textContent = this.translate('voiceEnabled');
            this.speak('Voice commands enabled. Say help for available commands.');
        }
    }

    speak(text) {
        if (this.speechSynthesis) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = this.currentLanguage;
            utterance.rate = 0.9;
            this.speechSynthesis.speak(utterance);
        }
    }

    speakHelp() {
        const helpText = `Available voice commands: 
            Say "supplements" to go to supplements section.
            Say "sauna" to go to sauna protocol.
            Say "search" to focus the search box.
            Say "read" to read the current section.
            Say "stop" to stop speaking.
            Or say any supplement name to search for it.`;
        this.speak(helpText);
    }

    readCurrentSection() {
        const sections = ['supplements', 'sauna', 'about'];
        let currentSection = null;

        for (const sectionId of sections) {
            const section = document.getElementById(sectionId);
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                    currentSection = section;
                    break;
                }
            }
        }

        if (currentSection) {
            const text = this.extractReadableText(currentSection);
            this.speak(text);
        }
    }

    extractReadableText(element) {
        // Extract meaningful text for screen readers
        const title = element.querySelector('h2')?.textContent || '';
        const subtitle = element.querySelector('.section-subtitle')?.textContent || '';
        return `${title}. ${subtitle}`;
    }

    changeLanguage(newLang) {
        this.currentLanguage = newLang;
        localStorage.setItem('preferred-language', newLang);
        
        // Update language indicator
        document.querySelector('.current-language').textContent = newLang.toUpperCase();
        
        // Update page content
        this.translatePage();
        this.closeLanguageMenu();
        
        // Update voice recognition language
        if (this.recognition) {
            this.recognition.lang = newLang;
        }
    }

    translatePage() {
        // Update search placeholder
        const searchInput = document.getElementById('supplement-search');
        if (searchInput) {
            searchInput.placeholder = this.translate('searchPlaceholder');
        }

        // Update filter options
        this.updateFilterOptions();
        
        // Update quick lookup buttons
        this.updateQuickLookupButtons();
        
        // Update results count
        this.updateResultsCount();
    }

    updateFilterOptions() {
        const selects = {
            'category-filter': [
                { value: 'all', text: this.translate('allCategories') },
                { value: 'Essential', text: this.translate('essential') },
                { value: 'Performance', text: this.translate('performance') },
                { value: 'Sleep', text: this.translate('sleep') }
            ]
        };

        Object.entries(selects).forEach(([selectId, options]) => {
            const select = document.getElementById(selectId);
            if (select) {
                options.forEach((option, index) => {
                    if (select.options[index]) {
                        select.options[index].textContent = option.text;
                    }
                });
            }
        });
    }

    translate(key) {
        return this.translations[this.currentLanguage]?.[key] || 
               this.translations['en'][key] || 
               key;
    }

    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('main')?.focus();
        });
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    addAriaLabels() {
        // Add ARIA labels to interactive elements
        document.querySelectorAll('button, input, select').forEach(element => {
            if (!element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')) {
                const label = this.generateAriaLabel(element);
                if (label) {
                    element.setAttribute('aria-label', label);
                }
            }
        });
    }

    generateAriaLabel(element) {
        if (element.classList.contains('print-btn')) {
            return 'Print or export this section';
        }
        if (element.classList.contains('quick-btn')) {
            return `Quick search for ${element.textContent}`;
        }
        return null;
    }

    setupFocusManagement() {
        // Improve focus visibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    toggleAccessibilityPanel() {
        const menu = document.querySelector('.accessibility-menu');
        const isOpen = menu.style.display === 'block';
        menu.style.display = isOpen ? 'none' : 'block';
        
        if (!isOpen) {
            // Focus first interactive element
            menu.querySelector('input, button')?.focus();
        }
    }

    closeAccessibilityPanel() {
        document.querySelector('.accessibility-menu').style.display = 'none';
    }

    toggleLanguageMenu() {
        const menu = document.querySelector('.language-menu');
        const isOpen = menu.style.display === 'block';
        menu.style.display = isOpen ? 'none' : 'block';
    }

    closeLanguageMenu() {
        document.querySelector('.language-menu').style.display = 'none';
    }

    closeAllPanels() {
        this.closeAccessibilityPanel();
        this.closeLanguageMenu();
    }

    loadAccessibilitySettings() {
        const saved = localStorage.getItem('accessibility-settings');
        return saved ? JSON.parse(saved) : {
            'high-contrast': false,
            'large-text': false,
            'dyslexia-font': false,
            'reduce-motion': false,
            'screen-reader-mode': false,
            'color-blind-support': false
        };
    }

    saveAccessibilitySettings() {
        localStorage.setItem('accessibility-settings', JSON.stringify(this.accessibilitySettings));
    }

    applyAccessibilitySettings() {
        Object.entries(this.accessibilitySettings).forEach(([setting, enabled]) => {
            const checkbox = document.getElementById(setting);
            if (checkbox) {
                checkbox.checked = enabled;
                this.applyAccessibilitySetting(setting, enabled);
            }
        });

        // Load preferred language
        const savedLang = localStorage.getItem('preferred-language');
        if (savedLang && this.translations[savedLang]) {
            this.changeLanguage(savedLang);
        }
    }
}

// Initialize accessibility system
const accessibilityManager = new AccessibilityManager();

// Export for global access
window.accessibilityManager = accessibilityManager;