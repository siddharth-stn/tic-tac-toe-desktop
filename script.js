//initialize sounds to play during the game and after win and after draw
let clickSound = new Audio();
clickSound.src = "static/clickSound.mp3";

let winSound = new Audio();
winSound.src = "static/cheerSound.mp3";

let drawSound = new Audio();
drawSound.src = "static/drawSound.mp3";

//initialized the different elements of the GUI for that is
//being viewed during the start of the application 
const blurWrap = document.getElementById("blur-div");
const form = document.getElementById("player-info-form");
const inputPlayerOne = document.getElementById("player-one-input");
const inputPlayerTwo = document.getElementById("player-two-input");
const chooseX = document.getElementById("chooseX");
const chooseO = document.getElementById("chooseO");
const letsPlayBtn = document.getElementById("letsPlayBtn");

//main game GUI initialized elements
let playerOnePara = document.getElementById("player-one").children[0]; 
let playerTwoPara = document.getElementById("player-two").children[0];
let playerOneChosenSpan = document.getElementById("player-one").children[1].children[0]; 
let playerTwoChosenSpan = document.getElementById("player-two").children[1].children[0];
let resultFlag = document.getElementById("result-para");

//variable that checks that either "X" or "O"
//button should have been clicked before 
//clicking the Let's Play Button
let isXOClicked = false;

//the symbol that player chosses will be put into the
//following variables
let playerOneChoice = "X";
let playerTwoChoice = "O";

// take the value of player names from the GUI input box,
//and put it in the following to variables for further use
let playerOneName = "";
let playerTwoName = "";

//command to run when "X" button is clicked
chooseX.addEventListener ('click', () => {
    isXOClicked = true;
    chooseO.style.backgroundColor = "white";
    chooseX.style.backgroundColor = "yellow";

    playerOneChoice = "X";
    playerTwoChoice = "O";
});
    
//command to run when "O" button is clicked
chooseO.addEventListener ('click', () => {
    isXOClicked = true;
    chooseX.style.backgroundColor = "white";
    chooseO.style.backgroundColor = "yellow";

    playerOneChoice = "O";
    playerTwoChoice = "X";
});

//to stop the user from entering 
//space and numbers in the name input box
function AvoidSpaceAndNumbers(event) {
    var k = event ? event.which : window.event.keyCode;
    if (k == 32 || event.key <= 0 || event.key > 0) return false;
}

//command to run when Let's PLay Button is Clicked
letsPlayBtn.addEventListener ('click', () => {
    if (inputPlayerOne.value == "" || inputPlayerTwo.value == "") {
        alert("Enter both Player Names!!");
    } else if (inputPlayerOne.value == inputPlayerTwo.value) {
        alert("Enter different Names!");
    } else if (!isXOClicked) {
        alert("Player One Choose your symbol!!");
    } else {
        playerOneName = inputPlayerOne.value;
        playerTwoName = inputPlayerTwo.value;
    
        //hide the form after the Let's Play Button
        //is clicked successfully
        //also hide the blur image of the app
        //then reveal the actual game GUI.
        form.style.display = "none";
        blurWrap.style.display = "none";

        //set the player one name and player two name 
        //as per those entered by the user
        playerOnePara.innerHTML = playerOneName;
        playerTwoPara.innerHTML = playerTwoName;

        //set the player one and player two chosen symbol
        playerOneChosenSpan.innerHTML = `(${playerOneChoice})`;
        playerTwoChosenSpan.innerHTML = `(${playerTwoChoice})`;

        //set the result flag to playerOne's(name) chance
        //this flag will be changed throughout the game to
        //show important information about the game to the players
        resultFlag.innerHTML = `${playerOneName}'s turn`;
    }
});

//----------------GamePLay---------------------------- 

//initialize all the game board elements into varriables
let container = document.getElementById("grid-container");
let cells = document.querySelectorAll(".cells");
let cellOneOne = document.getElementById("cell-one-one");
let cellOneTwo = document.getElementById("cell-one-two");
let cellOneThree = document.getElementById("cell-one-three");
let cellTwoOne = document.getElementById("cell-two-one");
let cellTwoTwo = document.getElementById("cell-two-two");
let cellTwoThree = document.getElementById("cell-two-three");
let cellThreeOne = document.getElementById("cell-three-one");
let cellThreeTwo = document.getElementById("cell-three-two");
let cellThreeThree = document.getElementById("cell-three-three");
let playAgainBtn = document.getElementById("playAgainBtn");

//initialize a varibale that stores the player symbol which is to 
//be put on the board when mouse left button is clicked
let mouseClickSymbol = "";

//initialize the control variable to control 
//how many times the game should run
let controlVariable = 1;

//initialize a winner symbol variable to find out the winner
let winSymbol = ""

//initialize a varible to stop click event in grid from working
let stop = true;

