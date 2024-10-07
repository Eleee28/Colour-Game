document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-button");
    const helpButton = document.getElementById("help-button");
    const gridContainer = document.getElementById("grid-container");
    const colorDisplay = document.getElementById("color-display");
    const timerDisplay = document.getElementById("time-elapsed");
    const timerContainer = document.getElementById("timer");

    let timer;
    let elapsedTime = 0;
    let totalCells = 36; // Total cells in the grid
    let clickedCells = 0; // Count of cells clicked
    let firstCell = null; // Store the first clicked cell
    let secondCell = null; // Store the second clicked cell

    const colors = ["blue", "red", "green", "orange", "purple", "gray"];

    // Start the game
    startButton.addEventListener("click", startGame);

    // Show game rules
    helpButton.addEventListener("click", showHelp);

    function startGame() {
        startButton.style.display = "none"; // Hide the start button
        gridContainer.innerHTML = ""; // Clear previous grid
        clickedCells = 0; // Reset clicked cells
        elapsedTime = 0; // Reset time
        timerDisplay.textContent = elapsedTime; // Reset timer display
        colorDisplay.style.display = "block"; // Show the color display
        timerContainer.style.display = "block"; // Show the timer display
        colorDisplay.textContent = "Click a cell!"; // Set initial text
        helpButton.style.display = "block"; // Show the help button
        startTimer(); // Start the timer
        createGrid(); // Create the grid
    }

    // Function to show game rules
    function showHelp() {
        alert(`Game Rules:
            
            - Click on two different cells with the same color.

            - The game is over when all cells are black.

            - Try to finish the game in the shortest amount of time!`);
    }

    // Create a 6x6 grid with random colors ensuring pairs
    function createGrid() {
        const gridColors = [];
        for (let color of colors) {
            // Each color appears 6 times (3 pairs)
            gridColors.push(color, color, color);
            gridColors.push(color, color, color);
        }

        // Shuffle the grid colors
        for (let i = gridColors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [gridColors[i], gridColors[j]] = [gridColors[j], gridColors[i]];
        }

        // Create the grid of 36 cells
        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement("div");
            const randomColor = gridColors[i]; // Use the shufled color

            cell.classList.add("cell");
            cell.style.backgroundColor = randomColor;

            cell.addEventListener("click", () => handleCellClick(cell, randomColor));
            gridContainer.appendChild(cell);
        }
    }

    // Handle cell click
    function handleCellClick(cell, color) {
        // Ignore clicks on black cells
        if (cell.style.backgroundColor === "black") return;

        if (!firstCell) {
            // Store the first clicked cell
            firstCell = { cell, color };
            colorDisplay.textContent = color; // Update display
            colorDisplay.style.color = color; // Change display text color
        } else {
            // Store the second clicked cell
            secondCell = { cell, color };

            // Check if the colors match
            if (firstCell.cell === secondCell.cell) {
                // If the same cell is clicked twice
                colorDisplay.textContent = "Same cell!";
                colorDisplay.style.color = "black";

                // Reset both cells
                firstCell = null;
                secondCell = null;
            } else if (firstCell.color === secondCell.color) {
                // If the colors match
                // Turn both cells black
                firstCell.cell.style.backgroundColor = "black";
                secondCell.cell.style.backgroundColor = "black";
                clickedCells += 2; // Increment clicked cells

                // Reset first and second cell
                firstCell = null;
                secondCell = null;

                // Check if game is over
                if (clickedCells === totalCells) {
                    gameOver();
                } else {
                    colorDisplay.textContent = "Great! Keep going!";
                    colorDisplay.style.color = "black";
                }
            } else {
                // Colors do not match
                colorDisplay.textContent = "Not a match! Try again";
                colorDisplay.style.color = "black";

                // Reset both cells for the next turn
                firstCell = null;
                secondCell = null;
            }
        }
    }

    // Start the timer
    function startTimer() {
        timer = setInterval(() => {
            elapsedTime++;
            timerDisplay.textContent = elapsedTime; // Update timer display
        }, 1000);
    }

    // End the game
    function gameOver() {
        clearInterval(timer); // Stop the timer
        colorDisplay.style.color = "black"; // Change color to black
        colorDisplay.textContent = "Game Over"; // Display Game Over
        timerContainer.style.display = "none";  // Hide timer
        
        // Use setTimeout to delay the alert and ensure the message in visible
        setTimeout(() => {
            alert(`Total time taken: ${elapsedTime} seconds`); // Alert the total time

            // After the alert, show only start button
            startButton.style.display = "block"; // Show the start button again
            colorDisplay.style.display = "none"; // Hide color display after game over
            gridContainer.innerHTML = "";   // Clear the grid
            helpButton.style.display = "none"; // Hide help button
        }, 100);    // Small delay to allow the message to render
        
    }
});
