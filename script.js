// Simple scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Basic navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = '#1a252f';
    } else {
        navbar.style.background = '#2c3e50';
    }
});

// Simple mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    
    if (window.innerWidth <= 768) {
        const menuBtn = document.createElement('button');
        menuBtn.innerHTML = '☰';
        menuBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            display: none;
        `;
        
        // Show menu button on small screens
        const mediaQuery = window.matchMedia('(max-width: 600px)');
        if (mediaQuery.matches) {
            menuBtn.style.display = 'block';
            navbar.querySelector('.nav-container').appendChild(menuBtn);
            
            menuBtn.addEventListener('click', () => {
                if (nav.style.display === 'none' || nav.style.display === '') {
                    nav.style.display = 'flex';
                    nav.style.flexDirection = 'column';
                    nav.style.position = 'absolute';
                    nav.style.top = '100%';
                    nav.style.left = '0';
                    nav.style.width = '100%';
                    nav.style.background = '#2c3e50';
                    nav.style.padding = '10px';
                } else {
                    nav.style.display = 'none';
                }
            });
        }
    }
});