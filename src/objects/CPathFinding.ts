import Cell, { CellType } from "./Cell";
import Settings from "./Settings";

class Path {
    constructor(private grid: Cell[][], public startCoords: [number, number], public endCoords: [number, number]) {}

    private foundPath = 0;
    private currentIteration = 0;

    private getValidNeighbours(node: Cell): Cell[] {
        //with diagonals
        const neighbours: Cell[] = [
            this.grid[node.row - 1] && this.grid[node.row - 1][node.col],
            this.grid[node.row + 1] && this.grid[node.row + 1][node.col],
            this.grid[node.row] && this.grid[node.row][node.col - 1],
            this.grid[node.row] && this.grid[node.row][node.col + 1],
            // TODO make work without diagonals
            this.grid[node.row - 1] && this.grid[node.col - 1] && this.grid[node.row - 1][node.col - 1],
            this.grid[node.row + 1] && this.grid[node.col - 1] && this.grid[node.row + 1][node.col - 1],
            this.grid[node.row - 1] && this.grid[node.col + 1] && this.grid[node.row - 1][node.col + 1],
            this.grid[node.row + 1] && this.grid[node.col + 1] && this.grid[node.row + 1][node.col + 1]
        ];
        return neighbours.filter(Boolean);
    }

    public Step() {
        this.currentIteration++;
        const startCell = this.grid[this.startCoords[0]][this.startCoords[1]];
        startCell.data.distance = 0;

        const openList = this.grid.reduce(
            (acc, val) => acc.concat(val.filter(cell => cell.type === CellType.Open)),
            []
        );
        if (openList.length == 0) {
            openList.push(startCell);
        }
        for (let cell of openList) {
            const neighbours = this.getValidNeighbours(cell);
            // console.log(cell.type, cell);
            for (let node of neighbours) {
                if (node.type == CellType.End && this.foundPath == 0) {
                    this.grid[this.endCoords[0]][this.endCoords[1]].data.distance = this.currentIteration + 1;
                    console.log(this.endCoords);
                    this.foundPath = this.currentIteration;
                    break;
                }
                if (node.type != CellType.Empty) continue;
                node.type = CellType.Open;
                //console.log("Open", node.row, node.col, `neighbour of: ${cell.row}, ${cell.col}`);
            }
            cell.data.distance = this.currentIteration;
            cell.type = CellType.Closed;
            //console.log("Close", cell.row, cell.col);
        }
        console.log(this.currentIteration, ">", this.foundPath, "&&", this.foundPath > 0);
        if (this.currentIteration > this.foundPath && this.foundPath > 0) {
            console.log("finish ");
            return true;
        }
    }

    public async BackTrace() {
        if (!this.foundPath) return;
        const endCell = this.grid[this.endCoords[0]][this.endCoords[1]];
        let currentCell = endCell;
        let currentSmallest = this.currentIteration;
        console.log(this.foundPath, currentCell.row, currentCell.col, currentSmallest);
        while (currentSmallest > 0) {
            // console.log("Backtrace", currentCell.row, currentCell.col, currentSmallest);
            const neighbours = this.getValidNeighbours(currentCell);
            for (let node of neighbours) {
                console.log("Backtrace", node.row, node.col, node.data.distance, currentSmallest);
                if (node.data.distance < currentSmallest) {
                    node.type = CellType.Route;
                    currentSmallest = node.data.distance;
                    currentCell = node;
                    console.log("found a route");
                    break;
                }
            }
        }
    }
}

export default Path;
