var board;
var cellSize = 20;
var rows, cols;

function setup() {
    createCanvas(640, 480);
    rows = floor(480 / cellSize);
    cols = floor(640 / cellSize);
    board = create2DArray(rows, cols);
    const btnStart = createButton("Start");
    btnStart.position(0, 500);
    btnStart.mousePressed(onStart);
    smooth();

}

function onStart() {
    let newBoard = create2DArray(rows, cols);
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = board[row][col];
            const numberOfSurroundCell = getNumberOfSurroundCell(row, col);
            newBoard[row][col] = cell;
            if (cell === 0) {
                if (numberOfSurroundCell === 3) {
                    newBoard[row][col] = 1
                }
                continue;
            }
            if (numberOfSurroundCell > 3 || numberOfSurroundCell < 2) {
                newBoard[row][col] = 0
            }
        }
    }
    board = newBoard;
    draw();
    setTimeout(onStart, 1000)
}

function getNumberOfSurroundCell(row, col) {
    let numberOfSurround = 0;
    const checkList = [-1, 0, 1];
    for (let i of checkList) {
        for (let j of checkList) {
            numberOfSurround += checkState(row + j, col + i);
        }
    }
    numberOfSurround -= checkState(row, col);
    return numberOfSurround;
}

function checkState(row, col) {
    row = (row + rows) % rows;
    col = (col + cols) % cols;
    return board[row][col]
}

function draw() {
    display(cellSize);
}

function mousePressed() {
    const col = parseInt(mouseX / 20);
    const row = parseInt(mouseY / 20);
    seeding(row, col);
}

