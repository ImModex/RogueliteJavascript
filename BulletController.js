import { Bullet } from "./Bullet.js";

export class BulletController {
    bullets = [];
    timeToNextBullet = 0;

    constructor() {
        
    }

    shoot(x, y, speed, delay, direction) {
        if(this.timeToNextBullet <= 0) {
            //console.log(this.x + " " + this.y);
            this.bullets.push(new Bullet(x, y, speed, direction));
            this.timeToNextBullet = delay;
        }
        this.timeToNextBullet--; 
    }

    draw(canvas) {
        this.bullets.forEach((bullet) => {
            if(this.isOffScreen(bullet, canvas)) {
                const index = this.bullets.indexOf(bullet);
                this.bullets.splice(index, 1);
            }
            bullet.draw(canvas);
        });
    }

    isOffScreen(bullet, canvas) {
        switch(bullet.direction) {
            case "right": return bullet.x >= canvas.width + bullet.width;
            case "left": return bullet.x <= -bullet.width;
            case "up": return bullet.y <= -bullet.height;
            case "down": return bullet.y >= canvas.height + bullet.height;
        }
        return false;
    }
}