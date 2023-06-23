import { Enemy } from "./enemy.js";

export class Shooting extends Enemy {
    bulletController;
    shootDirection = "left";
    soundManager;

    constructor(x, y, player, bulletController, soundManager) {
        super("Kobold Priest", x, y, 17, 18, 6, "./img/enemies/koboldPriest/facingRight/koboldPriestIdle.png", 7.5, 1, 1, player);

        this.addAnimationInformation("idle_right", 17, 18, 0, 3, 1.5, "./img/enemies/koboldPriest/facingRight/koboldPriestIdle.png");
        this.addAnimationInformation("idle_left", 17, 18, 0, 3, 1.5, "./img/enemies/koboldPriest/facingLeft/koboldPriestIdleLeft.png");
        
        this.addAnimationInformation("attack_right", 23, 18, 0, 3, 1.5, "./img/enemies/koboldPriest/facingRight/koboldPriestAttackBorderCenter.png");
        this.addAnimationInformation("attack_left", 23, 18, 0, 3, 1.5, "./img/enemies/koboldPriest/facingLeft/koboldPriestAttackBorderCenterButFacingLeft.png");

        this.addAnimationInformation("death_right", 26, 18, 0, 3, 1.5, "./img/enemies/koboldPriest/facingRight/koboldPriestDeath.png");
        this.addAnimationInformation("death_left", 26, 18, 0, 3, 1.5, "./img/enemies/koboldPriest/facingLeft/koboldPriestDeathLeft.png");
        
        this.addAnimationInformation("hurt_right", 17, 18, 0, 3, 1.5, "./img/enemies/koboldPriest/facingRight/koboldPriestHurt.png");
        this.addAnimationInformation("hurt_left", 17, 18, 0, 3, 1.5, "./img/enemies/koboldPriest/facingLeft/koboldPriestHurtLeft.png");

        this.setCurrentAnimationByName("idle_right", () => {
            // Called when animation is done
        });

        this.bulletController = bulletController;
        this.soundManager = soundManager;
        this.timeToNextShot = 10;
    }

    update() {
        this.move();
        this.shoot();
    }

    move() {
        // TODO: Move x position??
        if(this.player.position.y < this.position.y) {
            this.position.y -= this.attackSpeed * 2;
        } else if(this.player.position.y > this.position.y) {
            this.position.y += this.attackSpeed * 2;
        }
    }

    shoot() {
        const bulletX = this.position.x + (this.dimensions.scaledWidth / 2);
        const bulletY = this.position.y + (this.dimensions.scaledHeight / 2);
        this.shootDirection = "left";
        if(this.player.position.x > this.position.x) {
            this.shootDirection = "right";
        }

        this.setCurrentAnimationByNameIfNotPlaying("attack_" + this.shootDirection, () => {
            this.setCurrentAnimationByNameIfNotPlaying("idle_" + this.shootDirection);
        });

        this.soundManager.playIfNotPlaying("enemy_shoot");
        this.bulletController.shoot(Object.id(this), this.damage, bulletX, bulletY, 3, 200, this.shootDirection);
    }
}