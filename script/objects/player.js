import { InputHandler } from "../inputHandler.js";
import { ImageObject } from "./imageObject.js";

export class Player extends ImageObject {
    name;
    healthPoints;
    damage;
    attackSpeed;
    inputHandler;
    bulletController;

    // TODO: Player can walk through right and bottom wall lol
    constructor(name, x, y, health, damage, attackSpeed, bulletController, canvas, inputHandler) {
        super(name, x, y, 13, 21, 10, "./img/player_idle2.png");

        //this.setBoundaryOffset(22, -17, -23, 18);
        this.addAnimationInformation("idle", 0, 5, 3, "./img/player_idle2.png");
        this.setCurrentAnimationByName("idle", () => {
            // Called when animation is done
        });

        this.name = name;
        this.healthPoints = health;
        this.damage = damage;
        // TODO: Change max and min attackspeed if necessary
        this.attackSpeed = (attackSpeed <= 0) ? 1 : (attackSpeed > 5) ? 5 : attackSpeed;
        this.inputHandler = inputHandler;
        this.bulletController = bulletController;
    }

    update() {
        this.inputHandler.updateCoordinates(this);
        this.shoot();
    }

    shoot() {
        if(!this.inputHandler.shootPressed()) return;
        const bulletSpeed = 5;
        const delay = 10;
        const bulletX = this.position.x + (this.dimensions.scaledWidth / 2);
        const bulletY = this.position.y + (this.dimensions.scaledHeight / 2);
        this.bulletController.shoot(bulletX, bulletY, bulletSpeed, delay, this.inputHandler.shootDirection());
    }

}