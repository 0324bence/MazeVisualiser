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
        return Math.sqrt(rowDiff + colDiff);
    }

    //private GetDistance(pos1: Coords, pos2: Coords): number {
    //    return Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1])
    //}

    public GetCell(pos: Coords): Cell {
        return this.grid[pos[0]][pos[1]];
    }

    protected getValidNeighbours(node: Cell): Cell[] {
        return super.getValidNeighbours(node)
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
            neigh.data.gScore = Math.ceil(this.GetDistance([neigh.row, neigh.col] as Coords, this.startCoords) * 10);
            neigh.data.hScore = Math.floor(this.GetDistance([neigh.row, neigh.col] as Coords, this.endCoords) * 10);
            neigh.data.fScore = neigh.data.gScore + neigh.data.hScore;
            neigh.type = CellType.Open;
        }

        let minF = Number.MAX_SAFE_INTEGER;
        let nextCell;
        for (let neigh of neighs) {
            console.log(neigh.data.fScore);
            if (neigh.data.fScore < minF) {
                minF = neigh.data.fScore;
                nextCell = neigh;
            }
        }
        console.log(minF);
        if (nextCell) {
            nextCell.type = CellType.Current;
            cell.type = CellType.Closed;
            this.position = [nextCell?.row, nextCell?.col] as Coords;
        } else {
            console.log("No route found");
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
