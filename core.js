function getBoardNextState() {
    let newBoard = [];
    for (let row = 0; row < rows; row++) {
        newBoard[row] = [];
        for (let col = 0; col < cols; col++) {
            const currentCellState = board[row][col];
            const numberOfSurroundCell = getNumberOfSurroundCell(row, col);
            newBoard[row][col] = getCellNextState(currentCellState, numberOfSurroundCell);
        }
    }
    return newBoard;
}


function getNumberOfSurroundCell(row, col) {
    let numberOfSurround = 0;
    const checkList = [-1, 0, 1];
    for (let i of checkList) {
        for (let j of checkList) {
            const cell = getState(row + j, col + i);
            if (cell > DEAD)
                numberOfSurround += 1;
        }
    }
    if (getState(row, col) > DEAD) {
        numberOfSurround -= 1;
    }
    return numberOfSurround;
}

function getState(row, col) {
    row = (row + rows) % rows;
    col = (col + cols) % cols;
    return board[row][col]
}

function getCellNextState(currentState, numberOfSurround) {
    const isDead = currentState === DEAD;

    const reproduction = numberOfSurround === 3;
    const overpopulation = numberOfSurround > 3;
    const underpopulation = numberOfSurround < 2;

    if (isDead && reproduction) {
        return LIVING;
    }
    if (!isDead && (overpopulation || underpopulation)) {
        return DEAD;
    }
    if (currentState > DEAD) {
        return LIVING;
    }
    return DEAD;
}


