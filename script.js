var rows = 20;
var columns = 20;
var blockSize = 25;
var context;
var board;
var gameOver = false;
//snake
var snakeX = 5*blockSize;
var snakeY = 5*blockSize;

//food
var foodX;
var foodY;

//speed
var velocityX=0;
var velocityY=0;

//snake body
var snakeBody = [];

window.onload = function() {
    board = document.getElementById('board');
    board.width = columns * blockSize;
    board.height = rows * blockSize;
    context = board.getContext("2d");
    placeFood();
    document.addEventListener('keyup', changeDirection);
    update();
    setInterval(update,1000/10);

}

function changeDirection(e){
    if(e.code=='ArrowUp' && velocityY !=1){
        velocityY = -1;
        velocityX = 0;
 }
    if(e.code=='ArrowDown' && velocityY !=-1){
        velocityY = 1;
        velocityX = 0;
   }
    if(e.code=='ArrowLeft' && velocityX !=1){
        velocityY = 0;
        velocityX = -1;
    }
    if(e.code=='ArrowRight' && velocityX !=-1){
        velocityY = 0;
        velocityX = 1;
    }
}


function placeFood(){
    foodX = Math.floor((Math.random()*columns))*blockSize;
    foodY = Math.floor((Math.random()*rows))*blockSize;
}

function update(){
    if(gameOver){
        return;
    }
    context.fillStyle = 'black';
    context.fillRect(0,0,board.width,board.height);

    context.fillStyle = 'red';
    context.fillRect(foodX,foodY,blockSize,blockSize);

    if(snakeX== foodX && snakeY==foodY){
        snakeBody.push([foodX,foodY]);
        placeFood();
    }
    

    for( let i = snakeBody.length-1;i>0;i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX,snakeY];
    }

    context.fillStyle = 'lime';
    snakeX += velocityX*blockSize;
    snakeY += velocityY*blockSize;
    context.fillRect(snakeX,snakeY,blockSize,blockSize);
    for(let i = 0;i<snakeBody.length;i++){
        context.fillStyle = 'lime';
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize);
    }

    if(snakeX<0 || snakeX>=board.width || snakeY<0 || snakeY>=board.height){
        gameOver=true;
        alert('Game Over');
    }
    for(let i = 0;i<snakeBody.length;i++){
        if(snakeX==snakeBody[i][0] && snakeY==snakeBody[i][1]){
            gameOver=true;
            alert('Game Over');
        }
    }

    

    
}