'use strict'
const GHOST = '👻';
const HUNTED = '🥶'
var gGhosts;
var gIntervalGhosts;
var cherryInterval;

// console.log('ghost')
// &#9781;
function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        ghostColor: getRandomColor(),

    }
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;

}

function createGhosts(board) {
    // 3 ghosts and an interval
    gGhosts = [];
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    cherryInterval = setInterval(addCherry, 15000)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    // console.table(gBoard)
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost, i)
    }
}

function moveGhost(ghost, idx) {
    // console.log('ghost.location', ghost.location)
    // figure out moveDiff, nextLocation, nextCell
    var perviosLocation = {
        i: ghost.location.i,
        j: ghost.location.j
    }
    var moveDiff = getMoveDiff()
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    // console.log('nextLocation', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell', nextCell)
    // return if cannot move
    if (nextCell === WALL) {
        ghost.location = perviosLocation
        moveGhost(ghost, idx);
        return;
    }
    if (nextCell === GHOST) {
        ghost.location = perviosLocation;
        moveGhost(ghost, idx);
        return
    }
    // hitting a pacman?  call gameOver
    if (nextCell === PACMAN) {
        if (gPacman.isSuper) {
            ghost.location = perviosLocation;
            moveGhost(ghost, idx);
            return;
        } else {

            status = 'lose';
            gameOver(status);
            return
        }
    }

    // moving from corrent position:
    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // Move the ghost to new location
    // update the model
    ghost.location = {
        i: nextLocation.i,
        j: nextLocation.j
    }
    ghost.currCellContent = nextCell
    gBoard[ghost.location.i][ghost.location.j] = GHOST
    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

// function get

function getGhostHTML(ghost) {
    ghost = (gPacman.isSuper) ? HUNTED : GHOST;
    return `<span>${ghost}</span>`
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

