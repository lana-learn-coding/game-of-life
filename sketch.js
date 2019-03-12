var board;
var wcell = 20;
var rows, cols;

function setup() {
    createCanvas(640, 480);
    rows = floor(4810 / wcell);
    cols = floor(640 / wcell);
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
    const defaultEdgeState = 0;
    const isOutOfRow = row >= rows || row < 0;
    const isOutOfCol = col >= cols || col < 0;
    if (isOutOfRow || isOutOfCol)
        return defaultEdgeState;
    return board[row][col]
}

function draw() {
    display(board, wcell);
}

function mousePressed() {
    const col = (int)(mouseX / 20);
    const row = (int)(mouseY / 20);
    seeding(row, col, board);
}

