// Variable et constante ##################################
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

let x = canvas.width/2;
let y = canvas.height-30;

let dx = 2;
let dy = -2;

// Interval
let interval = setInterval(draw, 10);

// BALL
let ballRadius = 10;

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width-paddleWidth) / 2;

// RAQUETTE
let rightPressed = false;
let leftPressed = false;



// FONCTION ################################################

// DESSIN DE LA BALL
function drawBall() {

    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

};


// RAQUETTE
function drawPaddle() {

    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

};


// Dessin
function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();



    if(y + dy < 0) {

        dy = -dy;

    } else if (y + dy > canvas.height) {

        dy = -dy;

    };

    if (x + dx > canvas.width-ballRadius || x + dx < ballRadius)
     {

        dx = -dx;
        
    };
    
    if (y + dy < ballRadius) {

        dy = -dy;

    } else if (y + dy > canvas.height-ballRadius) {

        if (x > paddleX && x < paddleX + paddleWidth) {

            dy = -dy;

        } else {

            alert("Tu as PERDU !");
            document.location.reload();
            clearInterval(interval);

        }

    }
    

    x += dx;
    y += dy;

    if(rightPressed) {

        paddleX += 7;

        if (paddleX + paddleWidth > canvas.width) {

            paddleX = canvas.width - paddleWidth;

        };
    }
    else if(leftPressed) {

        paddleX -= 7;

        if (paddleX < 0) {

            paddleX = 0;

        };
    };

};


// Listener
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


// Fonction des touches du clavier
function keyDownHandler(e) {

    if(e.key == "Right" || e.key == "ArrowRight") {

        rightPressed = true;

    }

    else if(e.key == "Left" || e.key == "ArrowLeft") {

        leftPressed = true;

    };
};

function keyUpHandler(e) {

    if(e.key == "Right" || e.key == "ArrowRight") {

        rightPressed = false;

    }

    else if(e.key == "Left" || e.key == "ArrowLeft") {

        leftPressed = false;

    };
};


