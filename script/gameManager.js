import { Canvas } from "./canvas.js";
import { Player } from "./objects/player.js";
import { BulletController } from "./objects/BulletController.js";
import { InputHandler } from "./inputHandler.js";
import { SoundManager } from "./soundManager.js";
import { Zombie } from "./objects/zombie.js";
import { Shooting } from "./objects/shooting.js";
import { drawHealthBar } from "./userinterface.js";
import { Level } from "./level.js";

export class GameManager {

    level = null;

    // Store player object
    playerObject = null;

    // Store enemy objects
    enemyObjects = [];

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
    soundManager;

    constructor() {
        // Get canvas from html and initialize
        this.canvas = new Canvas(16, 9, "canvas");
        //this.bulletController = new BulletController();
        this.inputHandler = new InputHandler(this.canvas);
        this.soundManager = new SoundManager();

        this.level = new Level(2, this.canvas);


        // Add sound named "oof" with source
        // When sound is loaded, play it and loop = true
        // When sound is done playing (every time it is done playing if loop = true), execute callback
        /*
        this.soundManager.addSound("oof", "./sound/oof.mp3").then(() => {
            this.soundManager.play("oof", true, () => { console.log("hi"); this.soundManager.stop(); this.soundManager.play("oof", false, () => console.log(2)); });
        });
        */
        
        //this.playerObject = new Player("Test", screen.width / 2, screen.height / 2, 5, 5, 5, this.bulletController, this.canvas, this.inputHandler);

        //this.enemyObjects.push(new Zombie(screen.width / 4, screen.height / 4, this.playerObject));
        //this.enemyObjects.push(new Shooting(screen.width / 3, screen.height / 3, this.playerObject, this.bulletController));
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
        this.canvas.drawLayer.clearRect(0, 0, canvas.width, canvas.height);
 
        this.level.update();

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
