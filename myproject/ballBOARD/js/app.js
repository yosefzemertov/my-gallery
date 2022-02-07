var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GAMER = 'GAMER';
var GLUE = 'glue';

var GAMER_IMG = '<img src="img/gamer.png" />';
var BALL_IMG = '<img src="img/ball.png" />';
var GLUE_ING = '<img src="img/candy.png" />';

var gBoard;
var gGamerPos;
var ballInterval;
var gcounterBalls = 2;
var gEatingBall = 0;
var audioEat = new Audio('sound/01.mp3');
var isGlue = false;
var addGlueInterval;

function initGame() {
	gGamerPos = { i: 2, j: 9 };
	gBoard = buildBoard();
	renderBoard(gBoard);
	ballInterval = setInterval(addBall, 1800);
	gcounterBalls = 2;
	gEatingBall = 0;
	addGlueInterval = setInterval(addGlue, 5000)
}


function buildBoard() {
	// Create the Matrix
	var board = createMat(10, 12)


	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			// Put FLOOR in a regular cell
			var cell = { type: FLOOR, gameElement: null };

			// Place Walls at edges
			if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
				cell.type = WALL;
				if (j === 5 || i === 5) cell.type = FLOOR;
			}

			// Add created cell to The game board
			board[i][j] = cell;
		}
	}

	// Place the gamer at selected position
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	// Place the Balls (currently randomly chosen positions)
	board[3][8].gameElement = BALL;
	board[7][4].gameElement = BALL;

	// console.log(board);
	return board;
}

// Render the board to an HTML table
function renderBoard(board) {

	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			// TODO - change to short if statement
			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';

			//TODO - Change To template string
			strHTML += '\t<td class="cell ' + cellClass +
				'"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			// TODO - change to switch case statement
			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}

	// console.log('strHTML is:');
	// console.log(strHTML);
	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;
}

// Move the player to a specific location

function moveTo(i, j) {
	if (isGlue) return;
	// clearInterval(glueInterval);
	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;

	// Calculate distance to make sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);
	var iSrcrePassing = Math.abs(i - gGamerPos.i);
	var jSrcrePassing = Math.abs(j - gGamerPos.j);
	// If the clicked Cell is one of the four allowed
	if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0) || (iSrcrePassing === 9) || (jSrcrePassing === 11)) {

		if (targetCell.gameElement === BALL) {
			console.log('Collecting!');
			gcounterBalls--
			gEatingBall++
			if (gcounterBalls === 0) endGame()
			audioEat.play();
		}

		if (targetCell.gameElement === GLUE) {
			isGlue = true;
			setTimeout(function () {
				isGlue = false;
			}, 3000)
		};

		// if (isGlue) {
		// 	var glueInterval = setInterval(moveTo, 3000);
		// 	console.log('lll');
		// }
		// isGlue = false;
		// MOVING from current position
		// Model:
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		// Dom:
		renderCell(gGamerPos, '');

		// MOVING to selected position
		// Model:
		gGamerPos.i = i;
		gGamerPos.j = j;
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
		// DOM:
		renderCell(gGamerPos, GAMER_IMG);

	} // else console.log('TOO FAR', iAbsDiff, jAbsDiff);
}


// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {

	var i = gGamerPos.i;
	var j = gGamerPos.j;

	var lastColumn = gBoard[0].length - 1
	var lastRow = gBoard.length - 1

	switch (event.key) {
		case 'ArrowLeft':
			if (j === 0) {
				moveTo(5, lastColumn);
				break;
			}
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			if (j === lastColumn) {
				moveTo(5, 0)
				break
			}
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			if (i === 0) {
				moveTo(lastRow, 5);
				break
			}
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			if (i === lastRow) {
				moveTo(0, 5);
				break
			}
			moveTo(i + 1, j);
			break;

	}

}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

function findEmptyCell() {
	var emptyIdx = [];
	for (var i = 0; i < gBoard.length; i++) {
		if (i === 0 || i === gBoard.length - 1) continue;
		// console.log(gBoard.length - 1)
		for (var j = 0; j < gBoard[0].length; j++) {
			if (j === 0 || j === gBoard[0].length - 1) continue;
			// console.log('j',j)
			var cellPos = { i: i, j: j }
			if (!gBoard[i][j].gameElement) {
				emptyIdx.push(cellPos);
			}
		}
	}
	return emptyIdx;
}

function addBall() {
	var emptyIdx = findEmptyCell()
	var chooseCell = GetRandomNumber(0, emptyIdx.length)
	gBoard[emptyIdx[chooseCell].i][emptyIdx[chooseCell].j].gameElement = BALL
	// console.log(gBoard);
	renderCell(emptyIdx[chooseCell], BALL_IMG);
	gcounterBalls++
}

function endGame() {
	clearInterval(ballInterval);
	var restBtn = document.querySelector('.restart');
	restBtn.style.display = 'block';
	var elGreet = document.querySelector('.win');
	elGreet.style.display = 'block';
	clearInterval(addGlueInterval);
}

function restart(elBtn) {
	initGame()
	elBtn.style.display = 'none'
	var elGreet = document.querySelector('.win');
	elGreet.style.display = 'none';

}

function addGlue() {
	var emptyIdx = findEmptyCell();
	var chooseCell = GetRandomNumber(0, emptyIdx.length);
	gBoard[emptyIdx[chooseCell].i][emptyIdx[chooseCell].j].gameElement = GLUE;
	renderCell(emptyIdx[chooseCell], GLUE_ING);
	setTimeout(function () {
		if (gBoard[emptyIdx[chooseCell].i][emptyIdx[chooseCell].j].gameElement === GLUE) {
			gBoard[emptyIdx[chooseCell].i][emptyIdx[chooseCell].j].gameElement = null
			renderCell(emptyIdx[chooseCell], '');

		}
	}, 3000)
}