import { GameObject } from "./gameObject.js";

// This class represents a general object that has a sprite
export class ImageObject extends GameObject {

    // Js image object
    image;
    isloaded = false;

    scaleFactor;

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


    // TODO: Replace with scale factor
    constructor(name, x, y, width, height, scaleFactor = 1, src) {
        super(name, x, y, width, height);
        this.scaleFactor = scaleFactor;
        this.dimensions.scaledWidth = width * scaleFactor;
        this.dimensions.scaledHeight = height * scaleFactor;
        this.image = new Image();
        
        this.image.addEventListener("load", () => {             // only for walls (no animations)
            this.isLoaded = true;
            // this.columns = this.image.naturalWidth / this.dimensions.width;
            // this.rows = this.image.naturalHeight / this.dimensions.height;
        });
        
        if (src) {
            this.image.src = src;
        }

        this.fixPosition();
    }

    /*
    *
    */
    draw(canvas) {
        if(this.isLoaded) {
            this.changeFrameOfCurrentAnimation();
            canvas.drawLayer.beginPath();
            canvas.drawLayer.drawImage(this.image, this.currentSourceX, this.currentSourceY, this.dimensions.width, this.dimensions.height, this.position.x, this.position.y, this.dimensions.scaledWidth, this.dimensions.scaledHeight);

            // // check hitbox:
            // canvas.drawLayer.strokeStyle = "red";
            // canvas.drawLayer.rect(this.position.x, this.position.y, this.dimensions.scaledWidth, this.dimensions.scaledHeight);
            // canvas.drawLayer.stroke();
            
            canvas.drawLayer.closePath();
        }
    }
    
    updateAnimation() {
        if (this.rows === 1 && this.columns === 1) {                        // for objects that don't update their animations (e.g. no collision function)
            this.setCurrentAnimationByName(this.currentAnimationName);      // --> standard values for columns/rows will be overriten a bit later + standard animation is set
        }
    }


    /*
    *   Every animation is basically multiple "steps" in one big image.
    *   So every frame is it's own sub-image in one animation image.
    *   This function determines when to switch over to the next sub-image,
    *   and also handles the switching over calculations.
    */
    changeFrameOfCurrentAnimation() {
        // Static image workaround - DEPRECATED - 
        this.updateAnimation();

        // Counts the frames and returns if it is "too early" to switch to the next frame
        // (Target frame rate is 60fps!!!)
        this.frameCount++;
        if (this.frameCount < 60 / this.fps) {
            return;
        }
        this.frameCount = 0;

        // For when the animation reached its end
        if (this.currentAnimationFrame > this.currentEndFrame) {
            this.currentAnimationFrame = this.currentStartFrame;    // Loop back to start frame
            if (this.callback) this.callback();                     // Call the callback function
            if(!this.isActive) return;
        }
    
        // Calculate sub-image coordinates in the animation image and set them as current position
        let currentRow = Math.floor(this.currentAnimationFrame / this.columns); 
        let currentColumn = this.currentAnimationFrame % this.columns;
        this.currentSourceY = currentRow * this.dimensions.height;
        this.currentSourceX = currentColumn * this.dimensions.width;
        
        // Increment to the next frame
        this.currentAnimationFrame++;      
    }

    // Adds an animation with its information
    addAnimationInformation(name, width, height, startFrame, endFrame, fps, src) {
        // Saves images of animations in cache --> doesnt have to load new image every single time
        let image = new Image();
        image.src = src;
        image.addEventListener("load", () => {
            this.isLoaded = true;
            this.animations[name].columns = image.naturalWidth / width;
            this.animations[name].image = image;
            this.animations[name].rows = image.naturalHeight / height;
            this.animations[name].dimensions = {
                "width": width,
                "height": height
            }
        });

        // Template animation information will be overwritten once image is loaded
        let animationInformation = {
            "startFrame": startFrame,
            "endFrame": endFrame,
            "fps": fps,
            "image": this.image,
            "columns": 1,
            "rows": 1,
            "dimensions": {
                "height": height,
                "width": width
            }
        };
        this.animations[name] = animationInformation;
    }

    // Workaround to not interrupt current animation if it is already running
    setCurrentAnimationByNameIfNotPlaying(name, callback) {
        if(this.currentAnimationName === name) return;

        this.setCurrentAnimationByName(name, callback);
    }

    // Load animation information by name and set it as current
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

        this.dimensions.width = this.animations[name].dimensions.width;
        this.dimensions.height = this.animations[name].dimensions.height;

        this.dimensions.scaledWidth = this.animations[name].dimensions.width * this.scaleFactor;
        this.dimensions.scaledHeight = this.animations[name].dimensions.height * this.scaleFactor;

        // Set framecount to MAX VALUE so new animation gets drawn immediately
        this.frameCount = Number.MAX_VALUE;
    }

}