//function to check winner during the game
function winCheck () {
    switch (true) {
        case (cellOneOne.innerHTML == cellOneTwo.innerHTML && cellOneOne.innerHTML == cellOneThree.innerHTML && (cellOneThree.innerHTML == "X" || cellOneThree.innerHTML == "O")):
            winSymbol = cellOneOne.innerHTML;
            break;
        case (cellTwoOne.innerHTML == cellTwoTwo.innerHTML && cellTwoOne.innerHTML  == cellTwoThree.innerHTML && (cellTwoThree.innerHTML == "X" || cellTwoThree.innerHTML == "O")):
            winSymbol = cellTwoOne.innerHTML;
            break;
        case (cellThreeOne.innerHTML == cellThreeTwo.innerHTML && cellThreeOne.innerHTML == cellThreeThree.innerHTML && (cellThreeThree.innerHTML == "X" || cellThreeThree.innerHTML == "O")):
            winSymbol = cellThreeOne.innerHTML;
            break;
        case (cellOneOne.innerHTML == cellTwoOne.innerHTML && cellOneOne.innerHTML == cellThreeOne.innerHTML && (cellThreeOne.innerHTML == "X" || cellThreeOne.innerHTML == "O")):
            winSymbol = cellOneOne.innerHTML;
            break;
        case (cellOneTwo.innerHTML == cellTwoTwo.innerHTML && cellOneTwo.innerHTML == cellThreeTwo.innerHTML && (cellThreeTwo.innerHTML == "X" || cellThreeTwo.innerHTML == "O")):
            winSymbol = cellOneTwo.innerHTML;
            break;
        case (cellOneThree.innerHTML == cellTwoThree.innerHTML && cellOneThree.innerHTML == cellThreeThree.innerHTML && (cellThreeThree.innerHTML == "X" || cellThreeThree.innerHTML == "O")):
            winSymbol = cellOneThree.innerHTML;
            break;
        case (cellThreeOne.innerHTML == cellTwoTwo.innerHTML && cellThreeOne.innerHTML == cellOneThree.innerHTML && (cellOneThree.innerHTML == "X" || cellOneThree.innerHTML == "O")):
            winSymbol = cellThreeOne.innerHTML;
            break;
        case (cellOneOne.innerHTML == cellTwoTwo.innerHTML && cellOneOne.innerHTML == cellThreeThree.innerHTML && (cellThreeThree.innerHTML == "X" || cellThreeThree.innerHTML == "O")):
            winSymbol = cellOneOne.innerHTML;
            break;
        default:
            winSymbol = "NOPE";
            break;
    }
}


//code to run when the players take their turn   
container.addEventListener('click', (event) => {
    if (stop) {
        cells.forEach((item) => {
            if (item.innerHTML != "X" && item.innerHTML != "O") {
                if (event.target == item) {
                    if (controlVariable <= 8) {
                        clickSound.play();
                        controlVariable++;
                        if (resultFlag.innerHTML == `${playerOneName}'s turn`) {
                            mouseClickSymbol = playerOneChoice;
                            item.innerHTML = mouseClickSymbol;
                            winCheck();
                            if (winSymbol != "NOPE") {
                                if (winSymbol == playerOneChoice) {
                                    resultFlag.innerHTML = `${playerOneName} wins!`;
                                    winSound.play();
                                    stop = false;
                                    playAgainBtn.style.display = "block";
                                } else {
                                    resultFlag.innerHTML = `${playerTwoName} wins!`;
                                    winSound.play();
                                    stop = false;
                                    playAgainBtn.style.display = "block";
                                }
                            } else {
                                resultFlag.innerHTML = `${playerTwoName}'s turn`;
                            }
                            
                        } else {
                            mouseClickSymbol = playerTwoChoice;
                            item.innerHTML = mouseClickSymbol;
                            winCheck();
                            if (winSymbol != "NOPE") {
                                if (winSymbol == playerOneChoice) {
                                    resultFlag.innerHTML = `${playerOneName} wins!`;
                                    winSound.play();
                                    stop = false;
                                    playAgainBtn.style.display = "block";
                                } else {
                                    resultFlag.innerHTML = `${playerTwoName} wins!`;
                                    winSound.play();
                                    stop = false;
                                    playAgainBtn.style.display = "block";
                                }
                            } else {
                                resultFlag.innerHTML = `${playerOneName}'s turn`
                            }
                        }
                    } else {
                        if (resultFlag.innerHTML == `${playerOneName}'s turn`) {
                            clickSound.play();
                            mouseClickSymbol = playerOneChoice;
                            item.innerHTML = mouseClickSymbol;
                            winCheck();
                            if (winSymbol != "NOPE") {
                                if (winSymbol == playerOneChoice) {
                                    resultFlag.innerHTML = `${playerOneName} wins!`;
                                    winSound.play();
                                    stop = false;
                                    playAgainBtn.style.display = "block";
                                } else {
                                    resultFlag.innerHTML = `${playerTwoName} wins!`;
                                    winSound.play();
                                    stop = false;
                                    playAgainBtn.style.display = "block";
                                }
                            } else {
                                clickSound.play();
                                resultFlag.innerHTML = "Game Draw!";
                                drawSound.play();
                                playAgainBtn.style.display = "block";
                            }
                        } else {
                            mouseClickSymbol = playerTwoChoice;
                            item.innerHTML = mouseClickSymbol;
                            clickSound.play()
                            winCheck();
                            if (winSymbol != "NOPE") {
                                if (winSymbol == playerOneChoice) {
                                    resultFlag.innerHTML = `${playerOneName} wins!`
                                    winSound.play();
                                    stop = false;
                                    playAgainBtn.style.display = "block";
                                } else {
                                    resultFlag.innerHTML = `${playerTwoName} wins!`
                                    winSound.play();
                                    stop = false;
                                    playAgainBtn.style.display = "block";
                                }
                            } else {
                                clickSound.play()
                                resultFlag.innerHTML = "Game Draw!";
                                drawSound.play();
                                playAgainBtn.style.display = "block";
                            }
                        }
                    }
                }
            }
        });
    }
});
      
//code for Play Again Button
playAgainBtn.addEventListener ('click', () => {
    location.reload();
});

