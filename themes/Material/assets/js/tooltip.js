// MD3 Tooltip System
class Tooltip {
    constructor() {
        this.tooltip = null;
        this.currentTarget = null;
        this.showDelay = 300; // MD3 standard delay
        this.hideDelay = 0;
        this.showTimer = null;
        this.hideTimer = null;

        this.init();
    }

    init() {
        // Create the tooltip element (reused for all tooltips)
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'md-tooltip';
        this.tooltip.setAttribute('role', 'tooltip');
        document.body.appendChild(this.tooltip);

        // Setup event listeners for all elements with data-tooltip
        this.setupTooltips();

        // Re-setup on dynamic content changes
        const observer = new MutationObserver(() => this.setupTooltips());
        observer.observe(document.body, { childList: true, subtree: true });
    }

    setupTooltips() {
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            // Skip if already setup
            if (element.dataset.tooltipSetup) return;
            element.dataset.tooltipSetup = 'true';

            // Mouse events
            element.addEventListener('mouseenter', () => this.show(element));
            element.addEventListener('mouseleave', () => this.hide());

            // Focus events (for accessibility)
            element.addEventListener('focus', () => this.show(element));
            element.addEventListener('blur', () => this.hide());

            // Touch events (for mobile)
            element.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.show(element);
                setTimeout(() => this.hide(), 2000);
            }, { passive: false });
        });
    }

    show(target) {
        clearTimeout(this.hideTimer);

        this.showTimer = setTimeout(() => {
            this.currentTarget = target;

            // Get tooltip content
            const content = target.dataset.tooltip;
            const placement = target.dataset.tooltipPlacement || 'top';
            const rich = target.dataset.tooltipRich === 'true';
            const icon = target.dataset.tooltipIcon;
            const title = target.dataset.tooltipTitle;

            // Build tooltip HTML
            if (rich) {
                this.tooltip.innerHTML = `
                <div class="md-tooltip__content md-tooltip__content--rich">
                ${icon ? `
                    <div class="md-tooltip__icon">
                    <span class="material-symbols-outlined">${icon}</span>
                    ${title ? `<span class="md-tooltip__title">${title}</span>` : ''}
                    </div>
                    ` : ''}
                    ${!icon && title ? `<div class="md-tooltip__title">${title}</div>` : ''}
                    <div class="md-tooltip__body">${content}</div>
                    </div>
                    <div class="md-tooltip__arrow"></div>
                    `;
            } else {
                this.tooltip.innerHTML = `
                <div class="md-tooltip__content">${content}</div>
                <div class="md-tooltip__arrow"></div>
                `;
            }

            this.tooltip.dataset.placement = placement;

            // Position the tooltip
            this.position(target, placement);

            // Show it
            this.tooltip.classList.add('active');
        }, this.showDelay);
    }

    hide() {
        clearTimeout(this.showTimer);

        this.hideTimer = setTimeout(() => {
            this.tooltip.classList.remove('active');
            this.currentTarget = null;
        }, this.hideDelay);
    }

    position(target, placement) {
        const targetRect = target.getBoundingClientRect();
        const tooltipRect = this.tooltip.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        let top, left;

        switch (placement) {
            case 'top':
                top = targetRect.top + scrollTop - tooltipRect.height - 8;
                left = targetRect.left + scrollLeft + (targetRect.width / 2) - (tooltipRect.width / 2);
                break;

            case 'bottom':
                top = targetRect.bottom + scrollTop + 8;
                left = targetRect.left + scrollLeft + (targetRect.width / 2) - (tooltipRect.width / 2);
                break;

            case 'left':
                top = targetRect.top + scrollTop + (targetRect.height / 2) - (tooltipRect.height / 2);
                left = targetRect.left + scrollLeft - tooltipRect.width - 8;
                break;

            case 'right':
                top = targetRect.top + scrollTop + (targetRect.height / 2) - (tooltipRect.height / 2);
                left = targetRect.right + scrollLeft + 8;
                break;
        }

        // Prevent going off-screen
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (left < 8) left = 8;
        if (left + tooltipRect.width > viewportWidth - 8) {
            left = viewportWidth - tooltipRect.width - 8;
        }

        if (top < scrollTop + 8) {
            // Flip to bottom if too close to top
            top = targetRect.bottom + scrollTop + 8;
            this.tooltip.dataset.placement = 'bottom';
        }

        if (top + tooltipRect.height > scrollTop + viewportHeight - 8) {
            // Flip to top if too close to bottom
            top = targetRect.top + scrollTop - tooltipRect.height - 8;
            this.tooltip.dataset.placement = 'top';
        }

        this.tooltip.style.top = `${top}px`;
        this.tooltip.style.left = `${left}px`;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Tooltip();
});
