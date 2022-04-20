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

canvas.addEventListener("userDrawing", (e) => {
    drawing = true;
    x = e.offsetX;
    y = e.offsetY;
});

canvas.addEventListener("userStoppedDrawing", (e) => {
    drawing = false;
    x = y = undefined;
});

function drawPoint(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawPath(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    //print
    ctx.stroke();
}