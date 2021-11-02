
/**
 * A movement that will affect the Position of an element on the Board.
 */
class Movement {

    /**
     * Constructor of Movement.
     * @param {number} deltaX The delta X (X position where to move the ball based on a given direction).
     * @param {number} deltaY The delta Y (Y position where to move the ball based on a given direction).
     */
    constructor(deltaX, deltaY) {
        this._deltaX = deltaX;
        this._deltaY = deltaY;
    }

    /**
     * Getter of delta X.
     */
    get deltaX() { return this._deltaX; }

    /**
     * Getter of delta Y.
     */
    get deltaY() { return this._deltaY; }

    /**
     * Setter of delta Y.
     */
    set deltaY(deltaY) { this._deltaY = deltaY; }

    /**
     * Gives the opposite direction of Delta X.
     */
    reverseDeltaX() { this._deltaX = -this._deltaX; }

    /**
     * Gives the opposite direction of Delta Y.
     */
    reverseDeltaY() { this._deltaY = -this._deltaY; }
}