// This class is used to give every object a unique identifier for easier referencing
// https://stackoverflow.com/questions/1997661/unique-object-identifier-in-javascript
export class ObjectManager {
    id = 0;
    // Map every created object to its unique identifier
    static objects = [];

    constructor() {
        this.objectIDMiddleware();
    }

    objectIDMiddleware = () => {
        if ( typeof Object.id != "undefined" ) return;

        // Every time an object is created, define and store the unique identifier as a property
        // Then add it to the object map
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

// AABBCC - Axis Aligned Bounding Box Collision Check
export const AxisAlignedBoundingBoxCheck = (a, b) => {
    if(!a.hasCollisions || !b.hasCollisions) return;
    
    return a.boundaries.leftBoundary() <= b.boundaries.rightBoundary() &&
           a.boundaries.rightBoundary() >= b.boundaries.leftBoundary() &&
           a.boundaries.topBoundary() <= b.boundaries.bottomBoundary() &&
           a.boundaries.bottomBoundary() >= b.boundaries.topBoundary();
}

// Collides two objects with each other and sets the iframe
export const collide = (a, b, iframe = true) => {
    a.onCollision(b);
    b.onCollision(a);

    if(iframe) {
        setIframe(a);
        setIframe(b);
    }
}

// Get the euler distance between objects
export const eulerDistance = (a, b) => {
    return Math.sqrt(Math.pow(a.position.x - b.position.x, 2) + Math.pow(a.position.y - b.position.y, 2));
}

// Sets iframe for the object if it isn't already set
const setIframe = (o) => {
    if(!o.iframeDuration || o.iframe) return;

    o.iframe = true;
    setTimeout(() => {
        o.iframe = false;
    }, o.iframeDuration);
}