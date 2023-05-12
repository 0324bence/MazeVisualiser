import Settings from "./Settings";
import Cell, { CellType } from "./Cell";
// import AStarPathFinding, { Coords } from "./AStarPathFinding";
import BasePathFinding from "./BasePathFinding";
import CPathFinding from "./CPathFinding";

class Game {
    public cells: Cell[][] = new Array(Settings.CELL_COUNT);
    public isRunning = false;
    public pathFinding!: BasePathFinding;
    public isFinished = false;
    public clickStartCellType: CellType = CellType.Empty;

    constructor(public ctx: CanvasRenderingContext2D, public canvas: HTMLCanvasElement) {
        this.InitPathFinder();
        this.Reset();
    }

    public Reset() {
        this.isRunning = false;
        this.isFinished = false;

        for (let row = 0; row < Settings.CELL_COUNT; row++) {
            this.cells[row] = new Array(Settings.CELL_COUNT);
            for (let cell = 0; cell < Settings.CELL_COUNT; cell++) {
                this.cells[row][cell] = new Cell(this.ctx, cell, row);
            }
        }

        this.InitPathFinder();

        //start
        this.cells[Settings.CUSTOMS.startPos[0]][Settings.CUSTOMS.startPos[1]].type = CellType.Start;

        //End
        this.cells[Settings.CUSTOMS.endPos[0]][Settings.CUSTOMS.endPos[1]].type = CellType.End;
    }

    private InitPathFinder() {
        this.pathFinding = new CPathFinding(this.cells, Settings.CUSTOMS.startPos, Settings.CUSTOMS.endPos);
    }

    private GetCellAtPixelCoords(x1: number, y1: number): Cell | undefined {
        const rect = this.canvas.getBoundingClientRect();
        const x = x1 - rect.left;
        const y = y1 - rect.top;
        const col = Math.floor(x / Settings.CELL_SIZE);
        const row = Math.floor(y / Settings.CELL_SIZE);
        if (col < 0 || col >= Settings.CELL_COUNT || row < 0 || row >= Settings.CELL_COUNT) return undefined;
        return this.cells[row][col];
    }

    public Click(e: MouseEvent) {
        const cell = this.GetCellAtPixelCoords(e.clientX, e.clientY);
        if (!cell) return;
        this.clickStartCellType = cell.type;
        this.Move(e);
    }

    public Move(e: MouseEvent) {
        if (this.isRunning) return;
        if (e.buttons === 1) {
            const cell = this.GetCellAtPixelCoords(e.clientX, e.clientY);
            if (!cell) return;
            const startCell = this.cells[Settings.CUSTOMS.startPos[0]][Settings.CUSTOMS.startPos[1]];
            const endCell = this.cells[Settings.CUSTOMS.endPos[0]][Settings.CUSTOMS.endPos[1]];
            switch (this.clickStartCellType) {
                case CellType.Start:
                    if (cell.type == CellType.End || cell.type == CellType.Wall) {
                        return;
                    }
                    startCell.type = CellType.Empty;
                    cell.type = CellType.Start;

                    Settings.CUSTOMS.startPos = [cell.row, cell.col];
                    this.InitPathFinder();
                    if (this.isFinished)
                        this.pathFinding.InstantSolve();
                    break;

                case CellType.End:
                    if (cell.type == CellType.Start || cell.type == CellType.Wall) {
                        return;
                    }
                    endCell.type = CellType.Empty;
                    cell.type = CellType.End;

                    Settings.CUSTOMS.endPos = [cell.row, cell.col];
                    this.InitPathFinder();
                    if (this.isFinished)
                        this.pathFinding.InstantSolve();
                    break;

                default:
                    if (cell.type == CellType.Start || cell.type == CellType.End) {
                        return
                    }
                    cell.type = CellType.Wall;
                    if (this.isFinished)
                        this.pathFinding.InstantSolve();
                    break;
            }
        }
    }

    public OnKeyPress(e: KeyboardEvent) {
        if (e.key == " ") {
            this.Toggle();
        }
    }

    public Toggle() {
        this.isRunning = !this.isRunning;
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
        if (!this.isRunning || this.isFinished) return;

        console.log("Stepping");
        const success = this.pathFinding.Step();
        if (success) {
            this.isRunning = false;
            this.pathFinding.Finish()
            this.isFinished = true;
        }
    }
}

export default Game;
