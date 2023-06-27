import { Canvas } from "./canvas.js";
import { events } from "./events.js";
import { Level } from "./level.js";
import { SoundManager } from "./soundManager.js";

// This class represents the manager for the entire game
export class GameManager {

    // Level object holds all in-game objects and manager instances
    level = null;

    // Canvas reference to draw on
    canvas = null;

    // Animation frame handle
    animationFrameHandle = null;

    // Delta time, used to dynamically scale velocities and timings to frame times
    // When someone lags -> Things would move / happen slower, therefore we use deltatime
    // to compensate that by increasing speed / tick so less ticks with higher speed
    // equal lower speed with more ticks
    dt = 0;

    soundManager = null;

    // Whether to pause the game loop or not
    paused = false;


    // Instanciate canvas, sound manager and generate a level
    constructor() {
        this.canvas = new Canvas(16, 9, "canvas");
        this.soundManager = new SoundManager();
        this.level = new Level(2, this.canvas, this.soundManager);
    }

    // Initialize game and start loop
    start() {
        this.lastTick = Date.now();
        this.gameLoop();
        this.paused = false;
    }
    
    // Generate a new level, cancel the old loop and start over
    restart() {
        this.level = new Level(2, this.canvas, this.soundManager);

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

        // When a level is done, increase current wave, clear bullets and generate new enemies
        // Also heals the player for +1hp / wave
        if(!this.level.isActive()) {
            this.level.wave++;
            this.level.waveCounter++;
            this.level.generateEnemies(this.level.wave);
            this.level.bulletController.bullets = [];
            if(this.level.playerObject.healthPoints < 5) {
                this.level.playerObject.healthPoints += 1;
            }
        }

        // If the player dies, dispatch death-event and play game-over sound
        if(this.level.playerObject.healthPoints <= 0) {
            dispatchEvent(events.playerDeath);
            this.soundManager.stop();
            this.soundManager.play("game_over");
            return;
        }

        // Maybe swap this with setTimeout with deltatime calculations
        this.animationFrameHandle = requestAnimationFrame(this.gameLoop.bind(this));
    }

    // Calculates time taken between ticks, ideally 16.666ms = 60fps
    updateDeltaTime() {
        let now = Date.now();
        this.dt = now - this.lastTick;
        this.lastTick = now;
    }
}
