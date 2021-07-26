// Variable et constante 
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

let x = canvas.width/2;
let y = canvas.height-30;

let dx = 2;
let dy = -2;

let ballRadius = 10;

// FONCTION
function drawBall() {

    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

}
  
function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    x += dx;
    y += dy;

}

setInterval(draw, 10);