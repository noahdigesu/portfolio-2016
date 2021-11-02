
/**
 * A position on the Board with given X and Y values.
 */
class Position {

    /**
     * The constructor of Position.
     * @constructor
     * @param {number} x a X position based on the left side of the element.
     * @param {number} y a Y position based on the top side of the element.
     */
    constructor(x, y) { this._x = x; this._y = y; }

    /**
     * Getter of the X position.
     */
    get xPos() { return this._x; }

    /**
     * Getter of the Y position.
     */
    get yPos() { return this._y; }

    /**
     * Setter of the X position.
     * @param {number} x the new value for the X position.
     */
    set xPos(x) { this._x = x; }

    /**
     * Setter of the Y position.
     * @param {number} y the new value for the Y position.
     */
    set yPos(y) { this._y = y; }

}