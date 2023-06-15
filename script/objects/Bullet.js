import { ImageObject } from "./imageObject.js";

export class Bullet extends ImageObject {
    speed;
    direction;

    constructor(x, y, speed, direction) {
        super("Bullet", x, y, 15, 14, 3, "./img/projectiles/spark.gif");

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