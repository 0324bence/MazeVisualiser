import BaseRect from "./BaseRect";
import Settings from "./Settings";

enum CellType {
    Empty = 0,
    Start,
    End,
    Wall,
    Route,
    Open,
    Closed,
    Current
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
            case CellType.Current:
                this.ctx.fillStyle = "yellow";
                break;
        }

        this.ctx.fillRect(
            this.col * Settings.CELL_SIZE,
            this.row * Settings.CELL_SIZE,
            Settings.CELL_SIZE,
            Settings.CELL_SIZE
        );

        if (Settings.CUSTOMS.showGrid) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = "black";
            this.ctx.lineWidth = 1;
            this.ctx.rect(
                this.col * Settings.CELL_SIZE,
                this.row * Settings.CELL_SIZE,
                Settings.CELL_SIZE,
                Settings.CELL_SIZE
            );
            this.ctx.stroke();
        }
        //Debug cell numbers

        this.ctx.font = `${Settings.CELL_SIZE / 2 / 2}px Arial`;
        this.ctx.fillStyle = "#000";
        const text = `${this.row} ${this.col}`;
        const size = this.ctx.measureText(text);
        //put text to center of a cell
        if (Settings.CUSTOMS.showCoords) {
            this.ctx.fillText(
                text,
                this.col * Settings.CELL_SIZE + (Settings.CELL_SIZE - size.width) / 2,
                this.row * Settings.CELL_SIZE +
                    (Settings.CELL_SIZE + (size.actualBoundingBoxAscent + size.actualBoundingBoxDescent)) / 2
            );
        }
        //this.ctx.fillText(this.data.distance ?? "?", this.col * Settings.CELL_SIZE, this.row * Settings.CELL_SIZE + 5);
    }
}

export default Cell;
export { CellType };
