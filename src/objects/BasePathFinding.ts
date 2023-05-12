import Cell from "./Cell";
import Settings from "./Settings";

abstract class BasePathFinding {
    constructor(protected grid: Cell[][], public startCoords: [number, number], public endCoords: [number, number]) {}

    abstract Step(): boolean;
    abstract Finish(): Promise<void>;
    abstract InstantSolve(): void;

    protected getValidNeighbours(node: Cell): Cell[] {
        const diagonals = [
            this.grid[node.row - 1] && this.grid[node.col - 1] && this.grid[node.row - 1][node.col - 1],
            this.grid[node.row + 1] && this.grid[node.col - 1] && this.grid[node.row + 1][node.col - 1],
            this.grid[node.row - 1] && this.grid[node.col + 1] && this.grid[node.row - 1][node.col + 1],
            this.grid[node.row + 1] && this.grid[node.col + 1] && this.grid[node.row + 1][node.col + 1]
        ];
        //with diagonals
        const neighbours: Cell[] = [
            this.grid[node.row - 1] && this.grid[node.row - 1][node.col],
            this.grid[node.row + 1] && this.grid[node.row + 1][node.col],
            this.grid[node.row] && this.grid[node.row][node.col - 1],
            this.grid[node.row] && this.grid[node.row][node.col + 1],
            ...(Settings.CUSTOMS.useDiagonals ? diagonals : [])
        ];
        return neighbours.filter(Boolean);
    }
}

export default BasePathFinding;
