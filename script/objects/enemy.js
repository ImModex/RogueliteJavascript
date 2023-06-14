import { ImageObject } from "./imageObject.js";

export class Enemy extends ImageObject {
    healthPoints;
    damage;
    attackSpeed;

    constructor(name, x, y, healthPoints, damage, attackSpeed) {
        super(name, x, y, 13, 21, 10, "./img/player_idle2.png");

        //this.setBoundaryOffset(22, -17, -23, 18);
        this.addAnimationInformation("idle", 0, 5, 3, "./img/player_idle2.png");
        this.setCurrentAnimationByName("idle", () => {
            // Called when animation is done
        });

        this.healthPoints = healthPoints;
        this.damage = damage;
        this.attackSpeed = attackSpeed;
    }

    useAbility(player) {
        
    }
}
