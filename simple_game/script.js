document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-button");
    const helpButton = document.getElementById("help-button");
    const gridContainer = document.getElementById("grid-container");
    const colorDisplay = document.getElementById("color-display");
    const timerDisplay = document.getElementById("time-elapsed");
    const timerContainer = document.getElementById("timer");

    let timer;
    let elapsedTime = 0;
    let totalCells = 36;
    let clickedCells = 0;

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
            
            - Click on one cell to view the color.

            - The game is over when all cells are black.

            - Try to finish the game in the shortest amount of time!`);
    }

    // Create a 6x6 grid with random colors
    function createGrid() {
        for (let i = 0; i < 36; i++) {
            const cell = document.createElement("div");
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            cell.classList.add("cell");
            cell.style.backgroundColor = randomColor;

            cell.addEventListener("click", () => handleCellClick(cell, randomColor));
            gridContainer.appendChild(cell);
        }
    }

    // Handle cell click
    function handleCellClick(cell, color) {
        if (cell.style.backgroundColor !== "black") {
            colorDisplay.textContent = color; // Display the color name
            colorDisplay.style.color = color; // Change the text color
            cell.style.backgroundColor = "black"; // Change cell color to black
            clickedCells++; // Increment clicked cells

            if (clickedCells === totalCells) {
                gameOver(); // If all cells are clicked, end the game
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
