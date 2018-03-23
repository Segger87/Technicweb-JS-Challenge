const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const player1 = document.getElementById('nameEntry');
const player2 = document.getElementById('nameEntry2');
const wrap = document.getElementById("wrap");
const button = document.getElementById('btn');
const winner = document.getElementById('winner');
const playAgain = document.getElementById('playAgain');
const gameOver = document.getElementById('gameOver');
const ballRadius = 5;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 5;
let dy = -5;
const paddleHeight = 75;
const paddleWidth = 10;
let paddle1 = (canvas.height / 2) - 36.5;
let paddle2 = (canvas.height / 2) - 36.5;
let upPressed = false;
let downPressed = false;
let upPressedY = false;
let downPressedY = false;
let score1 = 0;
let score2 = 0;

playAgain.addEventListener('click', () => {
  document.location.reload();
});

button.addEventListener('click', () => {
  canvas.style.display="block";
  button.style.display="none";
  wrap.style.display="none";

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.keyCode == 38) {
    upPressed = true;
  }
  if (e.keyCode == 40) {
    downPressed = true;
  }
  if (e.keyCode == 65) {
    upPressedY = true;
  }
  if (e.keyCode == 90) {
    downPressedY = true;
  }
}
function keyUpHandler(e) {
  if (e.keyCode == 38) {
    upPressed = false;
  }
  if (e.keyCode == 40) {
    downPressed = false;
  }
  if (e.keyCode == 65) {
    upPressedY = false;
  }
  if (e.keyCode == 90) {
    downPressedY = false;
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
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}
function drawPaddle2() {
  ctx.beginPath();
  ctx.rect(790, paddle2, paddleWidth, paddleHeight);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(player1.value + " " + score1, 20, 20);
  ctx.fillText(player2.value + " " + score2, 700, 20);
}
function drawNet() {
  ctx.fillRect(canvas.width/2, 0, 2, canvas.height);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawPaddle2();
  drawScore();
  drawNet();

  //Left wall check
  if (x + dx <= ballRadius) {
    //Player 1 paddle collision test
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
    //Player 2 paddle collision test
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

  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }
  if (downPressed && paddle2 < canvas.height - paddleHeight) {
    paddle2 += 5;
  }
  if (upPressed && paddle2 > 0) {
    paddle2 -= 5;
  }
  if (downPressedY && paddle1 < canvas.height - paddleHeight) {
    paddle1 += 5;
  }
  if (upPressedY && paddle1 > 0) {
    paddle1 -= 5;
  }

  x += dx;
  y += dy;
}
setInterval(draw, 10);
});
