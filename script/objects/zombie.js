import { Enemy } from "./enemy.js";

export class Zombie extends Enemy {
    constructor(player, x, y) {
        super(player, "Zombie", x, y, 5, 2, 1);
    }

    update() {
        this.followPlayer();
    }

    // TODO: add special abilities for zombie
    followPlayer() {
        if(this.position.x < this.player.position.x) {
            this.position.x += this.attackSpeed;
        } else {
            this.position.x -= this.attackSpeed;
        }
        if(this.position.y < this.player.position.y) {
            this.position.y += this.attackSpeed;
        } else {
            this.position.y -= this.attackSpeed;
        }
    }
}