'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' ';
const power = '🤖';
const CHERRY = '🍒'

var gBoard;
var gGame = {
    score: 0,
    isOn: false,
    foodOnBoard: 0,
    eatenFood: 0
}

function init() {
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    // console.table(gBoard)
    printMat(gBoard, '.board-container')
    gGame.isOn = true;
    // console.log(gGame.foodOnBoard);
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            gGame.foodOnBoard += 1
            // console.log(gGame.foodOnBoard);
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
                gGame.foodOnBoard -= 1;
                // console.log(gGame.foodOnBoard);
            }
            if (i === 1 && j === 1 || i === 1 && j === (SIZE - 2) || i === (SIZE - 2) && j === 1 || i === (SIZE - 2) && j === (SIZE - 2)) {
                board[i][j] = power;
            }
        }
    }
    return board;
}

function updateScore(point) {

    gGame.score += point;
    // console.log(gGame.score)
    // console.log(gGame.foodOnBoard)
    document.querySelector('h2 span').innerText = gGame.score;
}

function gameOver(status) {
    clearInterval(cherryInterval);
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY);
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'block';
    var elSpan = document.querySelector('.game');
    elSpan.innerText = status 
}

function restart() {
    gGame.score = 0;
    gGame.foodOnBoard = 0;
    gGame.eatenFood = 0;
    init();
    document.querySelector('h2 span').innerText = gGame.score;
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
}

function addCherry() {
    var emptyCells = findEmptyCell();
    if(!emptyCells[0]) return;
    var idx = getRandomIntInclusive(0, emptyCells.length - 1);
    var choseacell = emptyCells[idx];
    gBoard[choseacell.i][choseacell.j] = CHERRY;
    renderCell(choseacell, CHERRY);
}

function findEmptyCell() {
    var emptyCells = [];
    for (var i = 1; i < gBoard.length - 1; i++) {
        for (var j = 1; j < gBoard.length - 1; j++) {
            if (j === 3 && i > 4 && i < gBoard.length - 2) continue;
            var cellPos = { i: i, j: j }
            if (gBoard[i][j] === EMPTY) {
                emptyCells.push(cellPos);
            }
        }
    }
    return emptyCells;
}

function boardShaow() {
    var elBoard = document.querySelector('.board-container');
    if(gPacman.isSuper){
        elBoard.style.boxShadow = '4px 4px 29px 17px red';
    } else {
        elBoard.style.boxShadow = '4px 4px 29px 17px white';
    }
}

