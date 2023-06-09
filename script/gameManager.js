import { Canvas } from "./canvas.js";
import { Player } from "./objects/player.js";
import { BulletController } from "./objects/BulletController.js";

export class GameManager {

    // Store player object
    playerObject = null;

    // Store all game objects without player
    gameObjects = [];

    // Canvas reference to draw on
    canvas = null;

    // BulletController
    bulletController = null;

    // Delta time, used to dynamically scale velocities and timings to frame times
    // When someone lags -> Things would move / happen slower, therefore we use deltatime
    // to compensate that by increasing speed / tick so less ticks with higher speed
    // equal lower speed with more ticks
    dt = 0;

    inputHandler;

    constructor() {
        // Get canvas from html and initialize
        this.canvas = new Canvas(15, 9, "canvas");
        this.bulletController = new BulletController();
        this.playerObject = new Player("Test", this.canvas.width / 2, this.canvas.height / 2, 5, 5, 5, this.bulletController, this.canvas);
    }

    // Initialize game and start loop
    start() {
        this.lastTick = Date.now();
        this.gameLoop();
    }

    // Main game loop, will run 60 times / second (or less!!!)
    // TODO: Test deltatime
    gameLoop() {
        this.updateDeltaTime();
        this.canvas.update();
        this.canvas.drawLayer.clearRect(0, 0, canvas.width, canvas.height);


        this.bulletController.draw(this.canvas);
        this.gameObjects.forEach(object => {
            object.update();
            object.draw(this.canvas);
        });

        // TODO: Move this to object clas
        this.playerObject.update();
        this.playerObject.shoot();
        this.playerObject.draw(this.canvas);
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    // Calculates time taken between ticks, ideally 16.666ms = 60fps
    updateDeltaTime() {
        let now = Date.now();
        this.dt = now - this.lastTick;
        this.lastTick = now;
    }

    // Check for collision between collidable objects
    checkCollisions() {
    
    }
}
