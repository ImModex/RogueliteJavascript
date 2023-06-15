import { ImageObject } from "./imageObject.js";

export class Enemy extends ImageObject {
    healthPoints;
    damage;
    attackSpeed;
    player;

    constructor(name, x, y, width, height, scaleFactor, sprite, healthPoints, damage, attackSpeed, player) {
        super(name, x, y, width, height, scaleFactor, sprite);

        this.healthPoints = healthPoints;
        this.damage = damage;
        this.attackSpeed = attackSpeed;

        this.player = player;
    }

    update(){}
}
