function getNumberOfSurroundCell(row, col) {
    let numberOfSurround = 0;
    const checkList = [-1, 0, 1];
    for (let i of checkList) {
        for (let j of checkList) {
            numberOfSurround += getState(row + j, col + i);
        }
    }
    numberOfSurround -= getState(row, col);
    return numberOfSurround;
}

function getState(row, col) {
    row = (row + rows) % rows;
    col = (col + cols) % cols;
    return board[row][col]
}


