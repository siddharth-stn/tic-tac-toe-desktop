const log = console.log;

const nextButton = document.querySelector(".nextBtn");
const startButton = document.querySelector(".startBtn");
const radioButtons = document.querySelectorAll("input[name=gameType]");
const enterNamesForm = document.querySelector("#enter-player-names");
const gameTypeChoiceForm = document.querySelector("#choice-game-type");
const playerTwoName = document.querySelector("#playerTwoName");
const playGrid = document.querySelector(".play-grid");
const playBanner = document.querySelector(".play-banner");
const winBanner = document.querySelector(".win-banner");
const playerOneWin = document.querySelector(".playerOneWin");
const playerTwoWin = document.querySelector(".playerTwoWin");


let gameType;


function onNextBtnClick(formGameType, formPlayerName) {
    gameTypeChoice();
    addHiddenClass(formGameType);
    removeHiddenClass(formPlayerName);
    if (gameType == 2) {
        removeHiddenClass(playerTwoName);
    }
}

function gameTypeChoice() {
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            gameType = radioButton.value;
            break;
        }
    }
}

function addHiddenClass(element) {
    element.classList.add("hidden");
}

function removeHiddenClass(element) {
    element.classList.remove("hidden");
}


let playerOneNameValue;
let playerTwoNameValue;


function onStartBtnClick(formPlayerName, playGrid) {
    // store the names of the players in the constants/variables
    const playerOneNameInput = document.querySelector("#playerOneNameInput");
    const playerTwoNameInput = document.querySelector("#playerTwoNameInput");
    playerOneNameValue = playerOneNameInput.value;
    playerTwoNameValue = playerTwoNameInput.value;

    // add hidden class to enter-player-names form
    addHiddenClass(formPlayerName);

    // removehiddenclass from play-grid
    removeHiddenClass(playGrid);
    removeHiddenClass(playBanner);
}



nextButton.addEventListener('click', onNextBtnClick.bind(nextButton, gameTypeChoiceForm, enterNamesForm));

startButton.addEventListener('click', onStartBtnClick.bind(startButton, enterNamesForm, playGrid));

// ! actual game code ---->

const gridArray = [];
let playerChance = 1;

playGrid.addEventListener('click', gamePlay);


function gamePlay(event) {
    // identify the clicked cell 
    let clickedCell = identifyCell(event);

    // if playerOne clicked then add class fill-x and if, 
    // playerTwo clicked then add class fill-o to the identified cell
    fill_X_OR_O(clickedCell);

    // update the gridArray
    updateGridArray(clickedCell, playerChance);

    // change the playerChance value
    changePlayer(clickedCell);

    // check if somebody won
    let won_Or_Not = whoWon_Or_Not();
    if (won_Or_Not == 0) {
        return;
    } else if (won_Or_Not == 1) {
        playerOneWin.children[0].textContent = "Horray! Player One Won the Game"
        removeClickListener(playGrid);
        setTimeout(() => {
            removeGrid();
            show_WinBanner();
            showPlayeOneWin();
            setTimeout(() => {
                document.querySelector(".btn-success").classList.add("animate__wobble")
            }, 500); 
        }, 1000);

    } else if (won_Or_Not == 2) {
        playerTwoWin.children[0].textContent = "Horray! Player Two Won the Game";
        removeClickListener(playGrid);
        setTimeout(() => {
            removeGrid();
            show_WinBanner();
            showPlayeTwoWin();
            setTimeout(() => {
                document.querySelector(".btn-success").classList.add("animate__wobble")
            }, 800);
        }, 1000);
    }
}

function disableCell(element) {
    element.classList.remove("cell");
}

function identifyCell(event) {
    if (Array.from(event.target.classList).includes("cell")) {
        disableCell(event.target);
        return event.target;
    }
    return false;
}

function fill_X_OR_O(clickedCell) {
    if (clickedCell == false) {
        return;
    }
    if (playerChance == 1) {
        clickedCell.children[0].classList.add("fill-x");
    } else {
        clickedCell.children[0].classList.add("fill-o");
    }
}

function changePlayer(clickedCell) {
    if (clickedCell == false) {
        return;
    }
    playerChance == 1 ? playerChance = 2 : playerChance = 1;
}


function updateGridArray(clickedCell, playerChance) {
    if (clickedCell == false) {
        return;
    }
    let clickedCellIndex = clickedCell.getAttribute("data-cell");

    if (playerChance == 1) {
        gridArray[clickedCellIndex - 1] = "X";
    } else {
        gridArray[clickedCellIndex - 1] = "O";
    }
}

function whoWon_Or_Not() {
    let cellOne = gridArray[0];
    let cellTwo = gridArray[1];
    let cellThree = gridArray[2];
    let cellFour = gridArray[3];
    let cellFive = gridArray[4];
    let cellSix = gridArray[5];
    let cellSeven = gridArray[6];
    let cellEight = gridArray[7];
    let cellNine = gridArray[8];

    if (cellOne != undefined && cellOne == cellTwo && cellOne == cellThree) {
        if (cellOne == "X") {
            return 1;
        } else {
            return 2;
        }
    } else if (cellFour != undefined && cellFour == cellFive && cellFour == cellSix) {
        if (cellFour == "X") {
            return 1;
        } else {
            return 2;
        }
    } else if (cellSeven != undefined && cellSeven == cellEight && cellSeven == cellNine) {
        log(cellFour, cellFive, cellSix)
        if (cellSeven == "X") {
            return 1;
        } else {
            return 2;
        }
    } else if (cellOne != undefined && cellOne == cellFour && cellOne == cellSeven) {
        if (cellOne == "X") {
            return 1;
        } else {
            return 2;
        }
    } else if (cellTwo != undefined && cellTwo == cellFive && cellTwo == cellEight) {
        if (cellTwo == "X") {
            return 1;
        } else {
            return 2;
        }
    } else if (cellThree != undefined && cellThree == cellSix && cellThree == cellNine) {
        if (cellThree == "X") {
            return 1;
        } else {
            return 2;
        }
    } else if (cellOne != undefined && cellOne == cellFive && cellOne == cellNine) {
        if (cellOne == "X") {
            return 1;
        } else {
            return 2;
        }
    } else {
        return 0;
    }
}

function show_WinBanner() {
    removeHiddenClass(winBanner);
}

function showPlayeOneWin() {
    removeHiddenClass(playerOneWin);
}

function showPlayeTwoWin() {
    removeHiddenClass(playerTwoWin);
}

function removeGrid() {
    addHiddenClass(playGrid);
}

function removeClickListener(element) {
    element.removeEventListener('click', gamePlay);
}