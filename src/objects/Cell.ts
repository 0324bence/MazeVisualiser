import BaseRect from "./BaseRect";
import Settings from "./Settings";

enum CellType {
    Empty = 0,
    Start,
    End,
    Wall
}

class Cell extends BaseRect {
    public type: CellType = CellType.Empty;
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
