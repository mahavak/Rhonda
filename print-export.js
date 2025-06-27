// Print-Friendly PDF Export System
// Generates clean PDFs of routines, protocols, and shopping lists

class PrintExportManager {
    constructor() {
        this.initializePrintSystem();
    }

    initializePrintSystem() {
        document.addEventListener('DOMContentLoaded', () => {
            this.createPrintButtons();
            this.bindEvents();
        });
    }

    createPrintButtons() {
        // Add print buttons to each section
        const sections = [
            { id: 'supplements', title: 'Supplement Routine', type: 'supplements' },
            { id: 'sauna', title: 'Sauna Protocol', type: 'sauna' },
            { id: 'about', title: 'Complete Guide', type: 'complete' }
        ];

        sections.forEach(section => {
            const element = document.getElementById(section.id);
            if (element) {
                this.addPrintButton(element, section);
            }
        });

        // Add shopping list generator
        this.addShoppingListButton();
    }

    addPrintButton(element, section) {
        const printContainer = document.createElement('div');
        printContainer.className = 'print-export-container';
        printContainer.innerHTML = `
            <div class="print-buttons">
                <button class="print-btn" data-type="print" data-section="${section.type}">
                    <span class="print-icon">🖨️</span>
                    Print ${section.title}
                </button>
                <button class="print-btn" data-type="pdf" data-section="${section.type}">
                    <span class="print-icon">📄</span>
                    Export PDF
                </button>
            </div>
        `;

        // Insert at the beginning of the section
        const container = element.querySelector('.container');
        if (container) {
            container.insertBefore(printContainer, container.firstChild);
        }
    }

