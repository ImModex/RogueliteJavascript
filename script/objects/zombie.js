import { Enemy } from "./enemy.js";

export class Zombie extends Enemy {

    constructor(x, y) {
        super("Zombie", x, y, 13, 21, 10, "./img/player/player_idle.png", 5, 2, 1);

        //this.setBoundaryOffset(22, -17, -23, 18);
        this.addAnimationInformation("idle", 13, 21, 0, 5, 3, "./img/player/player_idle.png");
        this.setCurrentAnimationByName("idle", () => {
            // Called when animation is done
        });
      
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