import { GameObject } from "./gameObject.js";

export class Bullet extends GameObject {
    speed;
    direction;

    constructor(x, y, speed, direction) {
        super("Bullet", x, y, 5, 5, "#000000");

        this.speed = speed;
        this.direction = direction;
    }

    update() {
        switch(this.direction) {
            case "right": this.position.x += this.speed; break;
            case "left": this.position.x -= this.speed; break;
            case "up": this.position.y -= this.speed; break;
            case "down": this.position.y += this.speed; break;
        }
    }
}