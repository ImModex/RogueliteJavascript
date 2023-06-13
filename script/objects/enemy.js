import { ImageObject } from "./imageObject.js";

export class Enemy extends ImageObject {
    healthPoints;
    damage;
    attackSpeed;

    constructor(x, y, healthPoints, damage, attackSpeed) {
        super("Enemy", x, y, 13, 21, 195, 315, "./img/player_idle.png");

        //this.setBoundaryOffset(22, -17, -23, 18);
        this.addAnimationInformation("idle", 0, 5, 3, "./img/player_idle.png");
        this.setCurrentAnimationByName("idle", () => {
            // Called when animation is done
        });

        this.healthPoints = healthPoints;
        this.damage = damage;
        this.attackSpeed = attackSpeed;
    }

    followPlayer(player) {
        if(this.position.x < player.position.x) {
            this.position.x += this.attackSpeed;
        } else {
            this.position.x -= this.attackSpeed;
        }
        if(this.position.y < player.position.y) {
            this.position.y += this.attackSpeed;
        } else {
            this.position.y -= this.attackSpeed;
        }
    }
}
