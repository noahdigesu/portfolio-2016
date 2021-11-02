
/**
 * A brick on the board.
 * It knows it's own position on the board and it's dimensions.
 */
class Brick extends Sprite {

    /**
     * Constructor of Brick.
     * @param {number} id the id of the brick.
     * @param {Position} position the position of the brick.
     * @param {Dimension} dimension the dimensions of the brick.
     */
    constructor(id, type, position, dimension) { super(id, type, position, dimension); }

}