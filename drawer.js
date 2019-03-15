function display(liveCellColor) {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = board[row][col];
            coloring(liveCellColor || color(0, 0, 0), cell === LIVING);
            rect(col * cellSize, row * cellSize, cellSize, cellSize)
        }
    }
}

function displayOneBlock(row, col, blockColor) {
    coloring(blockColor || color(0, 0, 0), true);
    rect(col * cellSize, row * cellSize, cellSize, cellSize)
}

function coloring(color, condition) {
    if (condition) {
        fill(color)
    } else {
        fill(255, 255, 255)
    }
}

function reDrawSpecialCase() {
    for (let i = 0; i < specialCases.length; i++) {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                changeMatchedColor(row, col, i)
            }
        }
    }
}

function changeMatchedColor(row, col, caseIndex) {
    const matchCase = specialCases[caseIndex];
    const matchList = getMatchList(row, col, matchCase.map);
    if (matchList !== []) {
        for (const match of matchList) {
            displayOneBlock(match.row, match.col, matchCase.color)
        }
    }
}

function getMatchList(startRow, startCol, map) {
    let living = [];
    for (let i = 0; i < map.rows; i++) {
        let rowString = '';
        let rowMap = map.map[i];
        for (let j = 0; j < map.cols; j++) {
            const row = (startRow + rows + i) % rows;
            const col = (startCol + cols + j) % cols;
            const state = board[row][col];
            rowString += state;

            if (state === LIVING) {
                living.push({row: row, col: col})
            }
        }
        if (rowString === rowMap ) {
            continue;
        }
        return [];
    }
    return living;
}

function compileMap(mapString) {
    let map = {};
    map.map = mapString.split('\n');
    map.rows = mapString.match(/\n/g).length + 1;
    map.cols = map.map[0].length;
    return map;
}
