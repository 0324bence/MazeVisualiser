import BasePathFinding from "./BasePathFinding";
import Cell, { CellType } from "./Cell";

class CrossPathFinding extends BasePathFinding{
    
    constructor(grid: Cell[][], startCoords: [number, number], endCoords: [number, number]) {
        super(grid, startCoords, endCoords);
    }

    Step(): boolean {
        throw new Error("Method not implemented.");
    }
    Finish(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    private getNeighbours(node: Cell, distance: number): (Cell|undefined)[] {
        //with diagonals
        const neighbours: Cell[] = [
            this.grid[node.row - distance] && this.grid[node.row - distance][node.col],
            this.grid[node.row + distance] && this.grid[node.row + distance][node.col],
            this.grid[node.row] && this.grid[node.row][node.col - distance],
            this.grid[node.row] && this.grid[node.row][node.col + distance]
            // this.grid[node.row - 1] && this.grid[node.col - 1] && this.grid[node.row - 1][node.col - 1],
            // this.grid[node.row + 1] && this.grid[node.col - 1] && this.grid[node.row + 1][node.col - 1],
            // this.grid[node.row - 1] && this.grid[node.col + 1] && this.grid[node.row - 1][node.col + 1],
            // this.grid[node.row + 1] && this.grid[node.col + 1] && this.grid[node.row + 1][node.col + 1]
        ];
        return neighbours.map(i => i && i.type === CellType.Wall ? undefined : i);
    }
    
    private getDirection(node: Cell): Cell[] {
    
        var bools  = [true,true,true,true]
        var cells = new Array<Array<Cell>>(4).fill(new Array<Cell>(0))
  

        var distance = 1;
        while(bools.includes(true)){
            var neighbours = this.getValidNeighbours(node, distance);
            
            for (var i = 0; i < neighbours.length; i++){
                if (!neighbours[i]){
                    cells[i].push(neighbours[i]!)
                }
            }

            distance++;
        }
    
        return new Array;
    
    }


}