import { InputHandler } from "../inputHandler.js";
import { ImageObject } from "./imageObject.js";

export class Player extends ImageObject {
    name;
    healthPoints;
    maxHealth;
    damage;
    attackSpeed;
    inputHandler;
    soundManager;
    bulletController;

    iframe = false;
    iframeDuration = 1000;

    // TODO: Player can walk through right and bottom wall lol
    constructor(name, x, y, health, damage, attackSpeed, bulletController, canvas, inputHandler, soundManager) {
        super(name, x, y, 13, 21, 10, "./img/player/player_idle.png");

        //this.setBoundaryOffset(22, -17, -23, 18);
        this.addAnimationInformation("idle", 13, 21, 0, 5, 3, "./img/player/player_idle.png");
        this.addAnimationInformation("up", 13, 21, 0, 5, 3, "./img/player/player_up.png");
        this.addAnimationInformation("right", 15, 21, 0, 2, 3, "./img/player/player_right.png");
        this.addAnimationInformation("down", 13, 21, 0, 5, 3, "./img/player/player_down.png");
        this.addAnimationInformation("left", 15, 21, 0, 2, 3, "./img/player/player_left.png");

        this.setCurrentAnimationByName("idle", () => {
            // Called when animation is done
        });

        this.name = name;
        this.healthPoints = health;
        this.maxHealth = health;
        this.damage = damage;
        // TODO: Change max and min attackspeed if necessary
        this.attackSpeed = attackSpeed;
        this.inputHandler = inputHandler;
        this.soundManager = soundManager;
        this.bulletController = bulletController;
    }

    update() {
        if(this.inputHandler.updateCoordinates(this)) {
            this.soundManager.playIfNotPlaying("player_move");
        }
        this.shoot();
    }

    applyDamage(amount) {
        this.healthPoints -= amount;
        this.soundManager.playIfNotPlaying("player_hurt");

        // Object died
        if(this.healthPoints <= 0);
    }

    shoot() {
        if(!this.inputHandler.shootPressed()) return;
        const bulletSpeed = 5;
        const delay = 30;
        const bulletX = this.position.x + (this.dimensions.scaledWidth / 2);
        const bulletY = this.position.y + (this.dimensions.scaledHeight / 2);
        this.soundManager.playIfNotPlaying("player_shoot");
        this.bulletController.shoot(Object.id(this), this.damage, bulletX, bulletY, bulletSpeed, delay, this.inputHandler.shootDirection());
    }

}