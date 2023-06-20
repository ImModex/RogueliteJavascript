import { Zombie } from "./objects/zombie.js";

export class ObjectManager {
    id = 0;
    static objects = [];

    constructor() {
        this.objectIDMiddleware();
    }

    objectIDMiddleware = () => {
        if ( typeof Object.id != "undefined" ) return;
    
        Object.id = function(o) {
            if ( typeof o.__uniqueid != "undefined" ) {
                return o.__uniqueid;
            }

            Object.defineProperty(o, "__uniqueid", {
                value: ++this.id,
                enumerable: false,
                // This could go either way, depending on your 
                // interpretation of what an "id" is
                writable: false
            });
    
            ObjectManager.objects[this.id] = o;
    
            return o.__uniqueid;
        }.bind(this);
    }

    static getObjectById = (id) => {
        return this.objects[id];
    }
}

export const AxisAlignedBoundingBoxCheck = (a, b) => {
    return a.boundaries.leftBoundary() <= b.boundaries.rightBoundary() &&
           a.boundaries.rightBoundary() >= b.boundaries.leftBoundary() &&
           a.boundaries.topBoundary() <= b.boundaries.bottomBoundary() &&
           a.boundaries.bottomBoundary() >= b.boundaries.topBoundary();
}

export const collide = (a, b) => {
    a.onCollision(b);
    b.onCollision(a);

    setIframe(a);
    setIframe(b);
}

export const eulerDistance = (a, b) => {
    return Math.sqrt(Math.pow(a.position.x - b.position.x, 2) + Math.pow(a.position.y - b.position.y, 2));
}

const setIframe = (o) => {
    if(!o.iframeDuration || o.iframe) return;

    o.iframe = true;
    setTimeout(() => {
        o.iframe = false;
    }, o.iframeDuration);
}