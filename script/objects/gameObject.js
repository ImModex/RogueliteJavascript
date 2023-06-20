export class GameObject { 
    active = 1;
    hasCollisions = false;
    name;

    iframe = false;
    iframeDuration = 1000;

    colors = {
        color: "#000000",
        borderColor: "#000000"
    }

    position = {
        "x": 90,
        "y": 90,
        "centerX": () => {
            return this.position.x + ((this.dimensions.scaledWidth) ? this.dimensions.scaledWidth / 2 : this.dimensions.width / 2)
        },
        "centerY": () => {
            return this.position.y + ((this.dimensions.scaledHeight) ? this.dimensions.scaledHeight / 2 : this.dimensions.height / 2);
        }
    };

    prevPosition = {
        "x": 90,
        "y": 90
    };

    dimensions = {
        "width": 0,
        "height": 0,
        "scaledWidth": 0,
        "scaledHeight": 0
    };

    offsets = {
        "top": 0,
        "right": 0,
        "bottom": 0,
        "left": 0
    }

    boundaries = {
        "leftBoundary": () => {
            return this.position.x + this.offsets.left;
        },
        "rightBoundary": () => {
            if (this.dimensions.scaledWidth) {
                return this.position.x + this.dimensions.scaledWidth + this.offsets.right;
            }
            return this.position.x + this.dimensions.width + this.offsets.right;
        },
        "topBoundary": () => {
            return this.position.y + this.offsets.top;
        },
        "bottomBoundary": () => {
            if (this.dimensions.scaledHeight) {
                return this.position.y + this.dimensions.scaledHeight + this.offsets.bottom;
            }
            return this.position.y + this.dimensions.height + this.offsets.bottom;
        }
    }

    constructor(name, x, y, width, height, color, borderColor) {
        this.name = name;
        this.position.x = Math.round(x);
        this.position.y = Math.round(y);
        this.dimensions.width = width;
        this.dimensions.height = height;
        this.colors.color = color;
        this.colors.borderColor = borderColor;
    }

    update() {

    }

    onCollision(object) {}

    storePosition() {
        this.prevPosition.x = this.position.x;   
        this.prevPosition.y = this.position.y;
    }

    restorePosition() {
        this.position.x = this.prevPosition.x;
        this.position.y = this.prevPosition.y;
    }

    setBoundaryOffset(top, right, bottom, left) {
        this.offsets.top = top;
        this.offsets.bottom = bottom;
        this.offsets.right = right;
        this.offsets.left = left;
    }

    draw(canvas) {
        if(!this.active) return;
        
        canvas.drawLayer.beginPath();
        canvas.drawLayer.fillStyle = this.colors.color;
        canvas.drawLayer.strokeStyle = this.colors.borderColor;
        canvas.drawLayer.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
        canvas.drawLayer.fill();
        canvas.drawLayer.stroke();
        canvas.drawLayer.closePath();
    }
}