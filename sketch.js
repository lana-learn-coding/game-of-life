var board, specialCases;
var LIVING = 1;
var DEAD = 0;


var boardWidth = 640;
var boardHeight = 480;
var cellSize = 20;

var cols = Math.floor(boardWidth / cellSize);
var rows = Math.floor(boardHeight / cellSize);

var isStarted = false;

function setup() {
    createCanvas(boardWidth, boardHeight);

    setupBoard();
    setupSpecialCases();

    setupStartBtn();
    smooth();
}

function setupBoard() {
    board = [];
    for (let row = 0; row < rows; row++) {
        board[row] = [];
        for (let col = 0; col < cols; col++) {
            board[row][col] = 0;
        }
    }
}

function setupSpecialCases() {
    specialCases = [
        {
            name: 'block',
            map: '0000\n0110\n0110\n0000',
            color: color(100, 20, 60)
        },
        {
            name: 'glider',
            map: '00000\n01000\n00110\n01100\n00000',
            color: color(20, 10, 50)
        }
    ]
}

function setupStartBtn() {
    let btnStart = createButton("Start");
    btnStart.position(0, 500);
    btnStart.mousePressed(onStart);
}


function onStart() {
    isStarted = true;
    board = getBoardNextState();
    setTimeout(onStart,1000)
}


function draw() {
    display();
    if (isStarted) reDrawSpecialCase();
}

function mousePressed() {
    const col = parseInt(mouseX / 20);
    const row = parseInt(mouseY / 20);
    seeding(row, col);
}

function seeding(row, col) {
    if (board[row][col] === DEAD) {
        board[row][col] = LIVING
    } else {
        board[row][col] = DEAD
    }
}

