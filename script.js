let moveCount = 0;
let timer;
let elapsedTime = 0;
let gameStarted = false;

function swapTiles(cell1, cell2) {
    let temp = document.getElementById(cell1).className;
    document.getElementById(cell1).className = document.getElementById(cell2).className;
    document.getElementById(cell2).className = temp;
}

function shuffle() {
    resetGame();

    for (let row = 1; row <= 4; row++) {
        for (let column = 1; column <= 4; column++) {
            let row2 = Math.floor(Math.random() * 4 + 1);
            let column2 = Math.floor(Math.random() * 4 + 1);
            swapTiles("cell" + row + column, "cell" + row2 + column2);
        }
    }

    startTimer();
}

function simpleGame() {
    resetGame();

    // Arrange tiles in perfect order
    let tileNumber = 1;
    for (let row = 1; row <= 4; row++) {
        for (let column = 1; column <= 4; column++) {
            document.getElementById("cell" + row + column).className = "tile" + tileNumber;
            tileNumber++;
        }
    }

    // Swap the last two tiles (to make it solvable in one move)
    swapTiles("cell43", "cell44");

    startTimer();
}


function clickTile(row, column) {
    if (!gameStarted) startTimer();

    let cell = document.getElementById("cell" + row + column);
    let tile = cell.className;

    if (tile != "tile16") {
        if (column < 4 && document.getElementById("cell" + row + (column + 1)).className == "tile16") {
            swapTiles("cell" + row + column, "cell" + row + (column + 1));
            incrementMove();
            checkWin();
            return;
        }
        if (column > 1 && document.getElementById("cell" + row + (column - 1)).className == "tile16") {
            swapTiles("cell" + row + column, "cell" + row + (column - 1));
            incrementMove();
            checkWin();
            return;
        }
        if (row > 1 && document.getElementById("cell" + (row - 1) + column).className == "tile16") {
            swapTiles("cell" + row + column, "cell" + (row - 1) + column);
            incrementMove();
            checkWin();
            return;
        }
        if (row < 4 && document.getElementById("cell" + (row + 1) + column).className == "tile16") {
            swapTiles("cell" + row + column, "cell" + (row + 1) + column);
            incrementMove();
            checkWin();
            return;
        }
    }
}

function incrementMove() {
    moveCount++;
    document.getElementById("moveCount").innerText = "Moves: " + moveCount;
}

function startTimer() {
    if (!gameStarted) {
        gameStarted = true;
        timer = setInterval(() => {
            elapsedTime++;
            document.getElementById("timeElapsed").innerText = "Time: " + elapsedTime + "s";
        }, 1000);
    }
}

function resetGame() {
    moveCount = 0;
    elapsedTime = 0;
    gameStarted = false;
    clearInterval(timer);
    document.getElementById("moveCount").innerText = "Moves: 0";
    document.getElementById("timeElapsed").innerText = "Time: 0s";
}

function checkWin() {
    if (
        document.getElementById("cell11").className == "tile1" &&
        document.getElementById("cell12").className == "tile2" &&
        document.getElementById("cell13").className == "tile3" &&
        document.getElementById("cell14").className == "tile4" &&
        document.getElementById("cell21").className == "tile5" &&
        document.getElementById("cell22").className == "tile6" &&
        document.getElementById("cell23").className == "tile7" &&
        document.getElementById("cell24").className == "tile8" &&
        document.getElementById("cell31").className == "tile9" &&
        document.getElementById("cell32").className == "tile10" &&
        document.getElementById("cell33").className == "tile11" &&
        document.getElementById("cell34").className == "tile12" &&
        document.getElementById("cell41").className == "tile13" &&
        document.getElementById("cell42").className == "tile14" &&
        document.getElementById("cell43").className == "tile15" &&
        document.getElementById("cell44").className == "tile16"
    ) {
        clearInterval(timer); // Stop the timer
        setTimeout(() => {
            let playAgain = window.confirm(
                "Congratulations!!\n\n" +
                "Time Spent: " + elapsedTime + " seconds\n" +
                "Moves Taken: " + moveCount + "\n\n" +
                "Would you like to play again?"
            );
            if (playAgain) {
                window.location.reload();
            }
        }, 100);
    }
}
