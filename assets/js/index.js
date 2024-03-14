import Board from "./board.js";

let board = new Board(); // creates a new game board
let remainingMoves = 20;

console.log(board.grid);

const startGame = document.querySelector("#start-game");
const restartGame = document.querySelector("#restart-game");
const containerGrid = document.querySelector(".grid-container");
const movesLeft = document.querySelector(".moves-left");

// initialize game board
const fillGameBoard = () => {
    movesLeft.classList.remove("hidden");
    containerGrid.style.gridTemplateColumns = `repeat(9, 1fr)`;
    containerGrid.style.gridTemplateRows = `repeat(9, 1fr)`;
    for (let i = 0; i < 9; i++) {
        const row = i;
        for (let j = 0; j < 9; j++) {
            const col = j;

            const gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");
            gridItem.setAttribute("data-row", row);
            gridItem.setAttribute("data-col", col);
            containerGrid.appendChild(gridItem);
        }
    }
};

// Check game state
const checkGameState = () => {
    if (remainingMoves === 0) {
        movesLeft.innerText = "Game Over!";
        // update ui for all grid items
        const gridItems = document.querySelectorAll(".grid-item");
        gridItems.forEach((item) => {
            item.innerText = "";
            item.classList.add("miss");
        });
        return false;
    }
    return true;
};

// Start game
startGame.addEventListener("click", () => {
    fillGameBoard();
});

// player clicks event handler
containerGrid.addEventListener("click", (e) => {
    // Get screen data coordinates
    const row = e.target.getAttribute("data-row");
    const col = e.target.getAttribute("data-col");
    let gameState = checkGameState();
    if (gameState) {
        if (row === null || col === null) {
            console.log("Nothing");
        } else {
            const currentDiv = e.target;
            let possibleHit = board.makeHit(row, col);
            if (possibleHit) {
                currentDiv.classList.add("hit");
                currentDiv.innerText = possibleHit;
            } else {
                currentDiv.classList.add("miss");
                remainingMoves--;
            }
        }
        movesLeft.innerText = `Moves Left: ${remainingMoves}`;
    }

    checkGameState();
});
// restart game
restartGame.addEventListener("click", () => {
    remainingMoves = 20;
    containerGrid.innerHTML = "";
    board = new Board();
    // Refill the board
    fillGameBoard();
    console.log(board);
});
