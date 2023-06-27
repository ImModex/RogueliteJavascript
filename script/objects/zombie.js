import { Enemy } from "./enemy.js";

// This class represents the Zombie - A melee enemy
export class Zombie extends Enemy {

    constructor(x, y, player, soundManager) {
        super("Zombie", x, y, 25, 25, 7, "./img/enemies/brainMole/facingRight/brainMoleIdle.png", 10, 1, 1, player, soundManager);

        // Add animations
        this.addAnimationInformation("idle_right", 25, 25, 0, 3, 3, "./img/enemies/brainMole/facingRight/brainMoleIdle.png");
        this.addAnimationInformation("idle_left", 25, 25, 0, 3, 3, "./img/enemies/brainMole/facingLeft/brainMoleIdleLeft.png");
        
        this.addAnimationInformation("attack_right", 25, 31, 0, 3, 3, "./img/enemies/brainMole/facingRight/brainMoleAttack.png");
        this.addAnimationInformation("attack_left", 25, 31, 0, 3, 3, "./img/enemies/brainMole/facingLeft/brainMoleAttackLeft.png");

        this.addAnimationInformation("death_right", 27, 31, 0, 6, 3, "./img/enemies/brainMole/facingRight/brainMoleDeath.png");
        this.addAnimationInformation("death_left", 27, 31, 0, 6, 3, "./img/enemies/brainMole/facingLeft/brainMoleDeathLeft.png");
        
        this.addAnimationInformation("hurt_right", 25, 25, 0, 3, 3, "./img/enemies/brainMole/facingRight/brainMoleHurt.png");
        this.addAnimationInformation("hurt_left", 25, 25, 0, 3, 3, "./img/enemies/brainMole/facingLeft/brainMoleHurtLeft.png");

        // Set default animation
        this.setCurrentAnimationByName("idle_right");
    }

    // Track the player every frame
    update() {
        this.followPlayer();
    }

    // Makes the Zombie move towards the player
    followPlayer() {
        if(this.position.x < this.player.position.x) {
            this.setCurrentAnimationByNameIfNotPlaying("idle_right");
            this.position.x += this.attackSpeed;

        } else if(this.position.x > this.player.position.x) {
            this.setCurrentAnimationByNameIfNotPlaying("idle_left");
            this.position.x -= this.attackSpeed;
        }

        if(this.position.y < this.player.position.y) {
            this.position.y += this.attackSpeed;
        } else if(this.position.y > this.player.position.y) {
            this.position.y -= this.attackSpeed;
        }
    }

    applyDamage(amount) {
        super.applyDamage(amount);
        
        if(this.healthPoints <= 0) {
            this.soundManager.playIfNotPlaying("melee_death");
        }
    }
}