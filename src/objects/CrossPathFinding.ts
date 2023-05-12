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
    
    private getDirections(startCoordinates: [number, number], grid: string[][]) {
        const distanceFromTop = startCoordinates[0];
        const distanceFromLeft = startCoordinates[1];
        const location = {
          distanceFromTop,
          distanceFromLeft,
          path: [],
          status: "Start"
        };
        const queue = [location];
      
        while (queue.length > 0) {
          const currentLocation = queue.shift();
          const directions = ["North", "East", "South", "West"];
          for (let i = 0; i < directions.length; i++) {
            const newLocation = exploreInDirection(
              currentLocation,
              directions[i],
              grid
            );
            if (newLocation.status === "Goal") {
              return newLocation.path;
            } else if (newLocation.status === "Valid") {
              queue.push(newLocation);
            }
          }
        }
      
        return false;
      }
      
      private exploreInDirection(
        currentLocation: {
          distanceFromTop: number;
          distanceFromLeft: number;
          path: string[];
          status: string;
        },
        direction: string,
        grid: string[][]
      ) {
        const newPath = currentLocation.path.slice();
        newPath.push(direction);
      
        let row = currentLocation.distanceFromTop;
        let col = currentLocation.distanceFromLeft;
      
        if (direction === "North") {
          row -= 1;
        } else if (direction === "East") {
          col += 1;
        } else if (direction === "South") {
          row += 1;
        } else if (direction === "West") {
          col -= 1;
        }
      
        if (
          row < 0 ||
          row >= grid.length ||
          col < 0 ||
          col >= grid[0].length ||
          grid[row][col] === "Visited"
        ) {
          return { status: "Invalid", path: [] };
        }
      
        if (grid[row][col] === "Goal") {
          return { status: "Goal", path: newPath };
        } else {
          return { status: "Valid", path: newPath, distanceFromTop: row, distanceFromLeft: col };
        }
      }

    }
