// Handles input across the game
export class InputHandler {

    canvas;

    // W A S D
    rightPressed = false;
    leftPressed = false;
    upPressed = false;
    downPressed = false;

    // ARROW KEYS
    rightShotPressed = false;
    leftShotPressed = false;
    upShotPressed = false;
    downShotPressed = false;

    constructor(canvas) {
        this.canvas = canvas;

        document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
        document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
    }

    keyDownHandler(event) {
        // Walking with WASD
        if (event.key === "d") {
            this.rightPressed = true;
        } else if (event.key === "a") {
            this.leftPressed = true;
        }
        if (event.key === "s") {
            this.downPressed = true;
        } else if (event.key === "w") {
            this.upPressed = true;
        }

        // Shoot EventHandler
        // Shooting with Arrow keys
        if(event.key === "ArrowRight") {
            // Right shot
            this.rightShotPressed = true;
        } else if(event.key === "ArrowLeft") {
            // Left shot
            this.leftShotPressed = true;
        } else if(event.key === "ArrowDown") {
            // Downwards shot
            this.downShotPressed = true;
        } else if(event.key === "ArrowUp") {
            // Upwards shot
            this.upShotPressed = true;
        }
    }
    
    keyUpHandler(event) {
        if (event.key === "d") {
            this.rightPressed = false;
        } else if (event.key === "a") {
            this.leftPressed = false;
        }
        if (event.key === "s") {
            this.downPressed = false;
        } else if (event.key === "w") {
            this.upPressed = false;
        }

        if(event.key === "ArrowRight") {
            // Right shot
            this.rightShotPressed = false;
        } else if(event.key === "ArrowLeft") {
            // Left shot
            this.leftShotPressed = false;
        } else if(event.key === "ArrowDown") {
            // Downwards shot
            this.downShotPressed = false;
        } else if(event.key === "ArrowUp") {
            // Upwards shot
            this.upShotPressed = false;
        }
    }

    // Moves the player into the direction of input and plays the animation accordingly
    updateCoordinates(player) {
        if(!this.rightPressed && !this.leftPressed && !this.downPressed && !this.upPressed) {
            player.setCurrentAnimationByNameIfNotPlaying("idle");
            return false;
        }

        if (this.rightPressed) {
            player.setCurrentAnimationByNameIfNotPlaying("right");
            if (player.boundaries.rightBoundary() >= this.canvas.width){
                player.position.x = this.canvas.width - player.dimensions.scaledWidth;
            } else {
                player.position.x += player.attackSpeed;
            }
        } else if (this.leftPressed) {
            player.setCurrentAnimationByNameIfNotPlaying("left");
            if (player.position.x <= 0){
                player.position.x = 0;
            } else {
                player.position.x -= player.attackSpeed;
            }
        }
        
        if (this.downPressed) {
            player.setCurrentAnimationByNameIfNotPlaying("down");
            if (player.boundaries.bottomBoundary() >= this.canvas.height){
                player.position.y = this.canvas.height - player.dimensions.scaledHeight;
            } else {
                player.position.y += player.attackSpeed;
            }            
        } else if (this.upPressed) {
            player.setCurrentAnimationByNameIfNotPlaying("up");
            if (player.position.y <= 0){
                player.position.y = 0;
            } else {
                player.position.y -= player.attackSpeed;
            }
        }

        return true;
    }

    shootPressed() {
        return (this.rightShotPressed || this.leftShotPressed || this.upShotPressed || this.downShotPressed);
    }

    shootDirection() {
        return this.rightShotPressed ? "right" : this.leftShotPressed ? "left" : this.upShotPressed ? "up" : this.downShotPressed ? "down" : null;
    }
}