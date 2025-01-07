// Sounds for game
const clickSound = new Audio('Sounds/tap.wav');
const tieSound = new Audio('Sounds/tie.wav');
const winSound = new Audio('Sounds/win.wav');
const restartSound = new Audio('Sounds/restartBtnmsc.mp3');

let gameActive = true;
let boardState = Array(9).fill(null);
let currentPlayer = 'X';
let X_win = document.getElementById("X");
let O_win = document.getElementById("O");
let X_count = 0;
let O_count = 0;

X_win.innerHTML = `X = ${X_count}`;
X_win.style.color = "#ddd";
O_win.textContent = `O = ${O_count}`;
O_win.style.color = "#ddd";

const update = document.getElementById("status");
const board = document.getElementById("cells");
const resetBtn = document.getElementById("reset");

// all winning combinations
const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// program start from here
document.querySelectorAll(".cell").forEach((cell,index) => {
    cell.setAttribute("data-index", index);
    cell.addEventListener("click", () => handleMove(index));
});

resetBtn.addEventListener("click", () => {
    restartSound.play();
    restartSound.volume = 0.1;
    restartSound.playbackRate = 1.5;
    resetGame();
});

// called when user click on any of the cell(box of the game)
function handleMove(index) {
    if(!gameActive || boardState[index]) {
        return;
    }

    //used Audio API to play sound when user interact(clicks on the box)
    clickSound.play();
    clickSound.volume = 0.2;

    boardState[index] = currentPlayer;
    const cell = document.querySelector(`.cell[data-index='${index}']`);
    cell.textContent = currentPlayer;
    cell.style.color = "#ddd";
    cell.style.transform = 'scale(1.1)';
    setTimeout(() => (cell.style.transform = 'scale(1)'), 200);

    // cheking which player has won 
    if(checkWin()){
        update.textContent = `Player ${currentPlayer} Wins`;
        update.style.color = "#FFD700";
        update.style.transform = "scale(1.3)";
        update.style.transition = "0.3s";
        setTimeout( () => (update.style.transform = "scale(1)"), 300);
        if(currentPlayer === 'X'){
            X_count++;   
            X_win.textContent = `X = ${X_count}`;
            X_win.style.transform = "scale(1.3)";
            X_win.style.transition = "0.2s";
            setTimeout(() => (X_win.style.transform = 'scale(1)'), 200);
        } else{
            O_count++;
            O_win.textContent = `O = ${O_count}`;
            O_win.style.transform = "scale(1.3)";
            O_win.style.transition = "0.2s";
            setTimeout(() => (O_win.style.transform = "scale(1)"), 200);

        }
        gameActive = false;

        // play sound when player won the
        winSound.play();
        winSound.volume=0.2;
        highlightWinningCombinations();
    }
    else if(boardState.every(cell => cell !== null)) {
        update.textContent = `Its a Tie!! Starting Soon...` ;
        update.style.transform = "scale(1.2)";
        update.style.transition= "0.5s";
        setTimeout(() => {
            update.style.transform = "scale(1)";
        }, 500);
        gameActive = false;
        tieSound.play();
        tieSound.volume=0.3;
        setTimeout(()=>{ resetGame() },1500);
    }
    else{
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    update.textContent = `Player ${currentPlayer}'s Turn`;
    update.style.transform = "scale(1.2)";
    update.style.transition= "0.3s";
    setTimeout(() => {
        update.style.transform = "scale(1)";
    }, 300);
    }
};

function highlightWinningCombinations() {
    const winningCombination = winningCombinations.find(combination => 
        combination.every(index => boardState[index] === currentPlayer)
    );
    if(winningCombination) {
        winningCombination.forEach( index => {
            const cell = document.querySelector(`.cell[data-index='${index}']`);
            cell.style.transform = 'scale(1.3)';
            setTimeout(()=>(cell.style.transform = 'scale(1)'), 200);
            cell.style.backgroundColor = "#333";
        });
    }
}

function checkWin() {
    return winningCombinations.some(combination => 
        combination.every(index => boardState[index]===currentPlayer)
    );
}

function resetGame() {
    boardState = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    update.style.color = "white";
    update.textContent = `Player ${currentPlayer}'s Turn`;

    document.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = "";
        cell.style.backgroundColor = "";
    });
} 
