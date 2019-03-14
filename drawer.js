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

function matchMap(row, col, resolvedMap) {
    for (let i = 0; i < resolvedMap.rows; i++) {
        let rowString = '';
        let rowRegex = resolvedMap.regex[i];
        for (let j = 0; j < resolvedMap.cols; j++) {
            rowString += getState(row + i, col + j)
        }
        if (rowString.match(rowRegex)) {
            continue;
        }
        return false;
    }
    return true;
}

function changeMatchedColor(row, col, caseIndex) {
    const specialCase = specialCases[caseIndex];
    const resolvedMap = resolveMap(specialCase.map);
    const isMatch = matchMap(row, col, resolvedMap);
    if (isMatch) {
        for (let i = 0; i < resolvedMap.rows; i++) {
            for (let j = 0; j < resolvedMap.cols; j++) {
                const currentRow = (row + rows + i) % rows;
                const currentCol = (col + cols + j) % cols;
                const currentState = board[currentRow][currentCol];

                if (currentState === LIVING) {
                    displayOneBlock(currentRow, currentCol, specialCase.color)
                }
            }
        }
    }
}

function resolveMap(mapString) {
    let resolvedMap = {
        regex: mapString.split('\n'),
    };
    resolvedMap.rows = mapString.match(/\n/g).length + 1;
    resolvedMap.cols = resolvedMap.regex[0].length;
    resolvedMap.regex = resolvedMap.regex.map(regexString => new RegExp(regexString));
    return resolvedMap;
}
