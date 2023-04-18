import Settings from "./Settings";
import Cell, { CellType } from "./Cell";

class Game {
    public cells: Cell[][] = new Array(Settings.CELL_COUNT);
    public isRunning = false;

    constructor(public ctx: CanvasRenderingContext2D, public canvas: HTMLCanvasElement) {
        for (let row = 0; row < Settings.CELL_COUNT; row++) {
            this.cells[row] = new Array(Settings.CELL_COUNT);
            for (let cell = 0; cell < Settings.CELL_COUNT; cell++) {
                this.cells[row][cell] = new Cell(this.ctx, cell, row);
            }
        }

        this.cells[0][0].type = CellType.Start;
    }

    public Click(e: MouseEvent) {
        this.Move(e);
    }

    public Move(e: MouseEvent) {
        if (e.buttons === 1) {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const col = Math.floor(x / Settings.CELL_SIZE);
            const row = Math.floor(y / Settings.CELL_SIZE);
            if (col < 0 || col >= Settings.CELL_COUNT || row < 0 || row >= Settings.CELL_COUNT) return;
            this.cells[row][col].type = CellType.Wall;
        }
    }

    public OnKeyPress(e: KeyboardEvent) {
        if (e.key == " ") {
            this.isRunning = !this.isRunning;
            console.log((this.isRunning ? "Started" : "Stopped"));

            const result = this.aStar(this.cells[0][0], this.cells[Settings.CELL_COUNT-1][Settings.CELL_COUNT-1]);
            for (let cell of result) {
                this.cells[cell.row][cell.col].type = CellType.Route;
            }
        }
    }

    public Loop() {
        this.ctx.clearRect(0, 0, Settings.SIZE, Settings.SIZE);
        for (let row in this.cells) {
            for (let cell in this.cells[row]) {
                this.cells[row][cell].Draw();
            }
        }
    }

    public heuristic(pointA: Cell, pointB: Cell): number {
        return Math.sqrt(Math.pow(pointA.col - pointB.col, 2) + Math.pow(pointA.row - pointB.row, 2));
    }

    public GetNeighbours(node: Cell) {
        let neighbors = [
            this.cells[node.col - 1] && this.cells[node.col - 1][node.row],
            this.cells[node.col + 1] && this.cells[node.col + 1][node.row],
            this.cells[node.col] && this.cells[node.col][node.row - 1],
            this.cells[node.col] && this.cells[node.col][node.row + 1]
        ].filter(Boolean);
        return neighbors;
    }

    public aStar(startNode: Cell, endNode: Cell) {
        // Create the open and closed lists
        let openList: Cell[] = [];
        let closedList: Cell[] = [];
        // Add the start node to the open list
        openList.push(startNode);
        // While the open list is not empty
        while (openList.length > 0) {
            // Find the node with the least f on the open list
            let lowInd = 0;
            for (let i = 0; i < openList.length; i++) {
                if (openList[i].f < openList[lowInd].f) {
                    lowInd = i;
                }
            }
            let currentNode = openList[lowInd];
            // If the current node is the end node, return the path
            if (currentNode === endNode) {
                let curr = currentNode;
                let ret = [];
                while (curr.parent) {
                    ret.push(curr);
                    curr = curr.parent;
                }
                return ret.reverse();
            }
            // Remove the current node from the open list and add it to the closed list
            openList.splice(openList.indexOf(currentNode), 1);
            closedList.push(currentNode);
            // Generate the current node's neighbors
            let neighbors = this.GetNeighbours(currentNode);
            for (let i = 0; i < neighbors.length; i++) {
                let neighbor = neighbors[i];
                if (closedList.includes(neighbor)) {
                    continue;
                }
                // Calculate g, h, and f for the neighbor
                let gScore = currentNode.g + 1;
                let gScoreIsBest = false;
                if (!openList.includes(neighbor)) {
                    gScoreIsBest = true;
                    neighbor.h = this.heuristic(neighbor, endNode);
                    openList.push(neighbor);
                } else if (gScore < neighbor.g) {
                    gScoreIsBest = true;
                }
                if (gScoreIsBest) {
                    neighbor.parent = currentNode;
                    neighbor.g = gScore;
                    neighbor.f = neighbor.g + neighbor.h;
                }
            }
        }
        // No path was found
        return [];
    }

    public Step() {
        if (!this.isRunning) return;
        
        console.log("Stepping");

    }
}

export default Game;
