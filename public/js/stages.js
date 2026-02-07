const CORRECT_PHONE_ANSWER = "03001234567"; // Your phone number
const CORRECT_DISH_ANSWER = "pizza"; // Example: The predefined correct favorite dish (case-insensitive)

document.addEventListener('DOMContentLoaded', () => {
    // Stage 1 Elements
    const stage1 = document.getElementById('stage-1');
    const submitButton1 = document.getElementById('submit-answer-1');
    const phoneNumberInput = document.getElementById('phone-number-input');
    const errorMessage1 = document.getElementById('error-message-1');

    // Stage 2 Verification Elements
    const stage2Verification = document.getElementById('stage-2-verification');
    const submitButton2 = document.getElementById('submit-answer-2');
    const favoriteDishInput = document.getElementById('favorite-dish-input');
    const errorMessage2 = document.getElementById('error-message-2');

    // Stage 3 Game Elements (formerly stage-2)
    const stage3Game = document.getElementById('stage-3-game');
    const gameBoard = document.getElementById('game-board');

    // Stage 4 Ask Elements (formerly stage-3)
    const stage4Ask = document.getElementById('stage-4-ask');
    const congratsMsg = document.getElementById('congrats-msg');
    const waitMsg = document.getElementById('wait-msg');
    const theAsk = document.getElementById('the-ask');
    const yesButton = document.getElementById('yes-button');

    // Stage 5 Celebration Elements (formerly stage-4)
    const stage5Celebration = document.getElementById('stage-5-celebration');

    // Function to normalize phone number input (remove non-digits)
    function normalizePhoneNumber(number) {
        return number.replace(/\D/g, ''); // Removes all non-digit characters
    }

    // --- STAGE 1: PHONE NUMBER VERIFICATION ---
    if (submitButton1) {
        submitButton1.addEventListener('click', () => {
            const userAnswer = normalizePhoneNumber(phoneNumberInput.value.trim());

            if (userAnswer === CORRECT_PHONE_ANSWER) {
                // Correct answer, transition to Stage 2 Verification
                console.log("Correct phone number!");
                stage1.classList.add('hidden');
                errorMessage1.classList.add('hidden');
                stage2Verification.classList.remove('hidden'); // Show Stage 2 Verification
            } else {
                // Incorrect answer, shake the card and show error message
                console.log("Incorrect phone number!");
                stage1.classList.add('shake');
                errorMessage1.textContent = "Arre nahi yaar… that's not your number 😅";
                errorMessage1.classList.remove('hidden');
                setTimeout(() => {
                    stage1.classList.remove('shake');
                }, 500);
            }
        });
    }

    // --- STAGE 2: FAVORITE DISH VERIFICATION ---
    if (submitButton2) {
        submitButton2.addEventListener('click', () => {
            const userAnswer = favoriteDishInput.value.trim().toLowerCase();

            if (userAnswer === CORRECT_DISH_ANSWER) {
                // Correct answer, transition to Stage 3 Game
                console.log("Correct favorite dish!");
                stage2Verification.classList.add('hidden');
                errorMessage2.classList.add('hidden');
                stage3Game.classList.remove('hidden'); // Show Stage 3 Game
                createBoard(); // Initialize the game board
            } else {
                // Incorrect answer, shake the card and show error message
                console.log("Incorrect favorite dish!");
                stage2Verification.classList.add('shake');
                errorMessage2.textContent = "Oops! Arey itna bhi bhool gaya kya? 😳";
                errorMessage2.classList.remove('hidden');
                setTimeout(() => {
                    stage2Verification.classList.remove('shake');
                }, 500);
            }
        });
    }

    // --- STAGE 3: MEMORY CARD GAME ---
    const images = [
        'https://images.pexels.com/photos/1024984/pexels-photo-1024984.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/1467923/pexels-photo-1467923.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/2055236/pexels-photo-2055236.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/3368816/pexels-photo-3368816.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/247929/pexels-photo-247929.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/1054366/pexels-photo-1054366.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/1031264/pexels-photo-1031264.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/931018/pexels-photo-931018.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/950069/pexels-photo-950069.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/1036357/pexels-photo-1036357.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/1367098/pexels-photo-1367098.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/157675/pexels-photo-157675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/1000445/pexels-photo-1000445.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/935967/pexels-photo-935967.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'https://images.pexels.com/photos/1036808/pexels-photo-1036808.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    ]; // 18 unique images for 36 cards

    const cardImages = [...images, ...images]; // Duplicate images for pairs
    cardImages.sort(() => 0.5 - Math.random()); // Shuffle the cards

    // Final heart layout with exactly 36 cards (18 pairs) - Following your pattern as closely as possible in a 9x4 grid (since your pattern sums to 35, we'll add 1)
    const heartLayout = [
        [0, 0, 1, 1, 0, 1, 1, 0, 0], // 4 cards - Row 1: 001101100
        [0, 1, 1, 1, 1, 1, 1, 1, 0], // 7 cards - Row 2: 011111110
        [1, 1, 1, 1, 1, 1, 1, 1, 1], // 9 cards - Row 3: 111111111 (adding one to make 9)
        [0, 1, 1, 1, 1, 1, 1, 1, 0], // 7 cards - Row 4: 011111110
        [0, 0, 1, 1, 1, 1, 1, 0, 0], // 5 cards - Row 5: 001111100
        [0, 0, 0, 1, 1, 1, 0, 0, 0], // 3 cards - Row 6: 000111000
        [0, 0, 0, 0, 1, 0, 0, 0, 0], // 1 card - Row 7: 000010000
    ]; // Total: 36 cards (18 pairs)

    let flippedCards = [];
    let matchedPairs = 0;
    let lockBoard = false; // To prevent clicking more than two cards

    function createBoard() {
        gameBoard.innerHTML = '';
        gameBoard.classList.add('justify-center', 'items-center'); // Center the grid
        // gameBoard.style.gridTemplateColumns = `repeat(${heartLayout[0].length}, 1fr)`; // Removed this
        // Set the gap using CSS property, will be applied via CSS instead of inline JS
        gameBoard.style.setProperty('gap', '2px'); // Set 2px gap as requested
        gameBoard.style.display = 'grid'; // Ensure display is grid

        // Dynamically set grid columns based on card size defined in CSS
        // This makes sure the grid columns match the actual card sizes more accurately
        const cardSize = getComputedStyle(document.documentElement).getPropertyValue('--card-size');
        gameBoard.style.gridTemplateColumns = `repeat(${heartLayout[0].length}, var(--card-size))`;

        gameBoard.style.width = 'fit-content'; // Adjust width to fit content, including gaps
        gameBoard.style.height = 'auto'; // Allow height to adjust based on content
        gameBoard.style.margin = '0 auto';
        gameBoard.style.padding = '0'; // Remove padding here, let gap handle spacing
        gameBoard.style.boxSizing = 'content-box'; // Ensure box model is content-box

        let cardIndex = 0;
        heartLayout.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                if (cell === 1) {
                    const card = document.createElement('div');
                    card.classList.add('flip-card', 'cursor-pointer', 'relative'); // No specific w/h classes here, let CSS handle it

                    // Store original index for image assignment
                    card.dataset.originalIndex = cardIndex;

                    card.innerHTML = `
                        <div class="flip-card-inner">
                            <div class="flip-card-front bg-gradient-to-br from-[#A1C8F5] to-[#7BB3F0] flex items-center justify-center rounded-sm border border-white border-opacity-20"> <!-- Thin border -->
                                <span class="text-xl">❓</span>
                            </div>
                            <div class="flip-card-back border border-white border-opacity-20"> <!-- Thin border -->
                                <img src="${cardImages[cardIndex]}" class="w-full h-full object-cover rounded-sm">
                            </div>
                        </div>
                    `;
                    gameBoard.appendChild(card);
                    cardIndex++;
                } else {
                    const emptyCell = document.createElement('div');
                    emptyCell.classList.add('empty-grid-cell'); // Add a class for empty cells
                    gameBoard.appendChild(emptyCell);
                }
            });
        });

    }

    if (gameBoard) {
        gameBoard.addEventListener('click', (e) => {
            const clickedCard = e.target.closest('.flip-card');
            // Prevent flipping if board is locked, card is already flipped, or already matched
            if (!clickedCard || lockBoard || clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) {
                return;
            }

            clickedCard.classList.add('flipped');
            flippedCards.push(clickedCard);

            if (flippedCards.length === 2) {
                lockBoard = true; // Lock the board to prevent further clicks
                const [card1, card2] = flippedCards;
                const img1 = card1.querySelector('.flip-card-back img').src;
                const img2 = card2.querySelector('.flip-card-back img').src;

                if (img1 === img2) {
                    // Match
                    matchedPairs++;
                    card1.classList.add('matched');
                    card2.classList.add('matched');
                    resetBoard(); // Reset for next turn
                    if (matchedPairs === images.length) { // images.length is 18 (number of pairs)
                        setTimeout(() => {
                            stage3Game.classList.add('hidden');
                            // Show the congratulations screen first
                            document.getElementById('stage-3-complete').classList.remove('hidden');
                            // Then transition to Stage 4 after a short delay
                            setTimeout(() => {
                                document.getElementById('stage-3-complete').classList.add('hidden');
                                showStage4Ask();
                            }, 2000); // 2 seconds to view the congratulations message
                        }, 1500); // 1.5s delay before showing congratulations
                    }
                } else {
                    // No match, flip back after a delay
                    setTimeout(() => {
                        card1.classList.remove('flipped');
                        card2.classList.remove('flipped');
                        resetBoard();
                    }, 1000); // 1 second delay to see the cards
                }
            }
        });
    }

    function resetBoard() {
        [flippedCards, lockBoard] = [[], false]; // Reset flipped cards and unlock board
    }

    // --- STAGE 4: THE ASK --- (formerly stage-3)
    // Remove individual message elements as they are now part of the modal
    // const congratsMsg = document.getElementById('congrats-msg'); // No longer needed
    // const waitMsg = document.getElementById('wait-msg'); // No longer needed
    // const theAsk = document.getElementById('the-ask'); // No longer needed

    function showStage4Ask() {
        // Blur/dim the background heart grid
        stage3Game.classList.add('blurred-background'); // Add this class for styling
        stage4Ask.classList.remove('hidden'); // Show the modal
        
        // Reset the "No" button to its initial position and ensure it's properly positioned
        const noButton = document.getElementById('no-button');
        if (noButton) {
            // Initially position the "No" button in a default position
            // The exact initial position will be overridden by the animations.js when hovered
            noButton.style.position = 'relative'; // Start with relative positioning
            noButton.style.left = ''; // Clear any previous left positioning
            noButton.style.top = ''; // Clear any previous top positioning
            noButton.style.transform = ''; // Clear any transforms
        }
        
        // Add a subtle pulse animation to the "Yes" button to draw attention
        const yesButton = document.getElementById('yes-button');
        if (yesButton) {
            yesButton.classList.add('animate-pulse');
            // Remove the pulse after a few seconds to avoid distraction
            setTimeout(() => {
                yesButton.classList.remove('animate-pulse');
            }, 5000);
        }
    }

    if (yesButton) {
        yesButton.addEventListener('click', () => {
            stage4Ask.classList.add('hidden'); // Hide the modal
            stage3Game.classList.remove('blurred-background'); // Remove blur from background
            setTimeout(() => {
                showStage5Celebration();
            }, 500); // 0.5s delay before transitioning to celebration
        });
    }

    // --- STAGE 5: CELEBRATION --- (formerly stage-4)
    const stage5CelebrationMessage = stage5Celebration.querySelector('h1'); // Get the message element

    function launchCelebrationFireworks() {
        const duration = 15 * 1000; // 15 seconds of continuous fireworks
        const animationEnd = Date.now() + duration;
        
        const colors = ['#FFB6C1', '#FF69B4', '#FFD700', '#9370DB', '#FF1493', '#FFC0CB'];
        
        (function frame() {
            // Launch from left side
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.8 },
                colors: colors
            });
            
            // Launch from right side
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.8 },
                colors: colors
            });
            
            // Random center bursts
            if (Math.random() < 0.3) {
                confetti({
                    particleCount: 50,
                    spread: 360,
                    origin: { 
                        x: Math.random(), 
                        y: Math.random() * 0.5 
                    },
                    colors: colors
                });
            }

            if (Date.now() < animationEnd) {
                requestAnimationFrame(frame);
            }
        }());
    }

    function showStage5Celebration() {
        stage5Celebration.classList.remove('hidden');
        stage5CelebrationMessage.style.opacity = '0'; // Start invisible for fade-in
        setTimeout(() => {
            stage5CelebrationMessage.style.transition = 'opacity 1s ease-in';
            stage5CelebrationMessage.style.opacity = '1';
        }, 100); // Small delay to ensure transition applies

        launchCelebrationFireworks(); // Trigger the fireworks
    }
});
