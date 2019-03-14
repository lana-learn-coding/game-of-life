class Cell {
    constructor(row, col) {
        this.col = col % cols;
        this.row = row % rows;
        this.state = board[this.col][this.row]
    }

    static from(cell) {
        return new Cell(cell.row, cell.col)
    }
}