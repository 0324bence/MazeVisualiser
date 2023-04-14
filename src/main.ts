import "./styles/style.css";
import Game from "./objects/Game";
import Settings from "./objects/Settings";

const canvas = document.getElementById("main-canvas") as HTMLCanvasElement;
canvas.width = canvas.height = Settings.SIZE;

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const currentGame = new Game(ctx, canvas);

console.log(currentGame);

let lastFrame = 0;

function mainLoop(time: number) {
    requestAnimationFrame(mainLoop);
    if (!((time - lastFrame) / 1000 > 1 / Settings.FPS)) return;
    lastFrame = time;

    currentGame.Loop();
}

mainLoop(0);

canvas.addEventListener("mousemove", currentGame.Move.bind(currentGame));

export {};
