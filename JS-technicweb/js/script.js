const squareX = document.getElementById('square-x');
const squareY = document.getElementById('square-y');
const container = document.getElementById('container');
const updateScoreX = document.getElementById('score-x');
const updateScoreY = document.getElementById('score-y');

//speed variables
let squareSpeedX = 0;
let squareSpeedXrand = randNum(); //obtains a random number via the randNum function
let squareSpeedY = 0;
let squareSpeedYrand = randNum();
//score variables
let xScore = 0;
let yScore = 0
//variables to trigger horizontal if statements
let squareLeftCount = 0;
let squareRightCount = 0;
//variables to trigger horizontal if statements
let squareTopCount = 0;
let squareBottomCount = 0;
//variables to track a number that triggers the score if statement
let squareScoreCountX = 0;
let squareScoreCountY = 0;

//generates a random number on document load
function randNum(){
  return Math.floor(Math.random() * 2) + 1;
}
window.onload = randNum();

//used setInterval to execute the move function every 500ms
const intervalID = window.setInterval(move, 500);

function move(){
  //if statements for horizontal square
  if(squareRightCount === 0){
    squareSpeedX += squareSpeedXrand; //adds random number speed to the objects speed variable
    squareScoreCountX = squareSpeedX; //updates variable with speed value - this is used to track the score
    squareX.style.left = squareSpeedX + '%'; //updates the position value of the square
    squareLeftCount = squareSpeedX; // updates variable that is used to trigger the square in reverse
  } if(squareLeftCount === 100){
    squareSpeedX -= squareSpeedXrand;
    squareScoreCountX = squareSpeedX;
    squareX.style.left= squareSpeedX + '%';
    squareRightCount = squareSpeedX;
  } if(squareScoreCountX == 50){
    xScore += 1;
    updateScoreX.innerHTML = 'Horizontal Score ' + xScore;
    squareX.style.backgroundColor = 'green';
  } if(squareScoreCountX < 49 || squareScoreCountX > 51){
    squareX.style.backgroundColor = 'blue';
  }
  //if statments for vertical square
   if(squareBottomCount === 0){
      squareSpeedY += squareSpeedYrand;
      squareScoreCountY = squareSpeedY;
      squareY.style.top = squareSpeedY + '%';
      squareTopCount = squareSpeedY;
    } if(squareTopCount === 100){
      squareSpeedY -= squareSpeedYrand;
      squareScoreCountY = squareSpeedY;
      squareY.style.top= squareSpeedY + '%';
      squareBottomCount = squareSpeedY;
    } if(squareScoreCountY == 50){
      yScore += 1;
      updateScoreY.innerHTML = 'Vertical Score ' + yScore;
      squareY.style.backgroundColor = 'orange';
    } if(squareScoreCountY < 49 || squareScoreCountY > 51){
      squareY.style.backgroundColor = 'red';
    }
}

  updateScoreX.innerHTML = 'Horizontal Score ' + xScore;
  updateScoreY.innerHTML = 'Vertical Score ' + yScore;
