# Plan.md: Romantic Gesture Web Application

## 1. Project Overview

This document outlines the architectural and implementation strategy for a multi-stage romantic gesture web application. The goal is to create a heartfelt, interactive, and beautifully designed browser-based experience.

## 2. Technology Stack

- **Framework:** Vanilla JavaScript. Given the single-page, multi-stage nature of the application, a full framework like React would add unnecessary complexity and overhead. Vanilla JS provides the required control over the DOM, state, and animations while keeping the project lightweight and fast.
- **Styling:** Tailwind CSS. A utility-first CSS framework will enable rapid and consistent styling, ensuring a modern, clean, and responsive design. The JIT (Just-In-Time) compiler will keep the final CSS bundle small.
- **Animations:** A combination of CSS Transitions and `canvas-confetti`.
    - **CSS Transitions:** For all UI animations like fades, shakes, card flips, and button movements. This is the most performant approach for simple state changes.
    - **Canvas Confetti:** For the final celebration stage, providing a delightful and customizable fireworks/confetti effect.
- **Hosting & Deployment:** Firebase Hosting via the Firebase CLI. This provides a simple, reliable, and fast hosting solution with a global CDN.

## 3. Design Philosophy

- **Aesthetic:** Modern, clean, and emotionally warm. The UI will be minimal to keep the focus on the interactions and messages.
- **Color Palette:**
    - **Primary:** Blush Pink (`#FFB6C1`)
    - **Accent:** Rose Gold (`#B76E79`)
    - **Background:** Cream (`#FFF5EE`)
    - **Text:** A dark, warm grey for readability.
- **Typography:**
    - **Headings:** `Playfair Display` (an elegant serif font).
    - **Body/UI:** `Montserrat` (a clean and modern sans-serif font).
    - These will be imported from Google Fonts.
- **Interactions:** All animations and transitions will be smooth and gentle, designed to feel playful and heartwarming.

## 4. Project Structure

The project will follow a standard and clean structure for a static web application.

```
/
├── public/
│   ├── index.html         # Main HTML file with containers for all stages
│   ├── css/
│   │   └── styles.css     # Main stylesheet (to be processed by Tailwind)
│   ├── js/
│   │   ├── app.js         # Main application logic, state management
│   │   ├── stages.js      # Logic specific to each stage
│   │   └── animations.js  # Animation-specific functions (e.g., "no" button)
│   └── assets/
│       └── images/        # Placeholder images for the memory game
│
├── Plan.md                # This file
├── firebase.json          # Firebase hosting configuration
├── .firebaserc            # Firebase project configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── package.json           # Project dependencies (Tailwind, Firebase CLI)
```

## 5. Implementation Strategy

The development will be broken down into distinct stages, matching the user experience flow.

### Stage 1: Verification Page
- A simple form with one input and a button.
- Validation logic will be case-insensitive.
- An incorrect answer will trigger a CSS shake animation on the input container.
- A correct answer will trigger a fade-out of Stage 1 and a fade-in of Stage 2.

### Stage 2: Memory Card Game
- **Heart Grid:** The heart shape will be defined by a 2D boolean array. JavaScript will dynamically generate the card elements and apply CSS Grid classes to position them correctly. This ensures the heart shape is maintained on different screen sizes.
- **Card Flip:** A 3D CSS transform will be used for the flip effect. The card's state (flipped, matched) will be managed in `app.js`.
- **Game Logic:** The game state (flipped cards, score) will be tracked. A `setTimeout` will be used to flip non-matching cards back after a short delay.
- **Images:** Royalty-free romantic placeholder images (e.g., from Unsplash, Pexels) will be used initially.

### Stage 3: The "Ask"
- This stage is revealed with a multi-step fade-in animation sequence controlled by JavaScript `setTimeout` or Promises.
- **"No" Button:** The button's movement will be handled on `mouseenter` (desktop) and `touchstart` (mobile). A function in `animations.js` will calculate a random position within the viewport and move the button using a smooth CSS `transform` transition.

### Stage 4: Celebration
- On "Yes" click, the `canvas-confetti` library will be triggered to create a full-screen celebration effect.
- The final "Thank you" message will be displayed prominently.

## 6. Firebase Deployment

1.  **Setup:** A new Firebase project will be created. `firebase-tools` will be installed as a dev dependency.
2.  **Configuration:**
    - `.firebaserc` will be configured to link the local directory to the Firebase project.
    - `firebase.json` will be set up to define `public` as the hosting directory and configure appropriate cache headers for assets.
3.  **Deployment:** The `firebase deploy` command will be used to publish the application. Deployment instructions will be included in the `README.md`.

## 7. Development Priorities
- **Mobile-First:** Styles and interactions will be designed for mobile first, then adapted for larger screens using Tailwind's responsive prefixes.
- **Performance:** Images will be optimized, and the code will be kept clean and efficient to ensure fast loading times.
- **Accessibility:** Basic ARIA roles and keyboard navigation (e.g., for the verification input and buttons) will be considered. The "No" button is intentionally inaccessible by design, but the "Yes" button will be fully accessible.
