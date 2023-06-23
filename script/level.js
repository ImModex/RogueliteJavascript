import { InputHandler } from "./inputHandler.js";
import { BulletController } from "./objects/BulletController.js";
import { Player } from "./objects/player.js";
import { Shooting } from "./objects/shooting.js";
import { Zombie } from "./objects/zombie.js";
import { drawHealthBar, drawEnemyHealthbar } from "./userinterface.js";
import { AxisAlignedBoundingBoxCheck, collide, eulerDistance } from "./utility.js";
import { SoundManager } from "./soundManager.js";

export class Level {
    playerObject = null;
    enemyObjects = [];
    gameObjects = [];
    bulletController = null;
    inputHandler = null;
    soundManager = null;
    canvas = null;
    wave = null;

    constructor(enemyCount, canvas) {
        this.canvas = canvas;
        this.wave = enemyCount;
        this.bulletController = new BulletController();
        this.soundManager = new SoundManager();
        this.inputHandler = new InputHandler(this.canvas);
        this.playerObject = new Player("Test", screen.width/2, screen.height/3, 5, 2.5, 5, this.bulletController, canvas, this.inputHandler, this.soundManager);

        // Random coordinates for each enemy
        //let randX = Math.floor(Math.random() * ((screen.width-screen.width/6) - screen.width/2 + 1) + screen.width/2);
        //let randY = Math.floor(Math.random() * ((screen.height-200) - 0 + 1) + 0);
        this.generateEnemies(enemyCount);
    }

    generateEnemies(count) {
        for(let i = 0; i < count; ++i) {
            let type = Math.floor(Math.random() * 2);

            let x = Math.floor(Math.random()*2);
            
            let position = {
                x: 0,
                y: 0
            };

            do {
                position.x = Math.floor(Math.random() * screen.width);
                position.y = Math.floor(Math.random() * screen.height);
                console.log(eulerDistance(this.playerObject, {position}));
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

    update(canvas) {
        this.removeInactiveObjects();
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

        drawHealthBar(canvas, this.playerObject);
    }

    isActive() {
        return this.enemyObjects.length > 0;
    }

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
                    collide(enemy, playerBullet);
                }
            });
        });

        // Player collides with enemy bullet
        this.bulletController.bullets.filter(bullet => bullet.owner !== Object.id(this.playerObject)).forEach(enemyBullet => {
            if(AxisAlignedBoundingBoxCheck(this.playerObject, enemyBullet)) {
                collide(this.playerObject, enemyBullet);
            }
        });
    }
}