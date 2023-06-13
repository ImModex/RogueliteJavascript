import {AnimatedObject} from "../animatedObject.js";
/**
 * object.
 *
 * @class player
 * @extends { AnimatedObject }
 */

export class Player extends AnimatedObject{

    constructor(x, y, gridWidth, gridHeight, canvas, movingTexture){
        super(x, y, gridWidth, gridHeight, canvas, movingTexture);
        
        this.x = x;
        this.y = y;
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.canvas = canvas;
        this.movingTexture = movingTexture;
    }

    draw(){
    }
}