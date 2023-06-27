// This class represents the general game object in the game
export class GameObject {
    // If this is set to 0, the object will be removed from the game on the next update
    active = 1;

    // Optimization for static objects that do not have collisions
    hasCollisions = true;
    name;

    // Colors for the basic renderer, only draws squares
    colors = {
        color: "#000000",
        borderColor: "#000000"
    }

    // Position on the canvas
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

    // Dimensions of the object, supports scaling by a factor
    dimensions = {
        "width": 0,
        "height": 0,
        "scaledWidth": 0,
        "scaledHeight": 0
    };

    // Hitbox offsets if necessary
    offsets = {
        "top": 0,
        "right": 0,
        "bottom": 0,
        "left": 0
    }

    // Calculates and returns the position of a boundary
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
        // Position can only be a full number!
        this.position.x = Math.round(x);
        this.position.y = Math.round(y);
        this.dimensions.width = width;
        this.dimensions.height = height;
        this.colors.color = color;
        this.colors.borderColor = borderColor;
    }

    // Fix objects that are off-screen
    fixPosition() {
        if(this.x + this.dimensions.scaledWidth >= screen.width) {
            this.x = screen.width - this.dimensions.scaledWidth;
        }

        if(this.y + this.dimensions.scaledHeight >= screen.height) {
            this.y = screen.height - this.dimensions.scaledHeight;
        }
    }

    update() {}

    onCollision(object) {}

    setBoundaryOffset(top, right, bottom, left) {
        this.offsets.top = top;
        this.offsets.bottom = bottom;
        this.offsets.right = right;
        this.offsets.left = left;
    }

    // Draws the object as basic square
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