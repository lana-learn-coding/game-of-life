var board = [[]];
var cellSize = 20;
var rows = Math.floor(480 / cellSize);
var cols = Math.floor(640 / cellSize);

var specialCase = [];

function setup() {
    createCanvas(640, 480);
    board = create2DArray(rows, cols);
    setUpSpecialCase();

    const btnStart = createButton("Start");
    btnStart.position(0, 500);
    btnStart.mousePressed(onStart);

    smooth();
}

function setUpSpecialCase() {
    specialCase = [
        {
            name: 'block',
            map: '0000\n0110\n0110\n0000',
            color: color(100, 20, 60)
        }
    ]
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
    setTimeout(onStart, 1000)
}


function draw() {
    display(cellSize);
}

function mousePressed() {
    const col = parseInt(mouseX / 20);
    const row = parseInt(mouseY / 20);
    seeding(row, col);
}

function seeding(row, col) {
    board[row][col] = 1 - board[row][col]; //if = 0 then turn to 1
}

