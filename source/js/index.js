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

// Brique
let brickRowCount = 5;
let brickColumnCount = 11;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let bricks = [];
for(let c = 0; c < brickColumnCount; c++) {

    bricks[c] = [];

    for(let r = 0; r < brickRowCount; r++) {

        bricks[c][r] = { x: 0, y: 0, status: 1 };

    }
};

// SCORE
let score = 0;

// Vies du joueur
let lives = 3;




// let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
// let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;

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

// Brique 
function drawBricks() {

    for(let c=0; c<brickColumnCount; c++) {

        for(let r=0; r<brickRowCount; r++) {

            if(bricks[c][r].status == 1) {

                let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;

                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();

            }
        }
    }
}

// Dessin
function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();




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

            lives--;
            if(!lives) {

                alert("Tu as PERDU !!!!!!");
                document.location.reload();
                clearInterval(interval);

            } else {

                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;

            }

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
document.addEventListener("mousemove", mouseMoveHandler, false);

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

// Detection à la souris 
function mouseMoveHandler(e) {

    let relativeX = e.clientX - canvas.offsetLeft;

    if(relativeX > 0 && relativeX < canvas.width) {

        paddleX = relativeX - paddleWidth/2;

    }
};

// Fonction collision brique
function collisionDetection() {

    for(let c = 0; c < brickColumnCount; c++) {

        for(let r = 0; r < brickRowCount; r++) {

            let b = bricks[c][r];
            if(b.status == 1) {

                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {

                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount*brickColumnCount) {

                        alert("C'est gagné, Bravo!");
                        document.location.reload();
                        clearInterval(interval);

                    }

                }
            }
        }
    }
}

// SCORE Collision
function drawScore() {

    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);

}

// Vie joueur
function drawLives() {

    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);

}