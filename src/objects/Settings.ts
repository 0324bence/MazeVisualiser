import { Coords } from "./AStarPathFinding";

class Settings {
    public static SIZE = 800;
    public static CELL_COUNT = 20;
    public static CELL_SIZE = Settings.SIZE / Settings.CELL_COUNT;
    public static FPS = 60;

    public static CUSTOMS = {
        startPos: [5, 5] as Coords,
        endPos: [Settings.CELL_COUNT - 4, Settings.CELL_COUNT - 4] as Coords,
        useDiagonals: true,
        showCoords: false,
        framesBettweenSteps: 5,
        showGrid: false
    };
}

export default Settings;
