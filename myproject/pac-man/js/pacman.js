'use strict'
const PACMAN = '<img class="pac" src="image/pac.png" />';

var gPacman;
var status;
var eatenGhost = [];
function createPacman(board) {
    gPacman = {
        location: {
            i: 5,
            j: 7
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
    gGame.foodOnBoard -= 1
}

function movePacman(ev) {
    if (!gGame.isOn) return
var elBoard = document.querySelector('.board-container');
elBoard.id = 'llll'
console.log(elBoard);
    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell', nextCell)
    // return if cannot move
    if (nextCell === WALL) return
    // hitting a ghost?  call gameOver
    if (nextCell === GHOST) {
        if (!gPacman.isSuper) {
            gameOver('lose');
            return;
        } else {
            takeOutGhost(nextLocation);
            checkVictory();
        }
        // else {
        //     for (var i = 0; i < gGhosts.length; i++) {
        //         if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {

        //         }
        //     }
        // }
    }

    if (nextCell === CHERRY) {
        updateScore(15);

    }
    if (nextCell === FOOD) {
        gGame.eatenFood += 1;
        updateScore(1);
        checkVictory();
    }
    if (nextCell === power) {
        if (gPacman.isSuper) return;
        gGame.eatenFood += 1;
        updateScore(1);
        checkVictory();
        powerFood();
    }


    // moving from corrent position:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // Move the pacman to new location
    // update the model
    gPacman.location = {
        i: nextLocation.i,
        j: nextLocation.j
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // update the DOM
    renderCell(gPacman.location, PACMAN)
    rotatePac(ev);
}

function getNextLocation(keyboardEvent) {
    // console.log('keyboardEvent.code', keyboardEvent.code)
    // figure out nextLocation

    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (keyboardEvent.code) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        default: return null
    }
    return nextLocation;
}

function checkVictory() {
    if (gGame.foodOnBoard === gGame.eatenFood) gameOver('win');
}

function powerFood() {
    gPacman.isSuper = true;
    eatenGhost = [];
    for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].ghostColor = HUNTED;
        getGhostHTML(gGhosts[i]);
    }
    boardShaow()
    setTimeout(function () {
        if (eatenGhost[0]) gGhosts.push(eatenGhost.pop());
        for (var i = 0; i < gGhosts.length; i++) {
            gGhosts[i].ghostColor = getRandomColor();
            gPacman.isSuper = false;
            if (eatenGhost[0]) gGhosts.push(eatenGhost.pop());
            getGhostHTML(gGhosts[i]);
        }
        boardShaow()
    }, 5000);
}


function takeOutGhost(cordinet) {
    for (var x = 0; x < gGhosts.length; x++) {
        if (gGhosts[x].location.i === cordinet.i && gGhosts[x].location.j === cordinet.j) {
            if (gGhosts[x].currCellContent === FOOD) {
                updateScore(10);
                checkVictory()

            }
            eatenGhost.push(gGhosts[x]);
            gGhosts.splice(x, 1);
        }
    }
}

function rotatePac(arrow) {
    var elPac = document.querySelector('.pac');

    // if (gPacman.location.i === nextLocation.i) {
    //     var digree = (gPacman.location.j < nextLocation.j) ? 'rotate(0deg)' : 'rotate(180deg)'
    // } else {
    //     var digree = (gPacman.location.i < nextLocation.i) ? 'rotate(90deg)' : 'rotate(270deg)'
    // } = digree;
    // elPac.style.transform = 'rotate(90deg)'
    switch (arrow.code) {
        case 'ArrowUp':
            elPac.style.transform = 'rotate(270deg)'
            break;
        case 'ArrowDown':
            elPac.style.transform = 'rotate(90deg)'
            break;
        case 'ArrowLeft':
            elPac.style.transform = 'rotate(180deg)'
            break;
        case 'ArrowRight':
            elPac.style.transform = 'rotate(0deg)'
            break;
    }
}