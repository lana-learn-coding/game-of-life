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


