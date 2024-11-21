// script.js

const rows = [1, 3, 5, 7, 9]; // Row labels
let numPlayers = prompt("Enter number of players:");
numPlayers = parseInt(numPlayers);
const grid = document.getElementById("grid");
const diceResult = document.getElementById("dice-value");
const turnIndicator = document.getElementById("current-player");
let currentPlayer = 1;

// Generate the grid dynamically based on players
function createGrid() {
  grid.style.gridTemplateColumns = `repeat(${numPlayers}, 1fr)`;

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < numPlayers; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = rows[i];
      cell.dataset.col = j + 1;
      grid.appendChild(cell);
    }
  }
}

// Dice roll functionality
function rollDice() {
  return Math.floor(Math.random() * rows.length) + 1;
}

// Add an icon to the cell based on repetition
function updateCell(row, col) {
  const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
  let content = cell.dataset.content || "";

  switch (content) {
    case "":
      cell.classList.add("player-head");
      cell.dataset.content = "head";
      break;
    case "head":
      cell.classList.add("player-body");
      cell.dataset.content = "body";
      break;
    case "body":
      cell.classList.add("player-limbs");
      cell.dataset.content = "limbs";
      break;
    case "limbs":
      cell.classList.add("player-gun");
      cell.dataset.content = "gun";
      break;
    case "gun":
      cell.classList.add("player-bullets");
      cell.dataset.content = "bullets";
      break;
    case "bullets":
      clearAnotherPlayer(col); // Clear another player's column
      break;
  }
}

// Clear another player's column
function clearAnotherPlayer(currentCol) {
  const otherCols = Array.from({ length: numPlayers }, (_, i) => i + 1).filter(c => c !== currentCol);
  const targetCol = otherCols[Math.floor(Math.random() * otherCols.length)];

  document.querySelectorAll(`.cell[data-col="${targetCol}"]`).forEach(cell => {
    cell.className = "cell"; // Reset cell classes
    cell.dataset.content = ""; // Reset content
  });

  alert(`Player ${currentPlayer} cleared Player ${targetCol}'s column!`);
}

// Game logic for each turn
function playTurn() {
  const dice = rollDice();
  diceResult.textContent = rows[dice - 1];
  updateCell(rows[dice - 1], currentPlayer);

  // Move to the next player's turn
  currentPlayer = currentPlayer % numPlayers + 1;
  turnIndicator.textContent = currentPlayer;
}

// Event listener for the dice roll button
document.getElementById("roll-dice").addEventListener("click", playTurn);

// Initialize the game
createGrid();
