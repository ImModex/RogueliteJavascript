import { InputHandler } from "../inputHandler.js";
import { ImageObject } from "./imageObject.js";

export class Player extends ImageObject {
    name;
    healthPoints;
    damage;
    attackSpeed;
    inputHandler;
    bulletController;

    constructor(name, x, y, health, damage, attackSpeed, bulletController, canvas) {
        super(name, x, y, 48, 64, 192, 256, "./img/player_idle.png")

        this.setBoundaryOffset(22, 17, 23, 18);
        this.addAnimationInformation("idle", 0, 5, 3, "./img/player_idle.png");
        this.setCurrentAnimationByName("idle");

        this.name = name;
        this.healthPoints = health;
        this.damage = damage;
        // TODO: Change max and min attackspeed if necessary
        this.attackSpeed = (attackSpeed <= 0) ? 1 : (attackSpeed > 5) ? 5 : attackSpeed;
        this.inputHandler = new InputHandler(canvas);
        this.bulletController = bulletController;
    }

    update() {
        this.inputHandler.updateCoordinates(this);
    }

        shoot() {
        if(!this.inputHandler.shootPressed()) return;
        const bulletSpeed = 5;
        const delay = 10;
        const bulletX = this.position.x + 10;
        const bulletY = this.position.y;
        this.bulletController.shoot(bulletX, bulletY, bulletSpeed, delay, this.inputHandler.shootDirection());
    }

}