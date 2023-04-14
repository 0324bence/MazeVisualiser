import Settings from "./Settings";
import Cell, { CellType } from "./Cell";

class Game {
    public cells: Cell[][] = new Array(Settings.CELL_COUNT);
    constructor(public ctx: CanvasRenderingContext2D, public canvas: HTMLCanvasElement) {
        for (let row = 0; row < Settings.CELL_COUNT; row++) {
            this.cells[row] = new Array(Settings.CELL_COUNT);
            for (let cell = 0; cell < Settings.CELL_COUNT; cell++) {
                this.cells[row][cell] = new Cell(this.ctx, cell, row);
            }
        }
    }

    public Move(e: MouseEvent) {
        if (e.buttons === 1) {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const col = Math.floor(x / Settings.CELL_SIZE);
            const row = Math.floor(y / Settings.CELL_SIZE);
            if (col < 0 || col >= Settings.CELL_COUNT || row < 0 || row >= Settings.CELL_COUNT) return;
            this.cells[row][col].type = CellType.Wall;
        }
    }
    public Loop() {
        this.ctx.clearRect(0, 0, Settings.SIZE, Settings.SIZE);
        for (let row in this.cells) {
            for (let cell in this.cells[row]) {
                this.cells[row][cell].Draw();
            }
        }
    }
}

export default Game;
