import { Canvas } from "./canvas.js";
import { events } from "./events.js";
import { Level } from "./level.js";

export class GameManager {

    // Level object
    level = null;

    // Store all game objects without player
    gameObjects = [];

    // Canvas reference to draw on
    canvas = null;

    // Animation frame handle
    animationFrameHandle = null;

    // Delta time, used to dynamically scale velocities and timings to frame times
    // When someone lags -> Things would move / happen slower, therefore we use deltatime
    // to compensate that by increasing speed / tick so less ticks with higher speed
    // equal lower speed with more ticks
    dt = 0;

    paused = false;


    constructor() {
        // Get canvas from html and initialize
        this.canvas = new Canvas(16, 9, "canvas");


        // Add sound named "oof" with source
        // When sound is loaded, play it and loop = true
        // When sound is done playing (every time it is done playing if loop = true), execute callback
        /*
        this.soundManager.addSound("oof", "./sound/oof.mp3").then(() => {
            this.soundManager.play("oof", true, () => { console.log("hi"); this.soundManager.stop(); this.soundManager.play("oof", false, () => console.log(2)); });
        });*/

        this.level = new Level(2, this.canvas);
    }

    // Initialize game and start loop
    start() {
        this.lastTick = Date.now();
        this.gameLoop();
        this.paused = false;
    }
    
    restart() {
        this.canvas = new Canvas(16, 9, "canvas");
        this.level = new Level(2, this.canvas);

        if(this.animationFrameHandle)
            cancelAnimationFrame(this.animationFrameHandle);
        this.start();
    }

    togglePause() {
        if(this.paused) {
            this.gameLoop();
        } else {
            if(this.animationFrameHandle)
                cancelAnimationFrame(this.animationFrameHandle);
        }

        this.paused = !this.paused;
    }

    // Main game loop, will run 60 times / second (or less!!!)
    // TODO: Test deltatime
    gameLoop() {
        this.updateDeltaTime();
        this.canvas.drawLayer.clearRect(0, 0, canvas.width, canvas.height);

        this.level.update(this.canvas);

        if(!this.level.isActive()) {
            this.level.wave++;
            this.level.waveCounter++;
            this.level.generateEnemies(this.level.wave);
            this.level.bulletController.bullets = [];
            if(this.level.playerObject.healthPoints < 5) {
                this.level.playerObject.healthPoints += 1;
            }
        }

        
        if(this.level.playerObject.healthPoints <= 0) {
            dispatchEvent(events.playerDeath);
            console.log(this.level.soundManager);
            this.level.soundManager.stop();
            return;
        }

        this.animationFrameHandle = requestAnimationFrame(this.gameLoop.bind(this));
    }

    // Calculates time taken between ticks, ideally 16.666ms = 60fps
    updateDeltaTime() {
        let now = Date.now();
        this.dt = now - this.lastTick;
        this.lastTick = now;
    }
}
