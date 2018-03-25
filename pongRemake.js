const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const player1 = document.getElementById('nameEntry');
const player2 = document.getElementById('nameEntry2');
const wrap = document.getElementById("wrap");
const startTheGame = document.getElementById('btn');
const winner = document.getElementById('winner');
const playAgain = document.getElementById('playAgain');
const gameOver = document.getElementById('gameOver');
const ballRadius = 5;
const paddleHeight = 75;
const paddleWidth = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
//Ball Speed
let dx = 4.5;
let dy = -4.5;
let paddle1 = (canvas.height / 2) - 36.5;
let paddle2 = (canvas.height / 2) - 36.5;
let upPressed1 = false;
let downPressed1 = false;
let upPressed2 = false;
let downPressed2 = false;
let score1 = 0;
let score2 = 0;

playAgain.addEventListener('click', () => {
  document.location.reload();
});

startTheGame.addEventListener('click', () => {
  canvas.style.display="block";
  startTheGame.style.display="none";
  wrap.style.display="none";

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//Keys for gameplay - A/Z & Up/Down
function keyDownHandler(e) {
  if (e.keyCode == 38) {
    upPressed1 = true;
  }
  if (e.keyCode == 40) {
    downPressed1 = true;
  }
  if (e.keyCode == 65) {
    upPressed2 = true;
  }
  if (e.keyCode == 90) {
    downPressed2 = true;
  }
  if(e.keyCode == 32) {
    dx +=1;
    dy +=1;
  }
}
function keyUpHandler(e) {
  if (e.keyCode == 38) {
    upPressed1 = false;
  }
  if (e.keyCode == 40) {
    downPressed1 = false;
  }
  if (e.keyCode == 65) {
    upPressed2 = false;
  }
  if (e.keyCode == 90) {
    downPressed2 = false;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(0, paddle1, paddleWidth, paddleHeight);
  ctx.rect(790, paddle2, paddleWidth, paddleHeight);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(player1.value + " " + score1, 50, 20);
  ctx.fillText(player2.value + " " + score2, 700, 20);
}
function drawNet() {
  ctx.fillRect(canvas.width/2, 0, 2, canvas.height);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawNet();

  //Left wall
  if (x + dx <= ballRadius) {
    //Player 1 paddle collision
    if (y > paddle1 && y < paddle1 + paddleHeight) {
      dx = -dx;
    } else {
      score2++;

      //Reset position
      x = canvas.width / 2;
      y = canvas.height / 2;

      if (score2 === 5) {
        canvas.style.display="none";
        winner.innerHTML="Congratulations " + player2.value + " is the winner";
        gameOver.style.display="block";
      }
    }
  }

  //Right wall check
  if (x + dx >= canvas.width - ballRadius) {
    //Player 2 paddle collision
    if (y > paddle2 && y < paddle2 + paddleHeight) {
      dx = -dx;
    } else {
      score1++;

      //Reset position
      x = canvas.width / 2;
      y = canvas.height / 2;

      if (score1 === 5) {
        canvas.style.display="none";
        winner.innerHTML="Congratulations " + player1.value + " is the winner!";
        gameOver.style.display="block";
      }
    }
  }
  //ensures ball bounces back off top and bottom walls
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }
  if (downPressed1 && paddle2 < canvas.height - paddleHeight) {
    paddle2 += 5;
  }
  if (upPressed1 && paddle2 > 0) {
    paddle2 -= 5;
  }
  if (downPressed2 && paddle1 < canvas.height - paddleHeight) {
    paddle1 += 5;
  }
  if (upPressed2 && paddle1 > 0) {
    paddle1 -= 5;
  }

  x += dx;
  y += dy;
}
setInterval(draw, 10);
});
