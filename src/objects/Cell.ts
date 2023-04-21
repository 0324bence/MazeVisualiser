import BaseRect from "./BaseRect";
import Settings from "./Settings";

enum CellType {
    Empty = 0,
    Start,
    End,
    Wall,
    Route,
    Open,
    Closed
}

class Cell extends BaseRect {
    public type: CellType = CellType.Empty;
    public _data: any = {};
    // Create getter and setter for data
    public get data(): any {
        return this._data;
    }
    public set data(value) {
        this._data = value;
    }

    constructor(ctx: CanvasRenderingContext2D, public col: number, public row: number) {
        super(ctx);
    }

    Draw() {
        switch (this.type) {
            case CellType.Empty:
                this.ctx.fillStyle = "#fff";
                break;
            case CellType.Start:
                this.ctx.fillStyle = "#0f0";
                break;
            case CellType.End:
                this.ctx.fillStyle = "#f00";
                break;
            case CellType.Wall:
                this.ctx.fillStyle = "#000";
                break;
            case CellType.Route:
                this.ctx.fillStyle = "#f0f";
                break;
            case CellType.Open:
                this.ctx.fillStyle = "#0ef";
                break;
            case CellType.Closed:
                this.ctx.fillStyle = "#05f";
                break;
        }

        this.ctx.fillRect(
            this.col * Settings.CELL_SIZE,
            this.row * Settings.CELL_SIZE,
            Settings.CELL_SIZE,
            Settings.CELL_SIZE
        );
        //Debug cell numbers

        this.ctx.font = "7px Arial";
        this.ctx.fillStyle = "#000";
        //this.ctx.fillText(`${this.row} ${this.col}`, this.col * Settings.CELL_SIZE, this.row * Settings.CELL_SIZE + 5);
        //this.ctx.fillText(this.data.distance ?? "?", this.col * Settings.CELL_SIZE, this.row * Settings.CELL_SIZE + 5);
    }
}

export default Cell;
export { CellType };
