import { Enemy } from "./enemy.js";

export class Zombie extends Enemy {
    constructor(x, y) {
        super("Zombie", x, y, 5, 2, 1);
    }

    useAbility(player) {
        this.followPlayer(player);
    }

    // TODO: add special abilities for zombie
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