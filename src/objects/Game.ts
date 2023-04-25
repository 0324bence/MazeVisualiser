import Settings from "./Settings";
import Cell, { CellType } from "./Cell";
//import CPathFinding from "./CPathFinding";
import AStarPathFinding, { Coords } from "./AStarPathFinding";
import BasePathFinding from "./BasePathFinding";
import CPathFinding from "./CPathFinding";

class Game {
    public cells: Cell[][] = new Array(Settings.CELL_COUNT);
    public isRunning = false;
    public pathFinding: BasePathFinding;

    constructor(public ctx: CanvasRenderingContext2D, public canvas: HTMLCanvasElement) {
        for (let row = 0; row < Settings.CELL_COUNT; row++) {
            this.cells[row] = new Array(Settings.CELL_COUNT);
            for (let cell = 0; cell < Settings.CELL_COUNT; cell++) {
                this.cells[row][cell] = new Cell(this.ctx, cell, row);
            }
        }


        const startCoords = [14, 14] as Coords;
        const endCoords = [1, 1] as Coords;

        this.pathFinding = new AStarPathFinding(this.cells, startCoords, endCoords);
        //this.pathFinding = new CPathFinding(this.cells, [5, 5], [Settings.CELL_COUNT - 4, Settings.CELL_COUNT - 4]);

        //start
        this.cells[startCoords[0]][startCoords[1]].type = CellType.Start;

        //End
        this.cells[endCoords[0]][endCoords[1]].type = CellType.End;
    }

    public Click(e: MouseEvent) {
        this.Move(e);
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

    public OnKeyPress(e: KeyboardEvent) {
        if (e.key == " ") {
            this.isRunning = !this.isRunning;
            //console.log(this.isRunning ? "Started" : "Stopped");
            //const success = this.pathFinding.Step();
            //if (success) {
            //    this.isRunning = false;
            //    this.pathFinding.Finish();
            //}
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

    public Step() {
        if (!this.isRunning) return;

        console.log("Stepping");
        const success = this.pathFinding.Step();
        if (success) {
            this.isRunning = false;
            this.pathFinding.Finish();
        }
    }
}

export default Game;