    addShoppingListButton() {
        // Add shopping list button to supplements section
        const supplementsSection = document.getElementById('supplements');
        if (supplementsSection) {
            const shoppingContainer = document.createElement('div');
            shoppingContainer.className = 'print-export-container shopping-list-container';
            shoppingContainer.innerHTML = `
                <div class="print-buttons">
                    <button class="print-btn shopping-btn" data-type="shopping">
                        <span class="print-icon">🛒</span>
                        Generate Shopping List
                    </button>
                </div>
            `;

            const container = supplementsSection.querySelector('.container');
            if (container) {
                // Add after the first print container
                const existingPrint = container.querySelector('.print-export-container');
                if (existingPrint) {
                    existingPrint.appendChild(shoppingContainer.firstChild);
                }
            }
        }
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.print-btn')) {
                const button = e.target.closest('.print-btn');
                const type = button.dataset.type;
                const section = button.dataset.section;

                if (type === 'print') {
                    this.printSection(section);
                } else if (type === 'pdf') {
                    this.exportToPDF(section);
                } else if (type === 'shopping') {
                    this.generateShoppingList();
                }
            }
        });
    }

    printSection(sectionType) {
        // Create a clean print version
        const printContent = this.generatePrintContent(sectionType);
        
        // Open print window
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Rhonda Patrick - ${this.getSectionTitle(sectionType)}</title>
                <style>${this.getPrintStyles()}</style>
            </head>
            <body>
                ${printContent}
            </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();
        
        // Print after content loads
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 250);

        this.trackPrintEvent('print', sectionType);
    }

    async exportToPDF(sectionType) {
        try {
            // Show loading state
            this.showExportLoading(true);

            // Use browser's built-in PDF generation
            const printContent = this.generatePrintContent(sectionType);
            
            // Create temporary iframe for PDF generation
            const iframe = document.createElement('iframe');
            iframe.style.position = 'absolute';
            iframe.style.left = '-9999px';
            iframe.style.width = '8.5in';
            iframe.style.height = '11in';
            
            document.body.appendChild(iframe);
            
            const doc = iframe.contentDocument;
            doc.open();
            doc.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Rhonda Patrick - ${this.getSectionTitle(sectionType)}</title>
                    <style>${this.getPrintStyles()}</style>
                </head>
                <body>
                    ${printContent}
                </body>
                </html>
            `);
            doc.close();

            // Generate filename
            const filename = `rhonda-patrick-${sectionType}-${new Date().toISOString().split('T')[0]}.pdf`;
            
            // Trigger print to PDF (user will need to choose PDF as printer)
            setTimeout(() => {
                iframe.contentWindow.focus();
                iframe.contentWindow.print();
                
                // Clean up
                setTimeout(() => {
                    document.body.removeChild(iframe);
                    this.showExportLoading(false);
                }, 1000);
            }, 500);

            this.trackPrintEvent('pdf', sectionType);
            
        } catch (error) {
            console.error('PDF export failed:', error);
            this.showExportError();
        }
    }

    generateShoppingList() {
        const supplements = this.extractSupplementData();
        const shoppingList = this.createShoppingListHTML(supplements);
        
        // Open shopping list in new window
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Rhonda Patrick - Supplement Shopping List</title>
                <style>${this.getPrintStyles()}</style>
            </head>
            <body>
                ${shoppingList}
            </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();

        this.trackPrintEvent('shopping', 'supplements');
    }

    generatePrintContent(sectionType) {
        const header = this.generatePrintHeader(sectionType);
        
        switch (sectionType) {
            case 'supplements':
                return header + this.generateSupplementsPrintContent();
            case 'sauna':
                return header + this.generateSaunaPrintContent();
            case 'complete':
                return header + this.generateCompletePrintContent();
            default:
                return header + '<p>Section not found</p>';
        }
    }

    generatePrintHeader(sectionType) {
        const currentDate = new Date().toLocaleDateString();
        return `
            <div class="print-header">
                <h1>Dr. Rhonda Patrick's ${this.getSectionTitle(sectionType)}</h1>
                <p class="print-subtitle">Evidence-based wellness protocols</p>
                <p class="print-date">Generated: ${currentDate}</p>
                <hr>
            </div>
        `;
    }

    generateSupplementsPrintContent() {
        return `
            <div class="print-content">
                <h2>Daily Supplement Routine</h2>
                
                <div class="routine-print">
                    <h3>🌅 Morning (Empty Stomach/In Coffee)</h3>
                    <ul class="supplement-list">
                        <li><strong>Creatine (Thorne)</strong> - 10g total (2 × 5g doses)</li>
                        <li><strong>Glutamine (Thorne)</strong> - 5g</li>
                        <li><strong>Beetroot Extract (Now Foods)</strong> - 1 tbsp (endurance days only)</li>
                    </ul>

                    <h3>🍳 With Breakfast</h3>
                    <ul class="supplement-list">
                        <li><strong>Fish Oil</strong> - ~1g (part of 2g daily total)</li>
                        <li><strong>Alpha Lipoic Acid</strong> - Standard dose</li>
                        <li><strong>Sulforaphane (Avmacol)</strong> - Per package instructions</li>
                    </ul>

                    <h3>🌞 Afternoon (With Lunch)</h3>
                    <ul class="supplement-list">
                        <li><strong>Multivitamin (Pure Encapsulations O.N.E.)</strong> - 1 capsule (contains 2,000 IU Vitamin D)</li>
                        <li><strong>PQQ</strong> - Standard dose</li>
                        <li><strong>CocoaVia</strong> - Per package</li>
                    </ul>

                    <h3>🌆 Evening (After Dinner)</h3>
                    <ul class="supplement-list">
                        <li><strong>Vitamin D3</strong> - 2,000 IU (4,000 IU total daily)</li>
                        <li><strong>Magnesium Glycinate (Pure Encapsulations)</strong> - ~125mg</li>
                        <li><strong>Vitamin K2</strong> - Standard dose</li>
                        <li><strong>Fish Oil</strong> - Another 1g (completes 2g daily)</li>
                        <li><strong>Melatonin</strong> - 3mg (for night terrors & antioxidant benefits)</li>
                        <li><strong>Vitamin C</strong> - Standard dose</li>
                        <li><strong>Ubiquinol CoQ10 (Pure Encapsulations Vesisorb)</strong> - Standard dose</li>
                        <li><strong>Myoinositol (Pure Encapsulations)</strong> - 1 scoop</li>
                    </ul>
                </div>

                <div class="print-notes">
                    <h3>📝 Important Notes</h3>
                    <ul>
                        <li>All NSF certified supplements preferred (lower heavy metals)</li>
                        <li>Omega-3 reduced from 4g to 2g due to high omega-3 index (16%)</li>
                        <li>Creatine dose varies: 5g (run days), 10g (training), 15-20g (travel/sleep deprived)</li>
                        <li>These are Rhonda's personal choices - consult healthcare provider</li>
                    </ul>
                </div>
            </div>
        `;
    }

    generateSaunaPrintContent() {
        return `
            <div class="print-content">
                <h2>Sauna Protocol</h2>
                
                <div class="protocol-print">
                    <h3>🔬 Research-Based Protocol</h3>
                    <ul class="protocol-list">
                        <li><strong>Temperature:</strong> 174°F (79°C) - Traditional sauna, 10-20% humidity</li>
                        <li><strong>Duration:</strong> 20+ minutes (20 min = 50% mortality reduction)</li>
                        <li><strong>Frequency:</strong> 4-7x/week optimal (63% less cardiac death vs 22% at 2-3x)</li>
                        <li><strong>Heat Shock Proteins:</strong> 163°F for 30 min = 50% increase, active 48+ hours</li>
                    </ul>

                    <h3>👩‍🔬 Rhonda's Personal Routine</h3>
                    <ul class="protocol-list">
                        <li><strong>Temperature:</strong> 186°F (very heat-adapted)</li>
                        <li><strong>Duration:</strong> 20-30 minutes depending on workout intensity</li>
                        <li><strong>Frequency:</strong> 4+ times per week (sometimes 5, sometimes 2-3)</li>
                        <li><strong>Combination:</strong> Often combines with Peloton bike first</li>
                        <li><strong>Alternative:</strong> Hot tub (104°F) for 20+ min in evenings</li>
                    </ul>

                    <h3>💧 Hydration Protocol</h3>
                    <ul class="protocol-list">
                        <li>Green juice (kale, cucumber, lemon)</li>
                        <li>Electrolyte supplements (LMNT, Keto Start)</li>
                        <li>Focus on sodium, magnesium, potassium replacement</li>
                    </ul>

                    <h3>🛁 Hot Bath Alternative</h3>
                    <ul class="protocol-list">
                        <li><strong>Temperature:</strong> 104°F water</li>
                        <li><strong>Duration:</strong> 20+ minutes</li>
                        <li><strong>Position:</strong> Shoulders submerged</li>
                        <li><strong>Benefits:</strong> Activates heat shock proteins, increases BDNF</li>
                    </ul>
                </div>

                <div class="print-safety">
                    <h3>⚠️ Safety Guidelines</h3>
                    <ul class="safety-list">
                        <li><strong>Never:</strong> Use alcohol before/during sauna</li>
                        <li><strong>Avoid:</strong> Pregnant women (entire pregnancy)</li>
                        <li><strong>Caution:</strong> Children under 8-9 (max 5 minutes if used)</li>
                        <li><strong>Medical:</strong> Check with doctor if heart conditions</li>
                        <li><strong>Practice:</strong> Start at 140°F, build tolerance slowly</li>
                    </ul>
                </div>
            </div>
        `;
    }

    generateCompletePrintContent() {
        return this.generateSupplementsPrintContent() + this.generateSaunaPrintContent();
    }

    extractSupplementData() {
        return [
            // Morning
            { name: 'Creatine', brand: 'Thorne', dose: '10g total', timing: 'Morning', category: 'Performance' },
            { name: 'Glutamine', brand: 'Thorne', dose: '5g', timing: 'Morning', category: 'Recovery' },
            { name: 'Beetroot Extract', brand: 'Now Foods', dose: '1 tbsp', timing: 'Morning (as needed)', category: 'Performance' },
            
            // Breakfast
            { name: 'Fish Oil', brand: 'Various', dose: '1g', timing: 'Breakfast', category: 'Essential' },
            { name: 'Alpha Lipoic Acid', brand: 'Various', dose: 'Standard', timing: 'Breakfast', category: 'Antioxidant' },
            { name: 'Sulforaphane', brand: 'Avmacol', dose: 'Per package', timing: 'Breakfast', category: 'Antioxidant' },
            
            // Afternoon
            { name: 'Multivitamin O.N.E.', brand: 'Pure Encapsulations', dose: '1 capsule', timing: 'Lunch', category: 'Essential' },
            { name: 'PQQ', brand: 'Various', dose: 'Standard', timing: 'Lunch', category: 'Mitochondrial' },
            { name: 'CocoaVia', brand: 'CocoaVia', dose: 'Per package', timing: 'Lunch', category: 'Brain Health' },
            
            // Evening
            { name: 'Vitamin D3', brand: 'Various', dose: '2000 IU', timing: 'Evening', category: 'Essential' },
            { name: 'Magnesium Glycinate', brand: 'Pure Encapsulations', dose: '125mg', timing: 'Evening', category: 'Sleep' },
            { name: 'Vitamin K2', brand: 'Various', dose: 'Standard', timing: 'Evening', category: 'Essential' },
            { name: 'Fish Oil', brand: 'Various', dose: '1g', timing: 'Evening', category: 'Essential' },
            { name: 'Melatonin', brand: 'Various', dose: '3mg', timing: 'Evening', category: 'Sleep' },
            { name: 'Vitamin C', brand: 'Various', dose: 'Standard', timing: 'Evening', category: 'Antioxidant' },
            { name: 'Ubiquinol CoQ10 Vesisorb', brand: 'Pure Encapsulations', dose: 'Standard', timing: 'Evening', category: 'Mitochondrial' },
            { name: 'Myoinositol', brand: 'Pure Encapsulations', dose: '1 scoop', timing: 'Evening', category: 'Sleep' }
        ];
    }

    createShoppingListHTML(supplements) {
        const currentDate = new Date().toLocaleDateString();
        
        // Group by brand
        const byBrand = supplements.reduce((acc, supp) => {
            if (!acc[supp.brand]) acc[supp.brand] = [];
            acc[supp.brand].push(supp);
            return acc;
        }, {});

        // Group by category
        const byCategory = supplements.reduce((acc, supp) => {
            if (!acc[supp.category]) acc[supp.category] = [];
            acc[supp.category].push(supp);
            return acc;
        }, {});

        return `
            <div class="print-header">
                <h1>Supplement Shopping List</h1>
                <p class="print-subtitle">Based on Dr. Rhonda Patrick's routine</p>
                <p class="print-date">Generated: ${currentDate}</p>
                <hr>
            </div>

            <div class="shopping-content">
                <div class="shopping-summary">
                    <p><strong>Total Items:</strong> ${supplements.length}</p>
                    <p><strong>Preferred Brands:</strong> Thorne, Pure Encapsulations (NSF Certified)</p>
                </div>

                <h2>📋 Complete Shopping List</h2>
                <div class="shopping-checklist">
                    ${supplements.map(supp => `
                        <div class="shopping-item">
                            <input type="checkbox" class="print-checkbox">
                            <span class="item-name">${supp.name}</span>
                            <span class="item-brand">(${supp.brand})</span>
                            <span class="item-dose">${supp.dose}</span>
                        </div>
                    `).join('')}
                </div>

                <h2>🏢 By Brand</h2>
                ${Object.entries(byBrand).map(([brand, items]) => `
                    <div class="brand-group">
                        <h3>${brand}</h3>
                        <ul>
                            ${items.map(item => `<li>${item.name} - ${item.dose}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}

                <h2>🏷️ By Category</h2>
                ${Object.entries(byCategory).map(([category, items]) => `
                    <div class="category-group">
                        <h3>${category}</h3>
                        <ul>
                            ${items.map(item => `<li>${item.name} (${item.brand}) - ${item.dose}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}

                <div class="shopping-notes">
                    <h3>💡 Shopping Tips</h3>
                    <ul>
                        <li>Look for NSF Certified supplements (lower heavy metals)</li>
                        <li>Thorne offers convenient travel packets</li>
                        <li>Pure Encapsulations generally high quality</li>
                        <li>Check expiration dates and buy appropriate quantities</li>
                        <li>Consider subscription services for regular supplements</li>
                    </ul>
                </div>
            </div>
        `;
    }

    getPrintStyles() {
        return `
            @page {
                margin: 0.75in;
                size: letter;
            }
            
            * {
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Arial', sans-serif;
                line-height: 1.5;
                color: #333;
                font-size: 12px;
                margin: 0;
                padding: 0;
            }
            
            .print-header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid #2c3e50;
            }
            
            .print-header h1 {
                font-size: 24px;
                color: #2c3e50;
                margin: 0 0 10px 0;
                font-weight: bold;
            }
            
            .print-subtitle {
                font-size: 14px;
                color: #7f8c8d;
                margin: 5px 0;
                font-style: italic;
            }
            
            .print-date {
                font-size: 10px;
                color: #95a5a6;
                margin: 5px 0;
            }
            
            h2 {
                font-size: 18px;
                color: #2c3e50;
                margin: 25px 0 15px 0;
                border-bottom: 1px solid #ecf0f1;
                padding-bottom: 5px;
            }
            
            h3 {
                font-size: 14px;
                color: #34495e;
                margin: 20px 0 10px 0;
                font-weight: bold;
            }
            
            .supplement-list,
            .protocol-list,
            .safety-list {
                margin: 10px 0;
                padding-left: 20px;
            }
            
            .supplement-list li,
            .protocol-list li,
            .safety-list li {
                margin: 8px 0;
                line-height: 1.4;
            }
            
            .print-notes,
            .print-safety {
                background: #f8f9fa;
                padding: 15px;
                margin: 20px 0;
                border-left: 4px solid #3498db;
                page-break-inside: avoid;
            }
            
            .shopping-item {
                display: flex;
                align-items: center;
                padding: 8px 0;
                border-bottom: 1px dotted #ddd;
            }
            
            .print-checkbox {
                margin-right: 10px;
                transform: scale(1.2);
            }
            
            .item-name {
                font-weight: bold;
                flex: 1;
            }
            
            .item-brand {
                color: #7f8c8d;
                margin: 0 10px;
            }
            
            .item-dose {
                color: #95a5a6;
                font-size: 11px;
            }
            
            .brand-group,
            .category-group {
                margin: 15px 0;
                page-break-inside: avoid;
            }
            
            .shopping-summary {
                background: #e8f5e8;
                padding: 10px;
                margin: 15px 0;
                border-radius: 4px;
            }
            
            .shopping-notes {
                background: #fff3cd;
                padding: 15px;
                margin: 20px 0;
                border-left: 4px solid #ffc107;
            }
            
            @media print {
                .print-buttons {
                    display: none;
                }
                
                body {
                    font-size: 11px;
                }
                
                h1 {
                    font-size: 20px;
                }
                
                h2 {
                    font-size: 16px;
                }
                
                h3 {
                    font-size: 13px;
                }
            }
        `;
    }

    getSectionTitle(sectionType) {
        const titles = {
            supplements: 'Supplement Routine',
            sauna: 'Sauna Protocol',
            complete: 'Complete Wellness Guide'
        };
        return titles[sectionType] || 'Guide';
    }

    showExportLoading(show) {
        if (show) {
            const loader = document.createElement('div');
            loader.id = 'export-loader';
            loader.innerHTML = `
                <div class="export-loading">
                    <div class="loading-spinner"></div>
                    <p>Preparing PDF export...</p>
                    <small>Select "Save as PDF" in your printer options</small>
                </div>
            `;
            document.body.appendChild(loader);
        } else {
            const loader = document.getElementById('export-loader');
            if (loader) loader.remove();
        }
    }

    showExportError() {
        const error = document.createElement('div');
        error.className = 'export-error';
        error.innerHTML = `
            <div class="error-content">
                <span class="error-icon">⚠️</span>
                <span>PDF export failed. Please try the print option instead.</span>
            </div>
        `;
        document.body.appendChild(error);
        
        setTimeout(() => error.remove(), 5000);
    }

    trackPrintEvent(type, section) {
        // Google Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'print_export', {
                'event_category': 'utility',
                'event_label': `${type}_${section}`,
                'value': 1
            });
        }

        // Track in database if available
        if (window.rhondaDBUI?.db) {
            window.rhondaDBUI.db.addUserNote(`Exported ${type}: ${section}`);
        }

        console.log(`Print/Export: ${type} - ${section}`);
    }
}

// Initialize print export system
const printExportManager = new PrintExportManager();

// Export for global access
window.printExportManager = printExportManager;