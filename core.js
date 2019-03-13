function display(board, size) {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = board[row][col];
            coloring(color(0, 0, 0),cell === 1);
            rect(col * size, row * size, size, size)
        }
    }
}

function seeding(row, col, board) {
    board[row][col] = 1 - board[row][col]; //if = 0 then turn to 1
    return board;

}

function coloring(color, condition) {
    if (condition) {
        fill(color)
    } else {
        fill(255, 255, 255)
    }
}

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
