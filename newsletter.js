// Newsletter Signup Functionality
// Handles email collection and subscription management

class NewsletterManager {
    constructor() {
        this.subscribers = this.getStoredSubscribers();
        this.initializeNewsletter();
    }

    initializeNewsletter() {
        document.addEventListener('DOMContentLoaded', () => {
            this.bindEvents();
        });
    }

    bindEvents() {
        const form = document.getElementById('newsletterForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubscription(e));
        }
    }

    async handleSubscription(event) {
        event.preventDefault();
        
        const emailInput = document.getElementById('newsletterEmail');
        const email = emailInput.value.trim();
        const submitBtn = event.target.querySelector('.newsletter-btn');
        
        if (!this.validateEmail(email)) {
            this.showMessage('Please enter a valid email address', 'error');
            return;
        }

        if (this.isAlreadySubscribed(email)) {
            this.showMessage('You\'re already subscribed! Check your inbox for updates.', 'info');
            return;
        }

        // Show loading state
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;

        try {
            // Store subscription locally
            this.addSubscriber(email);
            
            // Track subscription in analytics
            this.trackSubscription(email);
            
            // Show success message
            this.showMessage('🎉 Successfully subscribed! Welcome to the community.', 'success');
            
            // Clear form
            emailInput.value = '';
            
            // Optional: Send to external service (e.g., Mailchimp, ConvertKit)
            await this.sendToEmailService(email);
            
        } catch (error) {
            console.error('Subscription error:', error);
            this.showMessage('Oops! Something went wrong. Please try again.', 'error');
        } finally {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isAlreadySubscribed(email) {
        return this.subscribers.some(sub => sub.email.toLowerCase() === email.toLowerCase());
    }

    addSubscriber(email) {
        const subscriber = {
            email: email.toLowerCase(),
            subscribedAt: new Date().toISOString(),
            source: 'website',
            interests: ['supplements', 'sauna', 'longevity'],
            active: true
        };

        this.subscribers.push(subscriber);
        this.saveSubscribers();
        
        return subscriber;
    }

    getStoredSubscribers() {
        try {
            const stored = localStorage.getItem('newsletter_subscribers');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading subscribers:', error);
            return [];
        }
    }

    saveSubscribers() {
        try {
            localStorage.setItem('newsletter_subscribers', JSON.stringify(this.subscribers));
        } catch (error) {
            console.error('Error saving subscribers:', error);
        }
    }

    trackSubscription(email) {
        // Google Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'newsletter_signup', {
                'event_category': 'engagement',
                'event_label': 'email_subscription',
                'value': 1
            });
        }

        // Track in database if available
        if (window.rhondaDBUI?.db) {
            window.rhondaDBUI.db.addUserNote(`Newsletter subscription: ${email}`);
        }
    }

    async sendToEmailService(email) {
        // Example integration with popular email services
        // Replace with your actual service configuration
        
        // For Mailchimp API
        /*
        const response = await fetch('/api/newsletter/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                source: 'rhonda_patrick_website'
            })
        });
        */

        // For now, just log (replace with your service)
        console.log('Newsletter subscription:', email);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    showMessage(message, type = 'info') {
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `newsletter-message newsletter-${type}`;
        messageEl.textContent = message;

        // Find form and insert message
        const form = document.getElementById('newsletterForm');
        if (form) {
            // Remove existing messages
            const existingMessage = form.querySelector('.newsletter-message');
            if (existingMessage) {
                existingMessage.remove();
            }

            // Add new message
            form.appendChild(messageEl);

            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.remove();
                }
            }, 5000);
        }
    }

    // Admin methods for managing subscribers
    getSubscriberCount() {
        return this.subscribers.filter(sub => sub.active).length;
    }

    getSubscribers() {
        return this.subscribers.filter(sub => sub.active);
    }

    unsubscribe(email) {
        const subscriber = this.subscribers.find(sub => sub.email === email.toLowerCase());
        if (subscriber) {
            subscriber.active = false;
            subscriber.unsubscribedAt = new Date().toISOString();
            this.saveSubscribers();
            return true;
        }
        return false;
    }

    exportSubscribers() {
        const activeSubscribers = this.getSubscribers();
        const csvContent = [
            'Email,Subscribed Date,Source',
            ...activeSubscribers.map(sub => 
                `${sub.email},${sub.subscribedAt},${sub.source}`
            )
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Newsletter integration with existing analytics
class NewsletterAnalytics {
    constructor(newsletterManager) {
        this.newsletter = newsletterManager;
        this.addNewsletterStatsToAnalytics();
    }

    addNewsletterStatsToAnalytics() {
        // Add newsletter stats to analytics dashboard
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                this.injectNewsletterStats();
            }, 2000);
        });
    }

    injectNewsletterStats() {
        const analyticsTab = document.querySelector('#analytics-tab .summary-cards');
        if (analyticsTab) {
            const newsletterCard = document.createElement('div');
            newsletterCard.className = 'summary-card';
            newsletterCard.innerHTML = `
                <div class="summary-number">${this.newsletter.getSubscriberCount()}</div>
                <div class="summary-label">Newsletter Subscribers</div>
            `;
            analyticsTab.appendChild(newsletterCard);
        }
    }
}

// Initialize newsletter functionality
const newsletterManager = new NewsletterManager();

// Initialize newsletter analytics integration
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (window.wellnessAnalytics) {
            new NewsletterAnalytics(newsletterManager);
        }
    }, 3000);
});

// Export for global access
window.newsletterManager = newsletterManager;