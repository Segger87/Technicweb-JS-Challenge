const squareX = document.getElementById('square-x');
const squareY = document.getElementById('square-y');
const container = document.getElementById('container')
const updateScoreX = document.getElementById('score-x');
const updateScoreY = document.getElementById('score-y');


let squareSpeed = 0;
let xScore = 0;
let yScore = 0
let squareLeftCount = 0;
let squareRightCount = 0;
let squareScoreCount = 0;

//used setInterval to execut the move function every 500ms
const intervalID = window.setInterval(move, 500);

function move(){
  if(squareRightCount === 0){
    squareSpeed += 2;
    squareY.style.top = squareSpeed + '%';
    squareScoreCount = squareSpeed;
    squareX.style.left = squareSpeed + '%';
    squareLeftCount = squareSpeed;
  } if(squareLeftCount === 100){
    squareSpeed -= 2;
    squareY.style.top = squareSpeed + '%';
    squareScoreCount = squareSpeed;
    squareX.style.left= squareSpeed + '%';
    squareRightCount = squareSpeed;
  }  if(squareScoreCount == 50){
    xScore += 1;
    yScore += 1;
    updateScoreX.innerHTML = 'Horizontal Score ' + xScore;
    updateScoreY.innerHTML = 'Vertical Score ' + xScore;
  }
}

  updateScoreX.innerHTML = 'Horizontal Score ' + xScore;
  updateScoreY.innerHTML = 'Vertical Score ' + yScore;
