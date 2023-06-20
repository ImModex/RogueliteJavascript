import { ObjectManager } from "../utility.js";
import { ImageObject } from "./imageObject.js";

export class Bullet extends ImageObject {
    speed;
    direction;
    owner;

    constructor(owner, x, y, speed, direction) {
        super("Bullet", x, y, 15, 14, 3, "./img/projectiles/spark.gif");

        this.speed = speed;
        this.direction = direction;
        this.owner = owner;
    }

    onCollision(object) {
        if(object.iframe) return;
        if(ObjectManager.getObjectById(this.owner) === object) return;

        object.applyDamage(ObjectManager.getObjectById(this.owner).damage);
        this.active = false;
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