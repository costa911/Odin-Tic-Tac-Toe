const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
let circleTurn = false;
let player1Name = '';
let player2Name = '';
let player1Score = 0;
let player2Score = 0;

const welcomeScreen = document.getElementById('welcomeScreen');
const startGameButton = document.getElementById('startGameButton');
const startGameButton2 = document.getElementById('startGameButton2');

startGameButton.addEventListener('click', () => {
    welcomeScreen.style.display = 'none'; // Hide welcome screen
    document.getElementById('playerNames').style.display = 'block'; // Show player names form
});

startGameButton2.addEventListener('click', () => {
    const player1NameInput = document.getElementById('player1Name');
    const player2NameInput = document.getElementById('player2Name');

    player1Name = player1NameInput.value || 'Player 1';
    player2Name = player2NameInput.value || 'Player 2';

    document.getElementById('player1Name').innerText = player1Name;
    document.getElementById('player2Name').innerText = player2Name;

    document.getElementById('playerNames').style.display = 'none'; // Hide player names form
    board.style.display = 'grid'; // Show game board
    document.querySelector('.turn-container').style.display = 'grid'; // Show turn container
    startGame(); // Start the game
});

restartButton.addEventListener('click', startGame);

function startGame(){
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true});
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}

function handleClick(e){
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)){
        endGame(false);
    } else if(isDraw()){
        endGame(true);
    } else{
        swapTurns();
        setBoardHoverClass();
        changeTurn();
    }
}

function endGame(draw){
    if (draw){
        winningMessageTextElement.innerText = 'Draw!';
    } else {
        const winner = circleTurn ? player2Name : player1Name;
        winningMessageTextElement.innerText = `${winner} Wins!`;
        if (circleTurn) {
            player2Score++;
            document.getElementById('player2ScoreDisplayOutput').innerText = player2Score;
        } else {
            player1Score++;
            document.getElementById('player1ScoreDisplayOutput').innerText = player1Score;
        }
    }
    winningMessageElement.classList.add('show');
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS);
    });
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

function swapTurns(){
    circleTurn = !circleTurn;
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn){
        board.classList.add(CIRCLE_CLASS);
    } else{
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function changeTurn(){
    if(circleTurn){
        document.getElementById('playerO').classList.add('active');
        document.getElementById('playerX').classList.remove('active');
    } else {
        document.getElementById('playerX').classList.add('active');
        document.getElementById('playerO').classList.remove('active');
    }
}