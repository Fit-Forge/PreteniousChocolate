class PageAnalytics {
    constructor() {
        this.pageViews = {};
        this.loadFromStorage();
        this.trackCurrentPage();
    }

    loadFromStorage() {
        const stored = localStorage.getItem('pretentious_analytics');
        if (stored) {
            this.pageViews = JSON.parse(stored);
        }
    }

    saveToStorage() {
        localStorage.setItem('pretentious_analytics', JSON.stringify(this.pageViews));
    }

    trackCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        
        if (!this.pageViews[page]) {
            this.pageViews[page] = 0;
        }
        this.pageViews[page]++;
        this.saveToStorage();
        
        // Add view counter to page if admin mode is on
        if (localStorage.getItem('admin_mode') === 'true') {
            this.displayViewCount(page);
        }
    }

    displayViewCount(page) {
        const container = document.createElement('div');
        container.className = 'analytics-container';
        container.style.cssText = `
            position: fixed;
            bottom: 10px;
            right: 10px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            z-index: 1000;
        `;

        const counter = document.createElement('div');
        counter.className = 'view-counter';
        counter.innerHTML = `Page Views: ${this.pageViews[page]}`;
        counter.style.cssText = `
            background: rgba(0, 0, 0, 0.8);
            color: #d4af37;
            padding: 10px;
            border: 1px solid #d4af37;
            border-radius: 5px;
            font-family: 'Cormorant Garamond', serif;
        `;

        const dashboardLink = document.createElement('a');
        dashboardLink.href = 'admin.html';
        dashboardLink.innerHTML = 'View Dashboard';
        dashboardLink.style.cssText = `
            background: rgba(0, 0, 0, 0.8);
            color: #d4af37;
            padding: 10px;
            border: 1px solid #d4af37;
            border-radius: 5px;
            font-family: 'Cormorant Garamond', serif;
            text-decoration: none;
            text-align: center;
        `;

        container.appendChild(counter);
        container.appendChild(dashboardLink);
        document.body.appendChild(container);
    }

    getAllStats() {
        return this.pageViews;
    }
}

// Initialize analytics
const analytics = new PageAnalytics();

// Add keyboard shortcut for admin mode (Ctrl + Shift + A)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        const currentMode = localStorage.getItem('admin_mode') === 'true';
        localStorage.setItem('admin_mode', !currentMode);
        location.reload();
    }
}); 