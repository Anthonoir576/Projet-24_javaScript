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

// Dessin
function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    x += dx;
    y += dy;

    if(y + dy < 0) {

        dy = -dy;

    } else if (y + dy > canvas.height) {

        dy = -dy;

    };

    if(x + dx > canvas.width || x + dx < 0) {

        dx = -dx;

    };
    
    if(y + dy > canvas.height || y + dy < 0) {

        dy = -dy;

    };

}

setInterval(draw, 10);