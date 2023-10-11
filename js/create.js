
console.log('Hollo Breakout');

// ('document').ready(function(){

// // //Create canvas and draw it


let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let contain = $('#container');
console.log(contain);
var x = canvas.width/2;
var y = canvas.height-30;

var dx = 2;
var dy = -2;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth) / 2;

var rightPressed = false;
var leftPressed = false;

var ballRadius = 10;


var brickRowCount = 4;
var brickColumnCount = 8;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 200;
var brickOffsetLeft = 400;

var score = 0;
let finalScore;

var lives = 6;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
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
    
    
   if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
     dx = -dx;
   }
   
   
   
   
  if(y + dy < ballRadius) {
    dy = -dy;
} else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
    }
    else {
        // alert("GAME OVER");
        // document.location.reload();
        // clearInterval(interval); // Needed for Chrome to end game
        
        lives--;
if(!lives) {
    // alert("GAME OVER");
     window.location.href = 'create.html';
    // document.location.reload();
    finalScore = score;
    console.log(finalScore)
    contain.prepend(`<h1 class="message>Your score is ${finalScore}!!!</h1>`);
      $('.message').css({
            'position': 'absolute',
            'width': '25rem',
            'top': '115px',
            'left': '350px',
            'color': 'red',
            'font-size': '2rem'
              });
              
    
    // clearInterval(interval); // Needed for Chrome to end game
}
else {
    x = canvas.width/2;
    y = canvas.height-30;
    dx = 2;
    dy = -2;
    paddleX = (canvas.width-paddleWidth)/2;
}
    }
}
   
   
   
   
   if(rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width){
        paddleX = canvas.width - paddleWidth;
    }
}
else if(leftPressed) {
    paddleX -= 7;
    if (paddleX < 0){
        paddleX = 0;
    }
}
   
   
   
   
drawBricks();
   
   
  drawPaddle();
   
  drawScore();
   
  drawLives();
   
  collisionDetection();
   
  requestAnimationFrame(draw);
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}



document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);


function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}


function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}


function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                        // clearInterval(interval); // Needed for Chrome to end game
                    }
                }
            }
        }
    }
}



function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Score: "+score, 8, 20);
}


function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}


// setInterval(draw, 10);

// var interval = setInterval(draw, 10);






var check = false

$('#btn').on('click', function() {
if  (check){
  window.location.href = 'create.html';
  
}else{
  check = true
  draw();
  $('.welcome').hide();
}

  
})


$('#btn2').on('click', function() {
draw();

  
})

// $('.message').text(`Your score is ${finalScore}!!!`);
//       $('.message').css({
//             'position': 'absolute',
//             'width': '25rem',
//             'top': '115px',
//             'left': '350px',
//             'color': 'red',
//             'font-size': '2rem'
//               });
              
              
              
  