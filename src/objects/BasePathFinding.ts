import Cell from "./Cell";

abstract class BasePathFinding {
    constructor(protected grid: Cell[][], public startCoords: [number, number], public endCoords: [number, number]) {}

    abstract Step(): boolean;
    abstract Finish(): Promise<void>;
}

export default BasePathFinding;
