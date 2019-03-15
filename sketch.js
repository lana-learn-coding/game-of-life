var board, specialCases;
var LIVING = 1;
var DEAD = 0;

var boardWidth = 640;
var boardHeight = 480;
var cellSize = 20;

var cols = Math.floor(boardWidth / cellSize);
var rows = Math.floor(boardHeight / cellSize);

var speed = 1;

function onStart() {
    board = getBoardNextState();
    changeSpecialState();
}

function draw() {
    display();
}

function setup() {
    createCanvas(boardWidth, boardHeight);

    setupBoard();
    setupStartBtn();
    setupSpecialCases();

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

function compileMap(mapString) {
    let map = {
        regex: mapString.split('\n'),
    };
    map.rows = mapString.match(/\n/g).length + 1;
    map.cols = map.regex[0].length;
    map.regex = map.regex.map(regexString => new RegExp(regexString));
    return map;
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