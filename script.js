
//without this, all functions load before the canvas
document.addEventListener('DOMContentLoaded',domloaded,false);
function domloaded(){

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("keyup", goFullScreen, false);

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    
    let rightPressed = false;
    let leftPressed = false;
    let upPressed = false;
    let downPressed = false;
    
    let playerX = canvas.width / 2;
    let playerY = canvas.height / 2;

    draw();
    
    //keyCode are mapped to buttons, e.g. 39 = right arrow key
    function keyDownHandler(event) {
        if (event.keyCode === 39) {
            rightPressed = true;
        } else if (event.keyCode === 37) {
            leftPressed = true;
        }
        if (event.keyCode === 40) {
          downPressed = true;
        } else if (event.keyCode === 38) {
            upPressed = true;
        }
    }
    
    function keyUpHandler(event) {
        if (event.keyCode === 39) {
            rightPressed = false;
        } else if (event.keyCode === 37) {
            leftPressed = false;
        }
        if (event.keyCode === 40) {
            downPressed = false;
        } else if (event.keyCode === 38) {
            upPressed = false;
        }
    }
    
    //deprecated, use something else
    function goFullScreen(event){
        if (event.keyCode == 70){
            var canvas = document.getElementById("canvas");
            if(canvas.requestFullScreen){
                canvas.requestFullScreen();
            }
            else if(canvas.webkitRequestFullScreen){
                canvas.webkitRequestFullScreen();
            }
            else if(canvas.mozRequestFullScreen){
                canvas.mozRequestFullScreen();
            }
        }
    }

    function draw(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (rightPressed) {
            if (playerX >= canvas.width){
                playerX = canvas.width;
            } else {
                playerX += 5;
            }
        } else if (leftPressed) {
            if (playerX <= 0){
                playerX = 0;
            } else {
                playerX -= 5;
            }
        }
        
        if (downPressed) {
            if (playerY>= canvas.height){
                playerY = canvas.height;
            } else {
                playerY += 5;
            }            
        } else if (upPressed) {
            if (playerY <= 0){
                playerY = 0;
            } else {
                playerY -= 5;
            }
        }

        drawChar();
        requestAnimationFrame(draw);
    } 

    function drawChar(){
        ctx.beginPath();
        ctx.arc(playerX, playerY, 20, 0, Math.PI * 2, false);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}