import { Bullet } from "./Bullet.js";

export class BulletController {
    bullets = [];
    timeToNextBullet = 0;

    constructor() {
        
    }

    shoot(x, y, speed, delay, direction) {
        if(this.timeToNextBullet <= 0) {
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
            bullet.update();
            bullet.draw(canvas);
        });
    }

    isOffScreen(bullet, canvas) {
        switch(bullet.direction) {
            case "right": return bullet.position.x >= canvas.width + bullet.dimensions.width;
            case "left": return bullet.position.x <= -bullet.dimensions.width;
            case "up": return bullet.position.y <= -bullet.dimensions.height;
            case "down": return bullet.position.y >= canvas.height + bullet.dimensions.height;
        }
        return false;
    }
}