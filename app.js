// const gameBoard = document.querySelector(".board");
// const playAgainButton = document.querySelector(".hidden");
// const PLAYER_1 = "fa-circle-o";
// const PLAYER_2 = "fa-times";
// let movesCount = 0;
// let round = 1;

// const gameMatrix = [
//     ["", "", ""],
//     ["", "", ""],
//     ["", "", ""],
// ];

// const winningCombinations = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
// ];

// const boxes = Array.from(document.querySelectorAll(".box"));
// boxes.forEach((box) => box.addEventListener("click", select));

// playAgainButton.addEventListener("click", restartGame);

// function select(evt) {
//     const row = parseInt(evt.target.dataset.row, 10);
//     const column = parseInt(evt.target.dataset.column, 10);
//     const turn = round % 2 === 0 ? PLAYER_2 : PLAYER_1;
//     if (gameMatrix[row][column] !== "") return;

//     evt.target.classList.add(turn);
//     gameMatrix[row][column] = turn;
//     round++;
//     movesCount++;

//     check();
// }

// function blockBoardAfterGameFinish() {
//     boxes.forEach((box) => box.removeEventListener("click", select));
// }

// function restartGame() {
//     location.reload();
// }

// function check() {
//     const result = gameMatrix.flat();

//     let winner = null;
//     let moves = {
//         "fa-times": [],
//         "fa-circle-o": [],
//     };

//     result.forEach((field, index) =>
//         moves[field] ? moves[field].push(index) : null
//     );

//     winningCombinations.forEach((combination) => {
//         if (combination.every((index) => moves[PLAYER_1].indexOf(index) > -1)) {
//             winner = "Winner: Player 1";
//             combination.forEach((index) => {
//                 boxes[index].classList.add("winning-field");
//             });
//         }
//         if (combination.every((index) => moves[PLAYER_2].indexOf(index) > -1)) {
//             winner = "Winner: Player 2";
//             combination.forEach((index) => {
//                 boxes[index].classList.add("winning-field");
//             });
//         }
//     });

//     if (winner) {
//         gameBoard.classList.add("game-finished");
//         playAgainButton.classList.remove("hidden");
//         blockBoardAfterGameFinish();
//     } else if (movesCount === 9) {
//         console.log("Draw Game");
//         gameBoard.classList.add("draw-game");
//         playAgainButton.classList.remove("hidden");
//         blockBoardAfterGameFinish();
//     }

//     function getGameScore() {
//         let gameScore = localStorage.getItem("gameScore");
//         if (!gameScore) {
//             gameScore = { PLAYER_1: 0, PLAYER_2: 0 };
//             localStorage.setItem("gameScore", JSON.stringify(gameScore));
//         } else {
//             gameScore = JSON.parse(gameScore);
//         }

//         if (winner === "Player 1") {
//             console.log("winner", winner);
//             gameScore.PLAYER_1 += 1;
//             updateGameScoreDisplay();
//         } else if (winner === "Player 2") {
//             gameScore.PLAYER_2 += 1;
//             updateGameScoreDisplay();
//         }
//         console.log(
//             "LocalStorage Contents:",
//             localStorage.getItem("gameScore")
//         );
//     }

//     function updateGameScoreDisplay() {
//         const scores = getScores();
//         document.getElementsByClassName(
//             "game-score_display_player1"
//         ).textContent = scores.player1;
//         document.getElementsByClassName(
//             "game-score_display_player2"
//         ).textContent = scores.player2;
//     }

//     getGameScore();
//     return winner;
// }

const gameBoard = document.querySelector(".board");
const playAgainButton = document.querySelector(".hidden");
const PLAYER_1 = "fa-circle-o";
const PLAYER_2 = "fa-times";
let movesCount = 0;
let round = 1;

const gameMatrix = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const boxes = Array.from(document.querySelectorAll(".box"));
boxes.forEach((box) => box.addEventListener("click", select));

playAgainButton.addEventListener("click", restartGame);

function select(evt) {
    const row = parseInt(evt.target.dataset.row, 10);
    const column = parseInt(evt.target.dataset.column, 10);
    const turn = round % 2 === 0 ? PLAYER_2 : PLAYER_1;
    if (gameMatrix[row][column] !== "") return;

    evt.target.classList.add(turn);
    gameMatrix[row][column] = turn;
    round++;
    movesCount++;

    check();
}

function blockBoardAfterGameFinish() {
    boxes.forEach((box) => box.removeEventListener("click", select));
}

function restartGame() {
    location.reload();
}

function check() {
    const result = gameMatrix.flat();

    let winner = null;
    let moves = {
        "fa-times": [],
        "fa-circle-o": [],
    };

    result.forEach((field, index) =>
        moves[field] ? moves[field].push(index) : null
    );

    winningCombinations.forEach((combination) => {
        if (combination.every((index) => moves[PLAYER_1].indexOf(index) > -1)) {
            winner = "Player 1";
            combination.forEach((index) => {
                boxes[index].classList.add("winning-field");
            });
        }
        if (combination.every((index) => moves[PLAYER_2].indexOf(index) > -1)) {
            winner = "Player 2";
            combination.forEach((index) => {
                boxes[index].classList.add("winning-field");
            });
        }
    });

    if (winner) {
        gameBoard.classList.add("game-finished");
        playAgainButton.classList.remove("hidden");
        blockBoardAfterGameFinish();
    } else if (movesCount === 9) {
        console.log("Draw Game");
        gameBoard.classList.add("draw-game");
        playAgainButton.classList.remove("hidden");
        blockBoardAfterGameFinish();
    }

    getGameScore(winner);
    return winner;
}

function getGameScore(winner) {
    let gameScore = localStorage.getItem("gameScore");
    if (!gameScore) {
        gameScore = { PLAYER_1: 0, PLAYER_2: 0 };
        localStorage.setItem("gameScore", JSON.stringify(gameScore));
    } else {
        gameScore = JSON.parse(gameScore);
    }

    if (winner === "Player 1") {
        gameScore.PLAYER_1 += 1;
    } else if (winner === "Player 2") {
        gameScore.PLAYER_2 += 1;
    }

    localStorage.setItem("gameScore", JSON.stringify(gameScore));
    updateGameScoreDisplay();
}

function getScores() {
    let scores = localStorage.getItem("gameScore");
    if (!scores) {
        scores = { PLAYER_1: 0, PLAYER_2: 0 };
        localStorage.setItem("gameScore", JSON.stringify(scores));
    } else {
        scores = JSON.parse(scores);
    }
    return scores;
}

function updateGameScoreDisplay() {
    const scores = getScores();
    document.querySelector(".game-score_display_player1").textContent =
        scores.PLAYER_1;
    document.querySelector(".game-score_display_player2").textContent =
        scores.PLAYER_2;
}

// Initialize the scoreboard display on page load
document.addEventListener("DOMContentLoaded", updateGameScoreDisplay);
