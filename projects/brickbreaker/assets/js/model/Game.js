
/**
 * The game properties such as the paddle position and the ball position & speed are
 * defined here.
 */
class Game extends Level {

    /**
     * Constructor of Game.
     */
    constructor(level) {
        super(level); // 1 is the level to begin the game with.
    }

    /**
     * Moves the paddle.
     * @param {number} centerX 
     */
    paddleMove(centerX) { this._paddle.moveTo(centerX); }

    /**
     * Moves the ball.
     */
    ballMove() {
        this.ball.move();
        this.onPaddle();
        return this.collidesWithBrick();
    }

    /**
     * Checks if the ball is located on the paddle.
     * If yes, delta Y is reversed to make the ball bounce.
     */
    onPaddle() {

        if (this.collidesPaddle()) {
            this.reverseBallOnPaddle();
            this.ball.movement.deltaY *= 1.01; // increases the ball's speed progressively.
            return true;
        }
    }

    /**
     * Checks for a collision between the ball and a provided paddle.
     */
    collidesPaddle() { return this.ball.hasCollidedVertically(this.paddle) && this.ball.inBetweenOther(this.paddle) && this.ball.atSameHeight(this.paddle); }

    /**
     * Reverses the ball when hitting on the paddle.
     */
    reverseBallOnPaddle() {
        this.ball.movement.reverseDeltaY();
        if (this.ball.movement.deltaY > 0) this.ball.movement.reverseDeltaY(); // fix to prevent the ball from zigzagging.
    }

    /**
     * Handles the ball collision with bricks and returns
     * an array of destroyed bricks that will be removed in the view.
     */
    collidesWithBrick() {

        let brick;
        let destroyedBricks = new Array(0);
        for (let i = 0; i < this.wall.length; i++) {

            brick = this.wall[i];
            if (this.collidesBrickVertically(brick)) {

                this.addScore(brick);
                this.ball.movement.reverseDeltaY();
                destroyedBricks.push(brick);
                this.wall.splice(i, 1);

            } else if (this.collidesBrickHorizontally(brick)) {

                this.addScore(brick);
                this.ball.movement.reverseDeltaX();
                destroyedBricks.push(brick);
                this.wall.splice(i, 1);

            }

        }

        if (destroyedBricks.length > 0) return destroyedBricks;
    }

    /**
     * Checks for a vertical collision (y axis) between the ball & the provided brick.
     * @param {Brick} brick a brick.
     */
    collidesBrickVertically(brick) { return this.ball.hasCollidedVertically(brick) && this.ball.atSameHeight(brick); }

    /**
     * Checks for an horizontal collision (x axis) between the ball & the provided brick.
     * @param {Brick} brick a brick.
     */
    collidesBrickHorizontally(brick) { return this.ball.hasCollidedHorizontally(brick) && this.ball.inBetweenOther(brick); }

    /**
     * Adds 30 points to the player score on collision if the brick is a bonus,
     * adds 10 points otherwise.
     * @param {Brick} brick a brick.
     */
    addScore(brick) { if (brick.type === "bonus") this.player.score += 30; else this.player.score += 10; }

    /**
     * Returns true if user wins.
     */
    won() { if (this.wall.length <= 0) return true; }

    /**
     * Returns true if user loses a life.
     */
    lostALife() {
        if (this.ball.position.yPos >= (BOARD.height - this.ball.dimension.height / 2)) {
            this.player.lives--;
            this.player.score -= 5;
            return true;
        }
    }

}