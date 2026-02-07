console.log("App is running!");

// Debug mode: Add a button to skip to any stage for testing
document.addEventListener('DOMContentLoaded', () => {
    // Create a floating debug panel
    const debugPanel = document.createElement('div');
    debugPanel.id = 'debug-panel';
    debugPanel.innerHTML = `
        <div style="
            position: fixed; 
            top: 20px; 
            right: 20px; 
            z-index: 10000; 
            background: rgba(0, 0, 0, 0.8); 
            color: white; 
            padding: 15px; 
            border-radius: 10px; 
            font-family: Arial, sans-serif; 
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        ">
            <div style="margin-bottom: 10px; font-weight: bold; color: #FF69B4;">DEBUG MODE</div>
            <button id="skip-to-stage-2" style="
                background: #4CAF50; 
                color: white; 
                border: none; 
                padding: 5px 10px; 
                margin: 2px; 
                border-radius: 4px; 
                cursor: pointer;
                font-size: 12px;
            ">Stage 2</button>
            <button id="skip-to-stage-3" style="
                background: #2196F3; 
                color: white; 
                border: none; 
                padding: 5px 10px; 
                margin: 2px; 
                border-radius: 4px; 
                cursor: pointer;
                font-size: 12px;
            ">Stage 3</button>
            <button id="skip-to-stage-4" style="
                background: #FF9800; 
                color: white; 
                border: none; 
                padding: 5px 10px; 
                margin: 2px; 
                border-radius: 4px; 
                cursor: pointer;
                font-size: 12px;
            ">Stage 4</button>
            <button id="skip-to-stage-5" style="
                background: #E91E63; 
                color: white; 
                border: none; 
                padding: 5px 10px; 
                margin: 2px; 
                border-radius: 4px; 
                cursor: pointer;
                font-size: 12px;
            ">Stage 5</button>
            <button id="reset-stages" style="
                background: #9E9E9E; 
                color: white; 
                border: none; 
                padding: 5px 10px; 
                margin: 2px; 
                border-radius: 4px; 
                cursor: pointer;
                font-size: 12px;
            ">Reset</button>
        </div>
    `;
    
    document.body.appendChild(debugPanel);
    
    // Add event listeners to debug buttons
    document.getElementById('skip-to-stage-2').addEventListener('click', () => {
        document.getElementById('stage-1').classList.add('hidden');
        document.getElementById('stage-2-verification').classList.remove('hidden');
    });
    
    document.getElementById('skip-to-stage-3').addEventListener('click', () => {
        document.getElementById('stage-1').classList.add('hidden');
        document.getElementById('stage-2-verification').classList.add('hidden');
        document.getElementById('stage-3-game').classList.remove('hidden');
        // Initialize the game board if going directly to stage 3
        if (typeof createBoard === 'function') {
            createBoard();
        }
    });
    
    document.getElementById('skip-to-stage-4').addEventListener('click', () => {
        document.getElementById('stage-1').classList.add('hidden');
        document.getElementById('stage-2-verification').classList.add('hidden');
        document.getElementById('stage-3-game').classList.add('hidden');
        // Show stage 4
        if (typeof showStage4Ask === 'function') {
            showStage4Ask();
        } else {
            // Fallback if function is not accessible
            document.getElementById('stage-4-ask').classList.remove('hidden');
        }
    });
    
    document.getElementById('skip-to-stage-5').addEventListener('click', () => {
        document.getElementById('stage-1').classList.add('hidden');
        document.getElementById('stage-2-verification').classList.add('hidden');
        document.getElementById('stage-3-game').classList.add('hidden');
        document.getElementById('stage-4-ask').classList.add('hidden');
        // Show stage 5
        if (typeof showStage5Celebration === 'function') {
            showStage5Celebration();
        } else {
            // Fallback if function is not accessible
            document.getElementById('stage-5-celebration').classList.remove('hidden');
        }
    });
    
    document.getElementById('reset-stages').addEventListener('click', () => {
        // Show only stage 1, hide all others
        document.getElementById('stage-1').classList.remove('hidden');
        document.getElementById('stage-2-verification').classList.add('hidden');
        document.getElementById('stage-3-game').classList.add('hidden');
        document.getElementById('stage-4-ask').classList.add('hidden');
        document.getElementById('stage-5-celebration').classList.add('hidden');
    });
});
