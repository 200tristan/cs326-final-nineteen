//Script for drawing on canvas
//Constants

//On Load
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d")

//Buttons
const clearButton = document.getElementById("clear");
const saveButton = document.getElementById("save");
const publishButton = document.getElementById("publish");
//~ Maybe undoButton?

//Brush Attributes 
const increaseButton = document.getElementById("increase");
const decreaseButton = document.getElementById("decrease");
const brushSize = document.getElementById("size");
const brushColor = document.getElementById("color");

//Defaults
let drawing = false;
let color = "black";
let x = y = undefined;
let size = 5;

//window.addEventListener('resize, ')

canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    x = e.offsetX;
    y = e.offsetY;
});

canvas.addEventListener("mouseup", (e) => {
    drawing = false;
    x = y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
    if (drawing) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        drawPoint(x2, y2);
        drawPath(x, y, x2, y2);
        x = x2;
        y = y2;
    }
});

//+
increaseButton.addEventListener("click", () => {
    size += 1;

    if (size > 10) {
        size = 10;
    }

    updateSizeOnScreen();
});

//-
decreaseButton.addEventListener("click", () => {
    size -= 1;

    if (size < 1) {
        size = 1;
    }

    updateSizeOnScreen();
});

//color change
brushColor.addEventListener("change", (e) => {
    color = e.target.value;
});

//cls
clearButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function updateSizeOnScreen() {
    brushSize.innerText = size;
}

function drawPoint(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 5 * size, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    //print
    ctx.fill();
}

function drawPath(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 5;
    //print
    ctx.stroke();
}

