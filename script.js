const gameCells = document.querySelectorAll('.cell');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const restartBtn = document.querySelector('.restart-btn');
const alertBox = document.querySelector('.alert-box');

// Making variables
let currentPlayer = 'X';
let nextPlayer = 'O';

let playerTurn = currentPlayer;

player1.textContent = `Player 1: ${currentPlayer}`;
player2.textContent = `Player 2: ${nextPlayer}`;

// Function to restart game
const restartGame = () =>{
    gameCells.forEach(cell =>{
        cell.textContent = '';
        cell.classList.remove('disabled');
    });
    startGame();
};

// Function to start the game
const startGame = () =>{
    gameCells.forEach(cell =>{
        cell.addEventListener('click', handleClick);
    });
};

// Function to handle click
const handleClick = (e) =>{
    if(e.target.textContent === ''){
        e.target.textContent = playerTurn;
        if(checkWinner()){
            showAlert(`${playerTurn} is Winner !!`);
            disaleCells();
        } else if(checkTie()){
            showAlert(`It's a Tie!`);
            disaleCells();
        } else {
            changePlayerTurn();
            showAlert(`Turn for player: ${playerTurn}`);
        }
    }
};

// Function to change player turn
const changePlayerTurn = () =>{
    playerTurn = playerTurn === currentPlayer ? nextPlayer : currentPlayer;
};

// Function to check winner
const checkWinner = () =>{
    const winningConditions = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    for(let i = 0; i < winningConditions.length; i++){
        const [pos1, pos2, pos3] = winningConditions[i];
        if( gameCells[pos1].textContent !== '' && 
            gameCells[pos1].textContent === gameCells[pos2].textContent && 
            gameCells[pos2].textContent === gameCells[pos3].textContent ){
            return true;
        }
    }

    return false;
};

// Function to check for tie
const checkTie = () =>{
    let emptyCellsCount = 0;
    gameCells.forEach(cell =>{
        if(cell.textContent === ''){
            emptyCellsCount++;
        }
    });

    return emptyCellsCount === 0 && !checkWinner();
};

// Function to disable game board cells after tie or win
const disaleCells = () =>{
    gameCells.forEach(cell =>{
        cell.removeEventListener('click', handleClick);
        cell.classList.add('disabled');
    });
};

// Function to show alert
const showAlert = (msg) =>{
    alertBox.style.display = 'block';
    alertBox.textContent = msg;
    setTimeout(()=>{
        alertBox.style.display = 'none';
    }, 3000);
};

// Calling restart game function
restartBtn.addEventListener('click', restartGame);

// Calling start game function
startGame();