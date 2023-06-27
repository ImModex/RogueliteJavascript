import { Bullet } from "./Bullet.js";

// This class manages all the bullets in the game
export class BulletController {
    // Array of bullet objects that are currently active
    bullets = [];

    // Shooting delay for every object in frames
    times = [];

    update() {
        Object.keys(this.times).forEach(key => {
            this.times[key]--;
        });
    }     

    shoot(owner, damage, x, y, speed, delay, direction) {
        // Only shoot a bullet if the shooter is not on cooldown
        if(this.times[owner] <= 0 || !this.times[owner]) {
            this.bullets.push(new Bullet(owner, damage, x, y, speed, direction));
            this.times[owner] = delay;
        }
    }

    // Draw each bullet and remove bullets that are outside the screen
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

    // Returns true if a bullet is off screen
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