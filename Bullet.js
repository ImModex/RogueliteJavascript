export class Bullet {
    x;
    y;
    speed;
    direction;
    width;
    height;

    constructor(x, y, speed, direction) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.direction = direction;

        this.width = 5;
        this.height = 5;
        this.color = "#000000";
    }

    draw(canvas) {
        canvas.drawLayer.beginPath();
        canvas.drawLayer.fillStyle = this.color;
        canvas.drawLayer.rect(this.x, this.y, this.width, this.height);
        canvas.drawLayer.fill();
        canvas.drawLayer.stroke();
        canvas.drawLayer.closePath();

        switch(this.direction) {
            case "right": this.x += this.speed; break;
            case "left": this.x -= this.speed; break;
            case "up": this.y -= this.speed; break;
            case "down": this.y += this.speed; break;
        }
    }
}