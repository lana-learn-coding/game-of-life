var board, specialCases;
var LIVING = 1;
var DEAD = 0;

var boardWidth = 640;
var boardHeight = 480;
var cellSize = 20;

var cols = Math.floor(boardWidth / cellSize);
var rows = Math.floor(boardHeight / cellSize);

var speed = 2;

function setup() {
    createCanvas(boardWidth, boardHeight);

    setupBoard();
    setupStartBtn();
    setupSpecialCases();

    noLoop();
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

function setupStartBtn() {
    const btnStart = createButton("Start");
    btnStart.position(0, 500);
    btnStart.mousePressed(onStart);
}

function setupSpecialCases() {
    specialCases = [
        {
            name: 'block',
            map: compileMap('0000\n0110\n0110\n0000'),
            color: color(100, 20, 30)
        },
        {
            name: 'glider',
            map: compileMap('00000\n01000\n00110\n01100\n00000'),
            color: color(40, 80, 20)
        }
    ]
}

function mousePressed() {
    const col = parseInt(mouseX / 20);
    const row = parseInt(mouseY / 20);
    seeding(row, col);
    draw();
}

function seeding(row, col) {
    if (board[row][col] === DEAD) {
        board[row][col] = LIVING
    } else {
        board[row][col] = DEAD
    }
}

function onStart() {
    board = getBoardNextState();
    changeSpecialState();
    draw();
    setTimeout(onStart, 1000 / speed);
}

function draw() {
    display();
}
