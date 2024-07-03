const gameBoard = document.querySelector(".board");
const playAgainButton = document.querySelector(".hidden");
const PLAYER_1 = "fa-circle-o";
const PLAYER_2 = "fa-times";
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
    // const { row, column } = evt.target.dataset;
    const row = parseInt(evt.target.dataset.row, 10);
    const column = parseInt(evt.target.dataset.column, 10);
    const turn = round % 2 === 0 ? PLAYER_2 : PLAYER_1;
    if (gameMatrix[row][column] !== "") return;

    evt.target.classList.add(turn);
    gameMatrix[row][column] = turn;
    round++;

    console.log(check());
}

function blockBoardAfterGameFinish() {
    boxes.forEach((box) => box.removeEventListener("click", select));
}

function restartGame() {
    location.reload();
}

function check() {
    // const result = board.reduce((total, row) => total.concat(row));
    const result = gameMatrix.flat();

    let winner = null;
    let moves = {
        "fa-times": [],
        "fa-circle-o": [],
    };

    result.forEach((field, index) =>
        moves[field] ? moves[field].push(index) : null
    );

    console.log("result: " + result);

    winningCombinations.forEach((combination) => {
        if (combination.every((index) => moves[PLAYER_1].indexOf(index) > -1)) {
            winner = "Winner: Player 1";
            combination.forEach((index) => {
                boxes[index].classList.add("winning-field");
            });
        }
        if (combination.every((index) => moves[PLAYER_2].indexOf(index) > -1)) {
            winner = "Winner: Player 2";
            combination.forEach((index) => {
                boxes[index].classList.add("winning-field");
            });
        }
    });

    if (winner) {
        gameBoard.classList.add("game-finished");
        playAgainButton.classList.remove("hidden");
        blockBoardAfterGameFinish();
    }
    return winner;
}
