// Select necessary DOM elements
const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');

// Game variables
let currentPlayer = 'X';
let gameGrid = ["", "", "", "", "", "", "", "", ""];
let isGameOver = false;

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initialize the game board
function initGame() {
    boxes.forEach((box, index) => {
        box.textContent = ""; // Clear the box
        box.classList.remove('win'); // Remove winning highlights
        box.addEventListener('click', () => handleBoxClick(index), { once: true }); // Add click event
    });
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = 'X';
    isGameOver = false;
    gameInfo.textContent = `Current Player: ${currentPlayer}`;
}

// Handle a box click
function handleBoxClick(index) {
    if (isGameOver || gameGrid[index] !== "") return; // Skip if box already filled or game over

    // Update grid and UI
    gameGrid[index] = currentPlayer;
    boxes[index].textContent = currentPlayer;

    // Check for a winner or draw
    checkGameStatus();

    // Switch players if the game is still ongoing
    if (!isGameOver) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameInfo.textContent = `Current Player: ${currentPlayer}`;
    }
}

// Check the game's status: win, draw, or ongoing
function checkGameStatus() {
    let winner = null;

    // Check for a winning combination
    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (gameGrid[a] && gameGrid[a] === gameGrid[b] && gameGrid[b] === gameGrid[c]) {
            winner = gameGrid[a];
            boxes[a].classList.add('win');
            boxes[b].classList.add('win');
            boxes[c].classList.add('win');
        }
    });

    if (winner) {
        gameInfo.textContent = `Winner: ${winner}`;
        isGameOver = true;
        return;
    }

    // Check for a draw
    if (gameGrid.every(cell => cell !== "")) {
        gameInfo.textContent = `It's a Draw!`;
        isGameOver = true;
    }
}

// Reset the game when "New Game" button is clicked
newGameBtn.addEventListener('click', initGame);

// Start the game initially
initGame();
