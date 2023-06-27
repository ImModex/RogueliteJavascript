import { InputHandler } from "./inputHandler.js";
import { BulletController } from "./objects/BulletController.js";
import { Player } from "./objects/player.js";
import { Shooting } from "./objects/shooting.js";
import { Zombie } from "./objects/zombie.js";
import { drawHealthBar, drawEnemyHealthbar, drawWaveCounter } from "./userinterface.js";
import { AxisAlignedBoundingBoxCheck, collide, eulerDistance } from "./utility.js";

// This class holds data of a level
export class Level {
    playerObject = null;
    enemyObjects = [];
    gameObjects = [];

    bulletController = null;
    inputHandler = null;
    soundManager = null;
    
    canvas = null;
    
    wave = null;
    waveCounter = 1;

    // Sound manager is being passed into the level so sound can be player in menus
    constructor(enemyCount, canvas, soundManager) {
        this.canvas = canvas;
        this.wave = enemyCount;
        this.soundManager = soundManager;
        this.bulletController = new BulletController();
        this.inputHandler = new InputHandler(this.canvas);
        this.playerObject = new Player("Player", screen.width/2, screen.height/3, 5, 2.5, 5, this.bulletController, canvas, this.inputHandler, this.soundManager);

        this.generateEnemies(enemyCount);
    }

    // Generate <count> enemies with random locations and a minimum distance to the player
    // Enemy type is also randomized
    generateEnemies(count) {
        for(let i = 0; i < count; ++i) {
            let type = Math.floor(Math.random() * 2);

            // Enemy position
            let position = {
                x: 0,
                y: 0
            };

            // Regenerate enemy position while it is too close to player
            do {
                position.x = Math.floor(Math.random() * screen.width);
                position.y = Math.floor(Math.random() * screen.height);
            } while(eulerDistance(this.playerObject, {position}) < 600);

            switch (type) {
                case 0:
                    this.enemyObjects.push(new Zombie(position.x, position.y, this.playerObject, this.soundManager));
                    break;
                case 1:
                    this.enemyObjects.push(new Shooting(position.x, position.y, this.playerObject, this.bulletController, this.soundManager));
                    break;

                default:
                    break;
            }
        }
    }

    // Update level every frame
    update(canvas) {
        // Removes all objects that have the active attribute set to false
        this.removeInactiveObjects();
        // Check and handle collisions of objects
        this.checkCollisions();

        this.bulletController.update();
        this.bulletController.draw(canvas);

        this.enemyObjects.forEach(enemy => {
            enemy.update();
            enemy.draw(canvas);
            drawEnemyHealthbar(canvas, enemy);
        });

        this.playerObject.update();
        this.playerObject.draw(canvas);

        drawWaveCounter(canvas, this.waveCounter);
        drawHealthBar(canvas, this.playerObject);
    }

    // If there is no enemies, 
    isActive() {
        return this.enemyObjects.length > 0;
    }

    // Filter out all inactive objects
    removeInactiveObjects() {
        this.enemyObjects = this.enemyObjects.filter(enemy => enemy.active);
        this.gameObjects = this.gameObjects.filter(object => object.active);
        this.bulletController.bullets = this.bulletController.bullets.filter(bullet => bullet.active);
    }

    checkCollisions() {
        this.enemyObjects.forEach(enemy => {
            // Player collides with enemy
            if(AxisAlignedBoundingBoxCheck(enemy, this.playerObject)) {
                collide(enemy, this.playerObject);
            }

            // Enemy collides with player bullet
            this.bulletController.bullets.filter(bullet => bullet.owner === Object.id(this.playerObject)).forEach(playerBullet => {
                if(AxisAlignedBoundingBoxCheck(enemy, playerBullet)) {
                    collide(enemy, playerBullet, false);
                }
            });
        });

        // Player collides with enemy bullet
        this.bulletController.bullets.filter(bullet => bullet.owner !== Object.id(this.playerObject)).forEach(enemyBullet => {
            if(AxisAlignedBoundingBoxCheck(this.playerObject, enemyBullet)) {
                collide(this.playerObject, enemyBullet, false);
            }
        });
    }
}