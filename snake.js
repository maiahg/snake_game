// Canvas properties
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let box = 5, rows, columns;

// Snake properties
let snakeX = box*2, snakeY = box*2 ;
let velocityX = 0, velocityY = 0;
let snakeBody = [];

// Food properties
let foodX, foodY;

// Game data
let gameOver = false;
let currentScore = 0;

// Initialize game
window.onload = function() {
    rows = canvas.height / box;
    columns = canvas.width / box;

    let currentHighScore = localStorage.getItem("highScore");
    highScore = currentHighScore ? parseInt(currentHighScore) : 0;
    document.getElementById("highScore").innerHTML = highScore;

    placeFood();
    document.addEventListener("keydown", changeDirection); 
    setInterval(update, 100);
}

// Method for updating game data
function update() {
    // Reset game
    if (gameOver) {
        snakeX = box * 2;
        snakeY = box * 2;
        snakeBody = [];
        velocityX = 0;
        velocityY = 0;
        currentScore = 0;
        document.getElementById('currentScore').textContent = currentScore;
        gameOver = false;
    }

    // Clear canvas
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(foodX, foodY, box, box);

    // Check if snake ate food
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

    // Draw snake
    ctx.fillStyle = "lightgreen";
    ctx.strokeStyle = "rgb(127,210,127)";
    snakeX += velocityX * box;
    snakeY += velocityY * box;
    ctx.fillRect(snakeX, snakeY, box, box);
    ctx.strokeRect(snakeX, snakeY, box, box);

    for (let i = 0; i < snakeBody.length; i++) {
        ctx.fillRect(snakeBody[i][0], snakeBody[i][1], box, box);
    }
    
    // Check if snake exceeded the wall, reposition the snake to the other side
   if (snakeX < 0) {
    snakeX = canvas.width - box;
    } else if (snakeX > canvas.width) {
    snakeX = 0;
    } else if (snakeY < 0) {
    snakeY = canvas.height - box;
    } else if (snakeY > canvas.height) {
    snakeY = 0;
    }

    // Check if snake ate itself
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }

    // Update high score
    if (currentScore > highScore) {
        highScore = currentScore;
        localStorage.setItem("highScore", highScore);
        document.getElementById("highScore").innerHTML = highScore;
    }

// Change direction of snake
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

// Place food randomly
function placeFood() {
    foodX = Math.floor(Math.random() * (columns-3))*box;
    foodY = Math.floor(Math.random() * (rows-3))*box;;
}
