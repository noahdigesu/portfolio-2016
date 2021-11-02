
/**
 * A bonus brick.
 * It knows it's own position on the board and it's dimensions.
 * It extends from brick and just has a special type in order to differenciate
 * them from a "normal" brick.
 */
class Bonus extends Brick {

    /**
     * Constructor of Bonus.
     * @param {number} id the id of the bonus brick.
     * @param {Position} position the position of the bonus brick.
     * @param {Dimension} dimension the dimensions of the bonus brick.
     */
    constructor(id, type, position, dimension) { super(id, type, position, dimension); }
}