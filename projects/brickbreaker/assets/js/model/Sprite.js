
/**
 * A 2 dimensional mobile element of the game (either ball, paddle or bricks in this case).
 * Each Sprite knows it's own dimensions and position.
 */
class Sprite {

    /**
     * Constructor of Sprite.
     * @param {*} id the id of an object.
     * @param {string} type the type of an object that will define a span class (ball / paddle / brick).
     * @param {Position} topLeft a position based on the top left side of the element.
     * @param {Dimension} dimension dimensions of an object.
     */
    constructor(id, type, topLeft, dimension) {
        this._id = id;
        this._type = type;
        this._topLeft = topLeft;
        this._dimension = dimension;
    }

    /**
     * Getter of id.
     */
    get id() { return this._id; }

    /**
     * Getter of type.
     */
    get type() { return this._type; }

    /**
     * Getter of the position.
     */

    get position() { return this._topLeft; }

    /**
     * Getter of dimension.
     */
    get dimension() { return this._dimension; }

    /**
     * Sets the Position.
     * @param {Position} position the new value of Position.
     * @param {string} type the object class.
     */
    set position(position) { this._topLeft = position; }

    /**
     * Gets the position of the top side of a Sprite.
     */
    get top() { return this.position.yPos; }

    /**
     * Gets the position of the bottom side of a Sprite.
     */
    get bottom() { return this.position.yPos + this.dimension.height; }

    /**
     * Gets the position of the left side of a Sprite.
     */
    get left() { return this.position.xPos; }

    /**
     * Gets the position of the right side of a Sprite.
     */
    get right() { return this.position.xPos + this.dimension.width; }

    /**
     * Returns the center of either the width, or the height of a Sprite.
     * @param {String} type the type of center we want.
     */
    center(type) { if (type === "height") return this.dimension.height / 2; else if (type === "width") return this.dimension.width / 2; }

    /**
     * Indicates if there is a vertical (y) collision between two sprites.
     * @param {Sprite} otherSprite the sprite to compare for collisions.
     */
    hasCollidedHorizontally(otherSprite) {
        return this.top < otherSprite.position.yPos + otherSprite.dimension.height && this.top > otherSprite.position.yPos;
    }
    
    /**
     * Indicates if there is an horizontal (x) collision between two sprites.
     * @param {Sprite} otherSprite the sprite to compare for collisions.
     */
    hasCollidedVertically(otherSprite) {
        return this.left < otherSprite.position.xPos + otherSprite.dimension.width && this.left > otherSprite.position.xPos;
    }

    /**
     * Indicate if two sprites are at the same height.
     * @param {Sprite} otherSprite the sprite to compare for collisions.
     */
    atSameHeight(otherSprite) {
        return this.position.yPos - this.center("height") < otherSprite.position.yPos + otherSprite.dimension.height && this.position.yPos + this.center("height") > otherSprite.position.yPos;
    }

    /**
     * Indicate if a sprite is located in between the limits of another sprite.
     * @param {Sprite} otherSprite the sprite to compare for collisions.
     */
    inBetweenOther(otherSprite) {
        return this.position.xPos - this.center("width") < otherSprite.position.xPos + otherSprite.dimension.width && this.position.xPos + this.center("width") > otherSprite.position.xPos;
    }
}