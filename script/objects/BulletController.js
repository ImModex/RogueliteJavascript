import { Bullet } from "./Bullet.js";

export class BulletController {
    bullets = [];
    timeToNextBullet = 0;

    times = [];

    constructor() {
        
    }

    update() {
        Object.keys(this.times).forEach(key => {
            this.times[key]--;
        });
    }     

    shoot(object, x, y, speed, delay, direction) {
        if(this.times[object] <= 0 || !this.times[object]) {
            this.bullets.push(new Bullet(object, x, y, speed, direction));
            this.times[object] = delay;
        }
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