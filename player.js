import { InputHandler } from "./inputHandler.js";

export class Player {
    x;
    y;
    name;
    healthPoints;
    damage;
    attackSpeed;
    inputHandler;
    bulletController;

    constructor(name, health, damage, attackSpeed, bulletController, canvas) {
        // TODO: Set Player coords
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.name = name;
        this.healthPoints = health;
        this.damage = damage;
        // TODO: Change max and min attackspeed if necessary
        this.attackSpeed = (attackSpeed <= 0) ? 1 : (attackSpeed > 5) ? 5 : attackSpeed;
        this.inputHandler = new InputHandler(canvas);
        this.bulletController = bulletController;
    }

    // TODO: Move this to object class
    draw(canvas){
        this.inputHandler.updateCoordinates(this);
        canvas.drawLayer.beginPath();
        canvas.drawLayer.arc(this.x, this.y, 20, 0, Math.PI * 2, false);
        canvas.drawLayer.fillStyle = "#0095DD";
        canvas.drawLayer.fill();
        canvas.drawLayer.closePath();
    }

    shoot() {
        if(!this.inputHandler.shootPressed()) return;
        const bulletSpeed = 5;
        const delay = 10;
        const bulletX = this.x + 10;
        const bulletY = this.y;
        this.bulletController.shoot(bulletX, bulletY, bulletSpeed, delay, this.inputHandler.shootDirection());
    }

}