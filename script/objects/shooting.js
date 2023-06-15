import { Enemy } from "./enemy.js";

export class Shooting extends Enemy {
    bulletController;

    constructor(player, x, y, bulletController) {
        super(player, "Shootable", x, y, 5, 5, 1);

        this.bulletController = bulletController;
        this.timeToNextShot = 10;
    }

    update() {
        this.move();
        this.shoot();
    }

    move() {
        // TODO: Move x position??
        if(this.player.position.y < this.position.y) {
            this.position.y -= this.attackSpeed;
        } else {
            this.position.y += this.attackSpeed;
        }
    }

    shoot() {
        const bulletX = this.position.x + (this.dimensions.scaledWidth / 2);
        const bulletY = this.position.y + (this.dimensions.scaledHeight / 2);
        let shootDirection = "left";
        if(this.player.position.x > this.position.x) {
            shootDirection = "right";
        }
        this.bulletController.shoot(bulletX, bulletY, 3, 100, shootDirection);
    }
}