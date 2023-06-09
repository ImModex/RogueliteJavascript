import { GameObject } from "./gameObject.js";

export class ImageObject extends GameObject {

    // Js image object
    image;
    isloaded = false;

    // Store image object for each animation
    // e.g. "move_right" -> one object
    //       "move_left" -> other object
    animations = {};
    
    // Rows and cols of source image
    columns = 0;
    rows = 0;

    // Store which image coords we are at right now
    currentSourceX = 0;
    currentSourceY = 0;
    
    // How many frames does animation have / which one is playing right now
    currentStartFrame = 0;
    currentEndFrame = 0;
    currentAnimationFrame = 0;
    currentAnimationName;
    
    // How fast should the animation be?
    fps = 0;
    frameCount = 0;

    // Function to call every time animation is done
    callback;


    constructor(name, x, y, width, height, scaledWidth, scaledHeight, src) {
        super(name, x, y, width, height);
        this.dimensions.scaledWidth = scaledWidth;
        this.dimensions.scaledHeight = scaledHeight;
        this.image = new Image();
        
        this.image.addEventListener("load", () => {             // only for walls (no animations)
            this.isLoaded = true;
            // this.columns = this.image.naturalWidth / this.dimensions.width;
            // this.rows = this.image.naturalHeight / this.dimensions.height;
        });
        
        if (src) {
            this.image.src = src;
        }
    }

    
    draw(canvas) {
        if(this.isLoaded) {
            this.changeFrameOfCurrentAnimation();
            canvas.drawLayer.beginPath();
            canvas.drawLayer.drawImage(this.image, this.currentSourceX, this.currentSourceY, this.dimensions.width, this.dimensions.height, this.position.x, this.position.y, this.dimensions.scaledWidth, this.dimensions.scaledHeight);
            
            // // check hitbox:
            // gameManager.canvas.drawingContext.strokeStyle = "white";
            // gameManager.canvas.drawingContext.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
            // gameManager.canvas.drawingContext.stroke();
            
            canvas.drawLayer.closePath();
        }
    }
    
    updateAnimation() {
        if (this.rows === 1 && this.columns === 1) {                        // for objects who dont update their animations (cos eg no collision function)
            this.setCurrentAnimationByName(this.currentAnimationName);      // --> standard values for columns/rows will be overriten a bit later + standard animation is set
        }
    }


    changeFrameOfCurrentAnimation() {
        this.updateAnimation();

        this.frameCount++;
        if (this.frameCount < 60 / this.fps) {
            return;
        }
        this.frameCount = 0;
        if (this.currentAnimationFrame > this.currentEndFrame) {
            this.currentAnimationFrame = this.currentStartFrame;
            if (this.callback) this.callback();
            if(!this.isActive) return;
        }
    
        let currentRow = Math.floor(this.currentAnimationFrame / this.columns); 
        let currentColumn = this.currentAnimationFrame % this.columns;
        this.currentSourceY = currentRow * this.dimensions.height;
        this.currentSourceX = currentColumn * this.dimensions.width;
        
        this.currentAnimationFrame++;      
    }

    addAnimationInformation(name, startFrame, endFrame, fps, src) {
        let image = new Image();                                            // saves images of animations in cache --> doesnt have to load new image every single time
        image.src = src;
        image.addEventListener("load", () => {
            this.isLoaded = true;
            this.animations[name].columns = image.naturalWidth / this.dimensions.width;
            this.animations[name].image = image;
            this.animations[name].rows = image.naturalHeight / this.dimensions.height;
        });
        let animationInformation = {
            "startFrame": startFrame,
            "endFrame": endFrame,
            "fps": fps,
            "image": this.image,
            "columns": 1,                   // standard value, will be overriten as soon as objects are updated (eg on collision, key input, etc)
            "rows": 1
        };
        this.animations[name] = animationInformation;
    }

    setCurrentAnimationByName(name, callback) {
        this.currentStartFrame = this.animations[name].startFrame;
        this.currentEndFrame = this.animations[name].endFrame;
        this.currentAnimationFrame = this.animations[name].startFrame;
        this.fps = this.animations[name].fps;
        this.image = this.animations[name].image;
        this.callback = callback;
        this.columns = this.animations[name].columns;
        this.rows = this.animations[name].rows;
        this.currentAnimationName = name;                   // saved so we can use later in update --> so we know which animation is needed

        this.frameCount = Number.MAX_VALUE;
    }

}