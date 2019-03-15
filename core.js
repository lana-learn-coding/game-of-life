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

function changeSpecialState() {
    for (let i = 0; i < specialCases.length; i++) {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                changeMatchedState(row, col, i);
            }
        }
    }
}

function changeMatchedState(row, col, caseIndex) {
    const matchCase = specialCases[caseIndex];
    const matchList = getMatchList(row, col, matchCase.map);
    if (matchList !== []) {
        for (const match of matchList) {
            board[match.row][match.col] = caseIndex + 2;
        }
    }
}

function getMatchList(startRow, startCol, map) {
    let living = [];
    for (let i = 0; i < map.rows; i++) {
        let rowString = '';
        let rowRegex = map.regex[i];
        for (let j = 0; j < map.cols; j++) {
            const row = (startRow + rows + i) % rows;
            const col = (startCol + cols + j) % cols;
            const state = board[row][col];
            rowString += state;

            if (state === LIVING) {
                living.push({row: row, col: col})
            }
        }
        if (rowString.match(rowRegex)) {
            continue;
        }
        return [];
    }
    return living;
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
