import { InputHandler } from "./inputHandler.js";
import { BulletController } from "./objects/BulletController.js";
import { Player } from "./objects/player.js";
import { Shooting } from "./objects/shooting.js";
import { Zombie } from "./objects/zombie.js";


export class Level {
    playerObject = null;
    enemyObjects = [];
    bulletController;

    constructor(enemyCount, canvas) {

        this.bulletController = new BulletController();
        this.playerObject = new Player("Test", screen.width/2, screen.height/2, 5, 5, 5, this.bulletController, canvas, new InputHandler(canvas));

        for(i=0; i < enemyCount; ++i) {
            x = Math.floor(Math.random()*2);
            // TODO: Random coordinates in given range
            if(x == 0) {
                this.enemyObjects.push(new Zombie(screen.width, screen.height, this.playerObject));
            } else {
                this.enemyObjects.push(new Shooting(screen.width, screen.height, this.playerObject));
            }
        }
    }
}