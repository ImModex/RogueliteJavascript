import { Enemy } from "./enemy.js";

export class Shootable extends Enemy {
    bulletController;
    // Add delta time
    timeToNextShot;

    constructor(x, y, bulletController) {
        super("Shootable", x, y, 5, 5, 1);

        this.bulletController = bulletController;
        this.timeToNextShot = 10;
    }

    useAbility(player) {
        // TODO: Move x position??
        if(player.position.y < this.position.y) {
            this.position.y -= this.attackSpeed;
        } else {
            this.position.y += this.attackSpeed;
        }
        this.shoot(player);
    }

    shoot(player) {
        if(this.timeToNextShot > 0) {
            this.timeToNextShot -= 1;
            return;
        }
        const bulletX = this.position.x + (this.dimensions.scaledWidth / 2);
        const bulletY = this.position.y + (this.dimensions.scaledHeight / 2);
        let shootDirection = "left";
        if(player.position.x > this.position.x) {
            shootDirection = "right";
        }
        this.bulletController.shoot(bulletX, bulletY, 3, 10, shootDirection);
        this.timeToNextShot = 10;
    }
}