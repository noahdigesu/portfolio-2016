
/**
 * Gives dimensions to an object.
 */
class Dimension {

    /**
     * Constructor of Dimension.
     * @param {number} width the desired width of the object.
     * @param {number} height the desired height of the object.
     */
    constructor(width, height) { this._width = width; this._height = height; }

    /**
     * Getter of width.
     */
    get width() { return this._width; }

    /**
     * Getter of height.
     */
    get height() { return this._height; }

}