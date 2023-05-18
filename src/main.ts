import "./styles/style.css";
import Game from "./objects/Game";
import Settings from "./objects/Settings";

const canvas = document.getElementById("main-canvas") as HTMLCanvasElement;
canvas.width = canvas.height = Settings.SIZE;

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const currentGame = new Game(ctx, canvas);

console.log(currentGame);

let lastFrame = 0;
let framesUntilStep = 0;

function mainLoop(time: number) {
    requestAnimationFrame(mainLoop);
    if (!((time - lastFrame) / 1000 > 1 / Settings.FPS)) return;
    lastFrame = time;

    currentGame.Loop();

    --framesUntilStep;
    if (framesUntilStep <= 0) {
        framesUntilStep = Settings.CUSTOMS.framesBettweenSteps;
        currentGame.Step();
    }
}

mainLoop(0);

canvas.addEventListener("mousemove", currentGame.Move.bind(currentGame));
canvas.addEventListener("mousedown", currentGame.Click.bind(currentGame));
document.addEventListener("keydown", currentGame.OnKeyPress.bind(currentGame));

(document.getElementById("useDiagonalsCheckbox") as HTMLInputElement).checked = Settings.CUSTOMS.useDiagonals;
document
    .getElementById("useDiagonalsCheckbox")
    ?.addEventListener("change", currentGame.ToggleDiagonals.bind(currentGame));

(document.getElementById("showCoordsCheckbox") as HTMLInputElement).checked = Settings.CUSTOMS.showCoords;
document
    .getElementById("showCoordsCheckbox")
    ?.addEventListener("change", () => (Settings.CUSTOMS.showCoords = !Settings.CUSTOMS.showCoords));

(document.getElementById("showGridCheckbox") as HTMLInputElement).checked = Settings.CUSTOMS.showGrid;
document
    .getElementById("showGridCheckbox")
    ?.addEventListener("change", () => (Settings.CUSTOMS.showGrid = !Settings.CUSTOMS.showGrid));

document
    .getElementById("speedRange")
    ?.addEventListener(
        "input",
        e => (Settings.CUSTOMS.framesBettweenSteps = 60 - Number((e.target as HTMLInputElement).value))
    );

document.getElementById("startButton")?.addEventListener("click", () => (currentGame.isRunning = true));

document.getElementById("resetButton")?.addEventListener("click", () => currentGame.Reset());

export {};
