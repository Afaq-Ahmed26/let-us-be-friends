let initialNoButtonPosition = null;

function moveNoButton() {
    const noButton = document.getElementById('no-button');
    if (!noButton) return;

    // Store the initial position when first called if not already stored
    if (!initialNoButtonPosition) {
        initialNoButtonPosition = {
            position: noButton.style.position,
            left: noButton.style.left,
            top: noButton.style.top
        };
    }
    
    // Change to fixed positioning to move freely across the viewport
    noButton.style.position = 'fixed';
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;
    const margin = 20;

    // Calculate maximum available space for movement, respecting margin
    const maxX = viewportWidth - buttonWidth - (margin * 2);
    const maxY = viewportHeight - buttonHeight - (margin * 2);

    // Ensure button stays within viewport with minimum 20px margin
    const randomX = Math.floor(Math.random() * maxX) + margin;
    const randomY = Math.floor(Math.random() * maxY) + margin;

    // Apply smooth transition
    noButton.style.transition = 'all 0.3s ease';
    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;
    
    // Ensure it stays on top of other elements
    noButton.style.zIndex = '9999';
}

document.addEventListener('DOMContentLoaded', () => {
    const noButton = document.getElementById('no-button');
    if (noButton) {
        // Store the initial position when the page loads
        initialNoButtonPosition = {
            position: noButton.style.position || 'relative',
            left: noButton.style.left || '',
            top: noButton.style.top || ''
        };
        
        // Add event listeners for different interaction types
        noButton.addEventListener('mouseenter', (e) => {
            e.preventDefault();
            moveNoButton();
        });
        
        noButton.addEventListener('mouseover', (e) => {
            e.preventDefault();
            moveNoButton();
        });
        
        noButton.addEventListener('focus', (e) => {
            e.preventDefault();
            moveNoButton();
        });
        
        noButton.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevent default touch behavior
            moveNoButton();
        }, { passive: false }); // passive: false to allow preventDefault
        
        // Extra safety: Also move on click attempt
        noButton.addEventListener('click', (e) => {
            e.preventDefault();
            moveNoButton();
        });
        
        // Add extra event listeners for better responsiveness
        noButton.addEventListener('mousedown', (e) => {
            e.preventDefault();
            moveNoButton();
        });
        
        noButton.addEventListener('pointerover', (e) => {
            e.preventDefault();
            moveNoButton();
        });
    }
});
