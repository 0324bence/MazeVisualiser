//Import the CSS file
import "./styles/style.css";

//Define the size of the grid in pixels and the size of each cell
const SIZE = 800;
const CELL_SIZE = 25;

//Get the canvas element from the DOM and set its size
const canvas = document.getElementById("main-canvas") as HTMLCanvasElement;
canvas.width = canvas.height = SIZE;
//Get the context of the canvas to draw on it
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

//Draw a grid out of lines
ctx.strokeStyle = "black";
ctx.lineWidth = 1;
for (let i = 0; i < SIZE; i += CELL_SIZE) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, SIZE);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(SIZE, i);
    ctx.stroke();
}

//fill grid cells with red color on click
canvas.addEventListener("click", e => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.fillStyle = "red";
    ctx.fillRect(x - (x % CELL_SIZE), y - (y % CELL_SIZE), CELL_SIZE, CELL_SIZE);
});

//also fill grid cells with red color on mouse drag
canvas.addEventListener("mousemove", e => {
    if (e.buttons === 1) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ctx.fillStyle = "red";
        ctx.fillRect(x - (x % CELL_SIZE), y - (y % CELL_SIZE), CELL_SIZE, CELL_SIZE);
    }
});

export {};
