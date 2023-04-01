export class InputHandler {

    // Player and game canvas TODO: Change to gameManager handling
    player;
    canvas;

    rightPressed = false;
    leftPressed = false;
    upPressed = false;
    downPressed = false;

    playerX;
    playerY;

    constructor(player, canvas) {
        this.player = player;
        this.canvas = canvas;

        this.playerX = this.canvas.width / 2;
        this.playerY = this.canvas.height / 2;

        document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
        document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
    }

    //keyCode are mapped to buttons, e.g. 39 = right arrow key
    keyDownHandler(event) {
        if (event.keyCode === 39) {
            this.rightPressed = true;
        } else if (event.keyCode === 37) {
            this.leftPressed = true;
        }
        if (event.keyCode === 40) {
            this.downPressed = true;
        } else if (event.keyCode === 38) {
            this.upPressed = true;
        }
    }
    
    keyUpHandler(event) {
        if (event.keyCode === 39) {
            this.rightPressed = false;
        } else if (event.keyCode === 37) {
            this.leftPressed = false;
        }
        if (event.keyCode === 40) {
            this.downPressed = false;
        } else if (event.keyCode === 38) {
            this.upPressed = false;
        }
    }

    // TODO: Move this to object class
    draw(){
        this.canvas.drawLayer.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.rightPressed) {
            if (this.playerX >= this.canvas.width){
                this.playerX = this.canvas.width;
            } else {
                this.playerX += 5;
            }
        } else if (this.leftPressed) {
            if (this.playerX <= 0){
                this.playerX = 0;
            } else {
                this.playerX -= 5;
            }
        }
        
        if (this.downPressed) {
            if (this.playerY>= this.canvas.height){
                this.playerY = this.canvas.height;
            } else {
                this.playerY += 5;
            }            
        } else if (this.upPressed) {
            if (this.playerY <= 0){
                this.playerY = 0;
            } else {
                this.playerY -= 5;
            }
        }

        this.drawChar();
    } 

    // TODO: Move this to object class
    drawChar(){
        this.canvas.drawLayer.beginPath();
        this.canvas.drawLayer.arc(this.playerX, this.playerY, 20, 0, Math.PI * 2, false);
        this.canvas.drawLayer.fillStyle = "#0095DD";
        this.canvas.drawLayer.fill();
        this.canvas.drawLayer.closePath();
    }
}