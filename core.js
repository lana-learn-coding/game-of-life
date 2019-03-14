function create2DArray(rows, cols) {
    let f = [];
    for (let i = 0; i < rows; i++) {
        f[i] = [];
        for (let j = 0; j < cols; j++) {
            f[i][j] = 0;
        }
    }
    return f;
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


