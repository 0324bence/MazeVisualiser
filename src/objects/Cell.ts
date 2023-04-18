import BaseRect from "./BaseRect";
import Settings from "./Settings";

enum CellType {
    Empty = 0,
    Start,
    End,
    Wall,
    Route,
}

class Cell extends BaseRect {
    public type: CellType = CellType.Empty;
    public g: number = 0;
    public h: number = 0;
    public f: number = 0;
    public parent: Cell | undefined;

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
                this.ctx.fillStyle = "#36f";
                break;
        }

        this.ctx.fillRect(
            this.col * Settings.CELL_SIZE,
            this.row * Settings.CELL_SIZE,
            Settings.CELL_SIZE,
            Settings.CELL_SIZE
        );
    }
}

export default Cell;
export { CellType };
