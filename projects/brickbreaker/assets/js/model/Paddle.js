
/**
 * The paddle of the game.
 * It is aware of it's own position on the board.
*/
class Paddle extends Sprite {

    /**
     * Constructor of the Paddle class.
     * @param {Position} position the position of the Paddle on the board.
     * @param {Dimension} dimension the dimensions of Paddle.
     */
    constructor(position, dimension) { super("paddle1", "paddle", position, dimension); }

    /**
     * Keeps the paddle in between the current limits, to prevent any kind of overflow out of the board.
     * @param {Paddle} paddle The paddle.
     * @param {View} view The view.
     * @param {number} paddlePosX The X position of the paddle.
     */
    limits(paddle, view, paddlePosX) {
        if (paddlePosX < 0) this.position.xPos = 0;
            else if (paddlePosX > BOARD.width - this.dimension.width) this.position.xPos = BOARD.width - this.dimension.width;
            else this.position.xPos = paddlePosX;
        view.update(paddle);
    }

}