function display(liveCellColor) {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = board[row][col];
            const isLiving = cell > DEAD;
            const isSpecial = cell > LIVING;
            if (isSpecial) {
                const specialColor = specialCases[cell - 2].color;
                coloring(specialColor, isLiving)
            } else {
                coloring(liveCellColor || color(0, 0, 0), isLiving);
            }
            rect(col * cellSize, row * cellSize, cellSize, cellSize)
        }
    }
}

function coloring(color, condition) {
    if (condition) {
        fill(color)
    } else {
        fill(255, 255, 255)
    }
}

function changeSpecialState() {
    for (let i = 0; i < specialCases.length; i++) {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                changeMatchedState(row, col, i)
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



