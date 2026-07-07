// Select Elements
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const newGameBtn = document.getElementById("new-game");

const xScoreText = document.getElementById("x-score");
const oScoreText = document.getElementById("o-score");
const drawScoreText = document.getElementById("draw-score");

// Game Variables
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

let xScore = 0;
let oScore = 0;
let drawScore = 0;

// Winning Combinations
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initial Status
statusText.textContent = "Player X's Turn";

// Event Listeners
cells.forEach(cell => {
    cell.addEventListener("click", cellClicked);
});

restartBtn.addEventListener("click", restartGame);

// Handle Cell Click
function cellClicked() {

    const index = this.getAttribute("data-index");

    if (board[index] !== "" || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    this.textContent = currentPlayer;

    checkWinner();

    if (gameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

// Check Winner
function checkWinner() {

    for (let pattern of winPatterns) {

        const [a, b, c] = pattern;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            // Highlight Winning Cells
        cells[a].classList.add("winner");
        cells[b].classList.add("winner");
        cells[c].classList.add("winner");

            cells[a].style.color = "#F5E9E2";
            cells[b].style.color = "#F5E9E2";
            cells[c].style.color = "#F5E9E2";

            // Update Winner
            statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;

            if (currentPlayer === "X") {
                xScore++;
                xScoreText.textContent = xScore;
            } else {
                oScore++;
                oScoreText.textContent = oScore;
            }

            gameActive = false;
            return;
        }
    }

    // Draw
    if (!board.includes("")) {
        statusText.textContent = "🤝 It's a Draw!";
        drawScore++;
        drawScoreText.textContent = drawScore;
        gameActive = false;
    }
}

// Restart Game
function restartGame() {

    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;

    cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winner"); // Remove winning animation
    cell.style.backgroundColor = "#E3B5A4";
    cell.style.color = "#160029";
});
    statusText.textContent = "Player X's Turn";
}
newGameBtn.addEventListener("click", newGame);
function newGame() {

    // Reset Scores
    xScore = 0;
    oScore = 0;
    drawScore = 0;

    xScoreText.textContent = xScore;
    oScoreText.textContent = oScore;
    drawScoreText.textContent = drawScore;

    // Reset Board
    restartGame();

}