// MD3 Image Carousel (Adaptive)
class Carousel {
    constructor(element) {
        this.element = element;
        this.viewport = element.querySelector('.md-carousel__viewport');
        this.track = element.querySelector('.md-carousel__track');
        this.slides = Array.from(this.track.querySelectorAll('.md-carousel__slide'));
        this.currentIndex = 0;
        this.totalSlides = this.slides.length;

        this.init();
    }

    init() {
        // Create navigation buttons
        this.createNavigation();

        // Create indicators
        this.createIndicators();

        // Setup event listeners
        this.setupEvents();

        // Initial position
        this.updatePosition();

        // Handle image loading
        this.handleImageLoading();

        // Check if inside lightbox and setup resize observer
        const lightbox = this.element.closest('.md-lightbox');
        if (lightbox) {
            // When lightbox opens, recalculate
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'class') {
                        if (lightbox.classList.contains('active')) {
                            setTimeout(() => this.updatePosition(), 350);
                        }
                    }
                });
            });

            observer.observe(lightbox, { attributes: true });
        }
    }

    createNavigation() {
        // Previous button
        this.prevButton = document.createElement('button');
        this.prevButton.className = 'md-carousel__nav md-carousel__nav--prev';
        this.prevButton.setAttribute('aria-label', 'Previous slide');
        this.prevButton.innerHTML = '<span class="material-symbols-outlined">chevron_left</span>';
        this.element.appendChild(this.prevButton);

        // Next button
        this.nextButton = document.createElement('button');
        this.nextButton.className = 'md-carousel__nav md-carousel__nav--next';
        this.nextButton.setAttribute('aria-label', 'Next slide');
        this.nextButton.innerHTML = '<span class="material-symbols-outlined">chevron_right</span>';
        this.element.appendChild(this.nextButton);
    }

    createIndicators() {
        this.indicatorsContainer = document.createElement('div');
        this.indicatorsContainer.className = 'md-carousel__indicators';

        this.slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = 'md-carousel__indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
            indicator.addEventListener('click', () => this.goToSlide(index));
            this.indicatorsContainer.appendChild(indicator);
        });

        this.element.appendChild(this.indicatorsContainer);
        this.indicators = Array.from(this.indicatorsContainer.querySelectorAll('.md-carousel__indicator'));
    }

    setupEvents() {
        this.prevButton.addEventListener('click', () => this.prev());
        this.nextButton.addEventListener('click', () => this.next());

        // Keyboard navigation
        this.element.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });

            // Touch/swipe support
            let touchStartX = 0;
            let touchEndX = 0;

            this.element.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
            }, { passive: true });

            this.element.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].clientX;
                this.handleSwipe(touchStartX, touchEndX);
            }, { passive: true });

            // Recalculate on window resize
            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => this.updatePosition(), 150);
            });
    }

    handleImageLoading() {
        // When images load, they might change the height
        const images = this.element.querySelectorAll('img');
        images.forEach(img => {
            if (img.complete) {
                // Image already loaded
                this.updatePosition();
            } else {
                img.addEventListener('load', () => {
                    this.updatePosition();
                });
            }
        });
    }

    handleSwipe(startX, endX) {
        const threshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.next();
            } else {
                this.prev();
            }
        }
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.updatePosition();
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        this.updatePosition();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updatePosition();
    }

    updatePosition() {
        // Adjust height first
        this.adjustHeight();

        // Get the actual width of the viewport
        const viewportWidth = this.viewport.offsetWidth;

        // Calculate the offset in pixels
        const offset = -this.currentIndex * viewportWidth;

        // Apply the transform using pixels
        this.track.style.transform = `translateX(${offset}px)`;

        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }

    adjustHeight() {
        const currentSlide = this.slides[this.currentIndex];
        if (currentSlide) {
            // Get the image element (handle both img and picture)
            const img = currentSlide.querySelector('img');

            if (img) {
                // Wait for image to load if not already loaded
                if (img.complete && img.naturalWidth > 0) {
                    this.setViewportHeight(img);
                } else {
                    img.addEventListener('load', () => {
                        this.setViewportHeight(img);
                    }, { once: true });
                }
            }
        }
    }

    setViewportHeight(img) {
        // Get the image's displayed dimensions (after CSS constraints)
        const imgWidth = img.offsetWidth;
        const imgHeight = img.offsetHeight;

        // Set the viewport height to match the image
        // The viewport width is already constrained by max-width in CSS
        this.viewport.style.height = `${imgHeight}px`;

        // Update the track height to match
        this.track.style.height = `${imgHeight}px`;

        // Update all slides to match this height
        this.slides.forEach(slide => {
            slide.style.height = `${imgHeight}px`;
        });
    }
}

// MD3 Lightbox
class Lightbox {
    constructor() {
        this.lightboxes = document.querySelectorAll('.md-lightbox');
        this.carousels = new Map();

        this.init();
    }

    init() {
        // Setup open buttons
        document.querySelectorAll('[data-open-lightbox]').forEach(button => {
            button.addEventListener('click', (e) => {
                const lightboxId = button.getAttribute('data-open-lightbox');
                this.open(lightboxId);
            });
        });

        // Setup lightboxes
        this.lightboxes.forEach(lightbox => {
            const id = lightbox.getAttribute('data-lightbox');
            const carouselElement = lightbox.querySelector('.md-carousel');

            if (carouselElement) {
                this.carousels.set(id, new Carousel(carouselElement));
            }

            // Close button
            const closeButton = lightbox.querySelector('.md-lightbox__close');
            if (closeButton) {
                closeButton.addEventListener('click', () => this.close(id));
            }

            // Click backdrop to close
            const backdrop = lightbox.querySelector('.md-lightbox__backdrop');
            if (backdrop) {
                backdrop.addEventListener('click', () => this.close(id));
            }

            // ESC key to close
            lightbox.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') this.close(id);
            });
        });
    }

    open(id) {
        const lightbox = document.querySelector(`.md-lightbox[data-lightbox="${id}"]`);
        if (lightbox) {
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scroll

            // Focus the close button for accessibility
            const closeButton = lightbox.querySelector('.md-lightbox__close');
            if (closeButton) closeButton.focus();

            // Recalculate carousel position after lightbox opens
            setTimeout(() => {
                const carousel = this.carousels.get(id);
                if (carousel) {
                    carousel.updatePosition();
                }
            }, 350); // Wait for animation to complete
        }
    }

    close(id) {
        const lightbox = document.querySelector(`.md-lightbox[data-lightbox="${id}"]`);
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Restore scroll
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize inline carousels
    document.querySelectorAll('.md-carousel:not(.md-lightbox .md-carousel)').forEach(carousel => {
        new Carousel(carousel);
    });

    // Initialize lightbox
    new Lightbox();
});
