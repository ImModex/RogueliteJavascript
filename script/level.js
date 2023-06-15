import { InputHandler } from "./inputHandler.js";
import { BulletController } from "./objects/BulletController.js";
import { Player } from "./objects/player.js";
import { Shooting } from "./objects/shooting.js";
import { Zombie } from "./objects/zombie.js";
import { drawHealthBar } from "./userinterface.js";


export class Level {
    playerObject = null;
    enemyObjects = [];
    bulletController = null;
    inputHandler = null;
    canvas = null;

    constructor(enemyCount, canvas) {
        this.canvas = canvas;
        this.bulletController = new BulletController();
        this.inputHandler = new InputHandler(this.canvas);
        this.playerObject = new Player("Test", screen.width/2, screen.height/2, 5, 5, 5, this.bulletController, this.canvas, this.inputHandler);

        for(let i=0; i < enemyCount; ++i) {
            let x = Math.floor(Math.random()*2);
            // TODO: Random coordinates in given range
            if(x == 0) {
                this.enemyObjects.push(new Zombie(screen.width/3, screen.height/3, this.playerObject));
            } else {
                this.enemyObjects.push(new Shooting(screen.width/3, screen.height/3, this.playerObject, this.bulletController));
            }
        }
    }

    update() { 
        console.log(this.enemyObjects);
        this.bulletController.update();
        this.bulletController.draw(this.canvas);
        this.enemyObjects.forEach(enemy => {
            enemy.update();
            enemy.draw(this.canvas);
        });
        this.playerObject.update();
        this.playerObject.draw(this.canvas);

        drawHealthBar(this.canvas, this.playerObject);
    }

    draw() {

    }
}