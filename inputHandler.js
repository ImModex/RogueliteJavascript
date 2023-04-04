export class InputHandler {

    // Player and game canvas TODO: Change to gameManager handling
    player;
    canvas;

    rightPressed = false;
    leftPressed = false;
    upPressed = false;
    downPressed = false;

    constructor(player, canvas) {
        this.player = player;
        this.canvas = canvas;

        this.player.setCoordinates(this.canvas.width / 2, this.canvas.height / 2);

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

    updateCoordinates(player) {
        if (this.rightPressed) {
            if (player.x >= this.canvas.width){
                player.x = this.canvas.width;
            } else {
                player.x += player.attackSpeed;
            }
        } else if (this.leftPressed) {
            if (player.x <= 0){
                player.x = 0;
            } else {
                player.x -= player.attackSpeed;
            }
        }
        
        if (this.downPressed) {
            if (player.y>= this.canvas.height){
                player.y = this.canvas.height;
            } else {
                player.y += player.attackSpeed;
            }            
        } else if (this.upPressed) {
            if (player.y <= 0){
                player.y = 0;
            } else {
                player.y -= player.attackSpeed;
            }
        }
    }
}