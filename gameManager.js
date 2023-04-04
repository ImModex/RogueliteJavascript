import { Canvas } from "./canvas.js";
import { InputHandler } from "./inputHandler.js";
import { Player } from "./player.js";

export class GameManager {

    // Store player object
    playerObject = null;

    // Store all game objects without player
    gameObjects = [];

    // Canvas reference to draw on
    canvas = null;

    // Delta time, used to dynamically scale velocities and timings to frame times
    // When someone lags -> Things would move / happen slower, therefore we use deltatime
    // to compensate that by increasing speed / tick so less ticks with higher speed
    // equal lower speed with more ticks
    dt = 0;

    inputHandler;

    constructor() {
        // Get canvas from html and initialize
        this.canvas = new Canvas(15, 9, "canvas");
        this.playerObject = new Player("Test", 5, 5, 5);
        this.playerObject.setCoordinates(this.canvas.width / 2, this.canvas.height / 2)
        this.inputHandler = new InputHandler(this.playerObject, this.canvas);
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

        // TODO: Move this to object class
        //this.inputHandler.draw();
        this.inputHandler.updateCoordinates(this.playerObject);
        this.playerObject.draw(this.canvas);
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    // Calculates time taken between ticks, ideally 16.666ms = 60fps
    updateDeltaTime() {
        let now = Date.now();
        this.dt = now - this.lastTick;
        this.lastTick = now;
    }

    // Draw all objects to canvas
    drawObjects() {
        this.gameObjects.forEach(object => {

        });
    }

    // Check for collision between collidable objects
    checkCollisions() {
    
    }
}