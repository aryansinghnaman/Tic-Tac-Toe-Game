let scoreX = 0, scoreO = 0, scoreDraw = 0;
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const scoreXDisplay = document.getElementById("scoreX");
const scoreODisplay = document.getElementById("scoreO");
const scoreDrawDisplay = document.getElementById("scoreDraw");
const statusDisplay = document.getElementById("status");
const cells = document.querySelectorAll(".cell");

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Add click listeners to all cells
cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
  cell.addEventListener("mousedown", () => {
    cell.classList.add("clicked");
  });
  cell.addEventListener("animationend", () => {
    cell.classList.remove("clicked");
  });
});

statusDisplay.textContent = `Player ${currentPlayer}'s turn`;

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute("data-index");

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    statusDisplay.textContent = `${currentPlayer} wins! 🎉`;
    highlightWinningCells(winner.combo);
    gameActive = false;

    if (currentPlayer === "X") {
      scoreX++;
      scoreXDisplay.textContent = scoreX;
    } else {
      scoreO++;
      scoreODisplay.textContent = scoreO;
    }
  } else if (!board.includes("")) {
    statusDisplay.textContent = "It's a draw!";
    scoreDraw++;
    scoreDrawDisplay.textContent = scoreDraw;
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], combo: condition };
    }
  }
  return null;
}

function highlightWinningCells(combo) {
  combo.forEach(index => {
    cells[index].classList.add("win");
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusDisplay.textContent = "Player X's turn";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("win");
  });
}
