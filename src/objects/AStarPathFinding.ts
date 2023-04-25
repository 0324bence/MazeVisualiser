import BasePathFinding from "./BasePathFinding";
import Cell, { CellType } from "./Cell";

type Coords = [number, number];

class AStarPathFinding extends BasePathFinding {
    constructor(grid: Cell[][], startCoords: Coords, endCoords: Coords) {
        super(grid, startCoords, endCoords);
        this.position = startCoords;
    }

    private position: Coords;

    private GetDistance(pos1: Coords, pos2: Coords): number {
        let rowDiff = Math.abs(pos1[0] - pos2[0]);
        let colDiff = Math.abs(pos1[1] - pos2[1]);
        return Math.sqrt(rowDiff*rowDiff+colDiff*colDiff);
    }

    private GetDistance2(pos1: Coords, pos2: Coords): number {
        return Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1])
    }

    public GetCell(pos: Coords): Cell {
        return this.grid[pos[0]][pos[1]];
    }

    private getValidNeighbours(node: Cell): Cell[] {
        //with diagonals
        const neighbours: Cell[] = [
            this.grid[node.row - 1] && this.grid[node.row - 1][node.col],
            this.grid[node.row + 1] && this.grid[node.row + 1][node.col],
            this.grid[node.row] && this.grid[node.row][node.col - 1],
            this.grid[node.row] && this.grid[node.row][node.col + 1],

            this.grid[node.row - 1] && this.grid[node.col - 1] && this.grid[node.row - 1][node.col - 1],
            this.grid[node.row + 1] && this.grid[node.col - 1] && this.grid[node.row + 1][node.col - 1],
            this.grid[node.row - 1] && this.grid[node.col + 1] && this.grid[node.row - 1][node.col + 1],
            this.grid[node.row + 1] && this.grid[node.col + 1] && this.grid[node.row + 1][node.col + 1]
        ];
        return neighbours.filter(Boolean)
                .filter(x => x.type == CellType.Open || x.type == CellType.Empty || x.type == CellType.End);
    }

    public Step(): boolean {
        console.log("Stepping");

        const cell = this.GetCell(this.position);

        let neighs = this.getValidNeighbours(cell);
        for (let neigh of neighs) {
            if (neigh.type == CellType.End) {
                console.log("End");
                this.position = [neigh.row, neigh.col] as Coords;
                return true;
            }
            //neigh.data.gScore = Math.round(this.GetDistance([neigh.row, neigh.col] as Coords, this.startCoords) * 10);
            //neigh.data.hScore = Math.round(this.GetDistance([neigh.row, neigh.col] as Coords, this.endCoords) * 10);
            neigh.data.gScore = (cell.data.gScore || 0) + Math.round(this.GetDistance([neigh.row, neigh.col] as Coords, this.position) * 10);
            neigh.data.hScore = neigh.data.hScore || Math.round(this.GetDistance([neigh.row, neigh.col] as Coords, this.endCoords) * 10);
            neigh.data.fScore = neigh.data.gScore + neigh.data.hScore;
            neigh.type = CellType.Open;
        }

        //let minF = Number.MAX_SAFE_INTEGER;
        let nextCell;
        neighs.sort(
            (x, y) => x.data.fScore - y.data.fScore || x.data.hScore - y.data.hScore
        );
        neighs.forEach(neigh => {
            console.log(neigh.data.fScore, neigh.data.hScore);
        });
        nextCell = neighs[0];
        if (nextCell.type == CellType.End) {
            console.log("End");
            return true;
        }
        //for (let neigh of neighs) {
        //    console.log(neigh.data.fScore);
        //    if (neigh.data.fScore < minF) {
        //        minF = neigh.data.fScore;
        //        nextCell = neigh;
        //    }
        //}
        if (nextCell) {
            nextCell.type = CellType.Current;
            cell.type = CellType.Closed;
            this.position = [nextCell?.row, nextCell?.col] as Coords;
        } else {
            console.log("No route found")
            return true;
        }

        return false;
    }

    public async Finish() {
        //if (!this.foundPath) return;
        console.log("Backtracing");

        return;
    }
}

export default AStarPathFinding;
export type { Coords };