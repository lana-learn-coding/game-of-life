function display(cellSize, liveCellColor) {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = board[row][col];
            coloring(liveCellColor || color(0, 0, 0), cell === 1);
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


