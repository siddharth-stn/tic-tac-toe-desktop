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
const matchTie = document.querySelector(".match-tie");
const playerChanceBanner = document.querySelector(".play-banner");

(() => {
    let gameType;

    let clickSound = new Audio("./static/clickSound.mp3");
    let winSound = new Audio("./static/cheerSound.mp3");
    let tieSound = new Audio("./static/drawSound.mp3");
    let tweetSound = new Audio("./static/tweetSound.mp3");

    function onNextBtnClick(formGameType, formPlayerName) {
        clickSound.play();
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
        clickSound.play();
        // store the names of the players in the constants/variables
        const playerOneNameInput = document.querySelector("#playerOneNameInput");
        const playerTwoNameInput = document.querySelector("#playerTwoNameInput");
        playerOneNameValue = playerOneNameInput.value == "" ? "Player One" : playerOneNameInput.value;
        playerTwoNameValue = playerTwoNameInput.value == "" ? "Player Two" : playerTwoNameInput.value;

        (gameType == 1) ? (playerTwoNameValue = "Computer") : null;

        // add hidden class to enter-player-names form
        addHiddenClass(formPlayerName);

        // removehiddenclass from play-grid
        removeHiddenClass(playGrid);
        playBanner.children[0].textContent = `${playerOneNameValue} click on the grid to Mark X in any cell and Start the game`;
        removeHiddenClass(playBanner);
    }



    nextButton.addEventListener('click', onNextBtnClick.bind(nextButton, gameTypeChoiceForm, enterNamesForm));

    startButton.addEventListener('click', onStartBtnClick.bind(startButton, enterNamesForm, playGrid));

    // ! actual game code ---->

    const gridArray = [];
    let playerChance = 1;
    let playTimes = 0;
    let times = 0;


    playGrid.addEventListener('click', gamePlay);


    function gamePlay(event) {
        playGrid.removeEventListener('click', gamePlay);

        // identify the clicked cell 
        let clickedCell = identifyCell(event);

        // increase the chance number by one if correct cell was clicked 
        if (clickedCell == false) {
            playGrid.addEventListener('click', gamePlay); // to add event listener if user clicks on the already clicked cell
            return;
        }

        playTimes += 1;

        // if playerOne clicked then add class fill-x and if, 
        // playerTwo clicked then add class fill-o to the identified cell
        fill_X_OR_O(clickedCell);

        // update the gridArray
        updateGridArray(clickedCell, playerChance);

        // change the playerChance value
        changePlayer();

        // show player chance in head banner
        showPlayerChance(playerChanceBanner, playerChance);

        // check Winner
        checkWin();

        // if single player game then computer will play
        computerPlayedchance(gridArray, clickedCell);

        // refactor code to make it more safe and unaccessible from the console
    }

    function disableCell(element) {
        element.classList.remove("cell");
    }

    function identifyCell(event) {
        if (Array.from(event.target.classList).includes("cell")) {
            clickSound.play();
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

    function changePlayer() {
        playerChance == 1 ? playerChance = 2 : playerChance = 1;
    }

    function showPlayerChance(element, playerChance) {
        if (playerChance == 1) {
            element.children[0].textContent = `make a move ${playerOneNameValue}`;
        } else {
            element.children[0].textContent = `make a move ${playerTwoNameValue}`;
        }
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

    // check if somebody won
    function checkWin() {
        let won_Or_Not = whoWon_Or_Not();
        if (won_Or_Not == 0) {
            // write code if its a tie
            if (playTimes > 8) {
                tieSound.play();
                removeClickListener(playGrid);
                removePlayerChanceBanner();
                setTimeout(() => {
                    removeGrid();
                    show_WinBanner();
                    showMatchTie();
                    setTimeout(() => {
                        document.querySelector(".btn-success").classList.add("animate__wobble")
                    }, 800);
                }, 1000);
            }
            return;
        } else if (won_Or_Not == 1) {
            tweetSound.pause();
            tweetSound.currentTime = 0;
            winSound.play();
            playerOneWin.children[0].textContent = `Horray! ${playerOneNameValue} Won the Game`;
            removeClickListener(playGrid);
            removePlayerChanceBanner();
            setTimeout(() => {
                removeGrid();
                show_WinBanner();
                showPlayeOneWin();
                setTimeout(() => {
                    document.querySelector(".btn-success").classList.add("animate__wobble")
                }, 500);
            }, 1000);
        } else if (won_Or_Not == 2) {
            tweetSound.pause();
            tweetSound.currentTime = 0;
            winSound.play();
            playerTwoWin.children[0].textContent = `Horray! ${playerTwoNameValue} Won the Game`;
            removeClickListener(playGrid);
            removePlayerChanceBanner();
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

    function showMatchTie() {
        removeHiddenClass(matchTie);
    }

    function removeGrid() {
        addHiddenClass(playGrid);
    }

    function removePlayerChanceBanner() {
        addHiddenClass(playerChanceBanner);
    }

    function removeClickListener(element) {
        element.removeEventListener('click', gamePlay);
    }


    // write code for computer play
    function computerPlayedchance(gridArray, clickedCell) {
        if (gameType == 1) {

            let computerChoice = computerPlay(gridArray, clickedCell);
            let chosenCell = document.querySelector(`[data-cell="${computerChoice}"]`);
            try {
                disableCell(chosenCell); // to remove class cell from the chosen cell 
            } catch {}
            setTimeout(() => {
                try {
                    fill_X_OR_O(chosenCell);
                    tweetSound.play();
                    updateGridArray(chosenCell, playerChance);
                    changePlayer();
                    showPlayerChance(playerChanceBanner, playerChance);
                    checkWin(); // check winner
                } catch {}
                playTimes += 1;
                playGrid.addEventListener('click', gamePlay);
            }, 1000);
        } else {
            playGrid.addEventListener('click', gamePlay);
        }
    }



    function computerPlay(grid, clickedCell) {
        let position = Number(clickedCell.getAttribute("data-cell"));

        let selectionPositions;

        switch (position) {
            case 1:
                selectionPositions = [2, 4, 5];
                break;
            case 2:
                selectionPositions = [1, 3, 4, 5, 6];
                break;
            case 3:
                selectionPositions = [2, 5, 6];
                break;
            case 4:
                selectionPositions = [1, 2, 5, 7, 8];
                break;
            case 5:
                selectionPositions = [1, 2, 3, 4, 6, 7, 8, 9];
                break;
            case 6:
                selectionPositions = [2, 3, 5, 8, 9];
                break;
            case 7:
                selectionPositions = [4, 5, 8];
                break;
            case 8:
                selectionPositions = [4, 5, 6, 7, 9];
                break;
            case 9:
                selectionPositions = [5, 6, 8];
                break;
        }

        let finalSelectionPositions = removeElements(selectionPositions, grid);

        return computerChoiceCell(finalSelectionPositions, grid);

    }

    function removeElements(array, grid) {
        let finalArray = array.filter((value) => {
            if (grid[value - 1] == undefined) {
                return value;
            }
        });

        if (finalArray.length != 0) {
            return finalArray;
        }

        return false;
    }

    function computerChoiceCell(finalChoiceArr, grid) {
        let finalChoice;
        if (finalChoiceArr == false) {
            for (let index = 0; index < grid.length; index++) {
                const element = grid[index];
                if (element == undefined) {
                    return (index + 1);
                }
            }
        }

        let length = finalChoiceArr.length;
        let choice = Math.floor((Math.random() * length) + 1);
        finalChoice = finalChoiceArr[choice - 1];
        return finalChoice;
    }
})();