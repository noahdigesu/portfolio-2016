
/**
 * The ball of the game.
 * It is aware of it's own position on the board.
 */
class Ball extends Sprite {

    /**
     * The constructor of Ball.
     * @param {Position} position the position of the ball on the board.
     * @param {Dimension} dimension the ball's dimension.
     * @param {Movement} movement the ball's movement.
     */
    constructor(position, dimension, movement) {
        super("ball1", "ball", position, dimension);
        this._movement = movement;
    }

    /**
     * Getter of Movement.
     */
    get movement() { return this._movement; }

    /**
     * Sets the Movement.
     * @param {Movement} movement the new value of Movement.
     */
    set movement(movement) { this._movement = movement; }

    /**
     * Moves the ball position based on the movement DeltaX and DeltaY.
     */
    move() { this.updatePos(); this.overflow(); }

    /**
     * Updates the position of the ball when it moves by
     * adding the deltaX to it's current X position and
     * the deltaY to it's current Y position.
     */
    updatePos() { this.position.xPos += this.movement.deltaX; this.position.yPos += this.movement.deltaY; }

    /**
     * Checks if the ball touched the edges of the board
     * and reverses it's movement depending on the type
     * of overflow.
     */
    overflow() {
        let overflowType = {
            top: this.position.yPos < (this.dimension.width / 2),
            bottom: this.position.yPos > (BOARD.height - (this.dimension.height / 2)),
            left: this.position.xPos < (this.dimension.width / 2),
            right: this.position.xPos > (BOARD.width - (this.dimension.width / 2))
        };

        if (overflowType.left || overflowType.right) this.movement.reverseDeltaX();
            else if (overflowType.top || overflowType.bottom) this.movement.reverseDeltaY();
    }

}