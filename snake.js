let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let box = 5, rows, columns;

let snakeX = box*2, snakeY = box*2 ;

let velocityX = 0, velocityY = 0;

let snakeBody = [];

let foodX, foodY;

let gameOver = false;

let currentScore = 0;

window.onload = function() {
    rows = canvas.height / box;
    columns = canvas.width / box;

    let currentHighScore = localStorage.getItem("highScore");
    highScore = currentHighScore ? parseInt(currentHighScore) : 0;
    document.getElementById("highScore").innerHTML = highScore;

    placeFood();
    document.addEventListener("keydown", changeDirection); 
    setInterval(initiate, 100);
}

function initiate() {
    if (gameOver) {
        nakeX = box * 2;
        snakeY = box * 2;
        snakeBody = [];
        velocityX = 0;
        velocityY = 0;
        currentScore = 0;
        document.getElementById('currentScore').textContent = currentScore;
        gameOver = false;
    }

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(foodX, foodY, box, box);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        placeFood();
        currentScore += 10;
        document.getElementById("currentScore").innerHTML = currentScore;
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }

    if(snakeBody.length > 0) {
        snakeBody[0] = [snakeX, snakeY];
    }

    ctx.fillStyle = "lightgreen";
    snakeX += velocityX * box;
    snakeY += velocityY * box;
    ctx.fillRect(snakeX, snakeY, box, box);

    for (let i = 0; i < snakeBody.length; i++) {
        ctx.fillRect(snakeBody[i][0], snakeBody[i][1], box, box);
    }
    
   if (snakeX < 0) {
    snakeX = canvas.width - box;
    } else if (snakeX > canvas.width) {
    snakeX = 0;
    } else if (snakeY < 0) {
    snakeY = canvas.height - box;
    } else if (snakeY > canvas.height) {
    snakeY = 0;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }

    if (currentScore > highScore) {
        highScore = currentScore;
        localStorage.setItem("highScore", highScore);
        document.getElementById("highScore").innerHTML = highScore;
    }

}
function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1
    }
    if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * (columns-3))*box;
    foodY = Math.floor(Math.random() * (rows-3))*box;;
}
