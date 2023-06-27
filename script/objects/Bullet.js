import { ObjectManager } from "../utility.js";
import { ImageObject } from "./imageObject.js";

// This class represents a projectile in the game
export class Bullet extends ImageObject {
    speed;      // Speed in pixels per frame
    direction;  // Left, Right, Up and Down
    owner;      // Who shot the projectile
    damage;     // Amount of damage the projectile should do
    
    constructor(owner, damage, x, y, speed, direction) {
        super("Bullet", x, y, 15, 14, 3, "./img/projectiles/spark.gif");

        this.speed = speed;
        this.direction = direction;
        this.owner = owner;
        this.damage = damage;
    }

    onCollision(object) {
        // If object hit has an active iframe, do nothing
        if(object.iframe) return;
        // Bullet owner cannot hit themselves
        if(ObjectManager.getObjectById(this.owner) === object) return; 

        // Apply damage to the object hit and remove the bullet
        object.applyDamage(this.damage);
        this.active = false;
    }

    // Update position based on direction every frame
    update() {
        switch(this.direction) {
            case "right": this.position.x += this.speed; break;
            case "left": this.position.x -= this.speed; break;
            case "up": this.position.y -= this.speed; break;
            case "down": this.position.y += this.speed; break;
        }
    }
}