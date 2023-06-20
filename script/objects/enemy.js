import { ImageObject } from "./imageObject.js";
import { ObjectManager } from "../utility.js";
import { Player } from "./player.js";

export class Enemy extends ImageObject {
    healthPoints;
    maxHealth;
    damage;
    attackSpeed;
    player;

    constructor(name, x, y, width, height, scaleFactor, sprite, healthPoints, damage, attackSpeed, player) {
        super(name, x, y, width, height, scaleFactor, sprite);

        this.healthPoints = healthPoints;
        this.maxHealth = healthPoints;
        this.damage = damage;
        this.attackSpeed = attackSpeed;

        this.player = player;
    }

    update(){}

    applyDamage(amount) {
        this.healthPoints -= amount;

        // Object died
        if(this.healthPoints <= 0) {
            this.active = false;
        }
    }

    onCollision(object) {
        if(object.iframe) return;
        if(ObjectManager.getObjectById(this.owner) === object || !(object instanceof Player)) return;

        object.applyDamage(this.damage);
    }
}
