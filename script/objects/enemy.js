import { ImageObject } from "./imageObject.js";

export class Enemy extends ImageObject {
    healthPoints;
    damage;
    attackSpeed;

    constructor(name, x, y, width, height, scaleFactor, sprite, healthPoints, damage, attackSpeed) {
        super(name, x, y, width, height, scaleFactor, sprite);

        this.healthPoints = healthPoints;
        this.damage = damage;
        this.attackSpeed = attackSpeed;
    }

    useAbility(player) {
        
    }
}
