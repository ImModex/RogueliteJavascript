export class Player {
    x;
    y;
    name;
    healthPoints;
    damage;
    attackSpeed;

    constructor(name, health, damage, attackSpeed) {
        // TODO: Set Player coords
        this.name = name;
        this.healthPoints = health;
        this.damage = damage;
        // TODO: Change max and min attackspeed if necessary
        this.attackSpeed = (attackSpeed <= 0) ? 1 : (attackSpeed > 5) ? 5 : attackSpeed;
    }

    setCoordinates(x, y) {
        this.x = x;
        this.y = y;
    }

    // TODO: Move this to object class
    draw(canvas){
        canvas.drawLayer.clearRect(0, 0, canvas.width, canvas.height);
        canvas.drawLayer.beginPath();
        canvas.drawLayer.arc(this.x, this.y, 20, 0, Math.PI * 2, false);
        canvas.drawLayer.fillStyle = "#0095DD";
        canvas.drawLayer.fill();
        canvas.drawLayer.closePath();
    }

}