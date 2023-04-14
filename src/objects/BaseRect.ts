abstract class BaseRect {
    constructor(public ctx: CanvasRenderingContext2D) {}

    abstract Draw(): void;
}

export default BaseRect;
