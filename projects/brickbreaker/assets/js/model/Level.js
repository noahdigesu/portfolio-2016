/**
 * A level.
 * It contains a wall made out of bricks, a player, a paddle and a ball.
 */
class Level {

    /**
     * Constructor of level.
     * @param {number} level the desired level.
     */
    constructor(level) {
        this._level = level;

        let randomX = Math.floor(Math.random() * ((BOARD.width - BALL.width) - (BALL.width * 2) + 1) + (BALL.width * 2)); // * 2 because sometimes the ball ends up at a negative position due to the movement speed.
        let randomNegativeSpeed = -Math.abs(Math.random() * (2.7 - 1.5 + 1) + 1.5);
        let randomSpeed = Math.random() * 2.7 + 1;
        randomSpeed *= Math.random() * 2 == 1 ? 1 : -1; // 50% negative numbers.

        this._player = new Player;
        this._paddle = new Paddle(new Position(300, 575), new Dimension(96, 16));
        this._ball = new Ball(
            new Position(randomX, 300),
            new Dimension(24, 24),
            new Movement(randomSpeed, randomNegativeSpeed)
        );

        this._wallHeight = 3;
        this._wall = this.generateWall(level);
    }

    /**
     * Getter of Paddle.
     */
    get paddle() { return this._paddle; }

    /**
     * Getter of Ball.
     */
    get ball() { return this._ball; }

    /**
     * Getter of wall.
     */
    get wall() { return this._wall; }

    /**
     * Getter of wall height.
     */
    get wallHeight() { return this._wallHeight; }

    /**
     * Getter of player.
     */
    get player() { return this._player; }

    /**
     * Getter of level.
     */
    get level() { return this._level; }

    /**
     * Setter of level.
     * @param {number} level the new value of level.
     */
    set level(level) { this._level = level; }

    /**
     * Setter of wall.
     * @param {Array} wall the new wall.
     */
    set wall(wall) { this._wall = wall; }

    /**
     * Setter of wall height.
     * @param {number} wallHeight the new height of the wall.
     */
    set wallHeight(wallHeight) { this._wallHeight = wallHeight; }

    /**
     * Generates a new wall depending on the giving level.
     * If the level selected is 1, then it is the default level.
     * Otherwise, the level is randomly generated with 1 to 3 bonuses.
     * @param {number} level the level to generate the wall for.
     */
    generateWall(level) {
        let y = 34;
        let x = 0;
        let wall = new Array(0);

        if (level % 4 === 0) this.wallHeight++; // increment the wallHeight (number of rows) by 1.
        if (level === 1) this.generateFirstLevel(wall, x, y, 15); else this.generateOtherLevel(wall, x, y, 7);

        return wall;
    }

    /**
     * Generates the first level of the game.
     * @param {Array} wall the wall made out of bricks.
     * @param {number} x an x position.
     * @param {number} y a y position.
     * @param {number} desiredBricksPerRow number of bricks per row wanted.
     */
    generateFirstLevel(wall, x, y, desiredBricksPerRow) {

        for (let i = 0; i < this.wallHeight * desiredBricksPerRow; i++) {

            if (i !== 0 && i % desiredBricksPerRow === 0) {
                y += 34;
                x = 0;
            }

            wall.push(
                new Brick(
                    i,
                    "brick",
                    new Position(x * BRICK.width, y),
                    new Dimension(BRICK.width, BRICK.height)
                )
            );

            x++;
        }
    }

    /**
     * Generates a level with randomly positioned bricks on an X axis.
     * @param {Array} wall the wall made out of bricks.
     * @param {number} x an x position.
     * @param {number} y a y position.
     * @param {number} desiredBricksPerRow number of bricks per row wanted.
     */
    generateOtherLevel(wall, x, y, desiredBricksPerRow) {

        for (let i = 0; i < this.wallHeight * desiredBricksPerRow; i++) { // we want 8 bricks per row in order to randomise their position.

            x = Math.floor(Math.random() * ((BOARD.width - this.ball.dimension.width) - (this.ball.dimension.width * 2) + 1) + this.ball.dimension.width);

            while (x % BRICK.width !== 0) {
                x = Math.floor(Math.random() * ((BOARD.width - this.ball.dimension.width) - (this.ball.dimension.width * 2) + 1) + this.ball.dimension.width);
            }

            if (i % desiredBricksPerRow === 0) y += 34; // every 8 bricks, increments the y position of where the brick generates by 34 (to have space between each rows).

            wall.push(
                new Brick(
                    i,
                    "brick",
                    new Position(x, y),
                    new Dimension(BRICK.width, BRICK.height)
                )
            );
        }

        this.generateBonus(wall, desiredBricksPerRow);

    }

    /**
     * Generates bonuses for level 2 and more.
     * @param {Array} wall the wall containing the bricks.
     * @param {number} desiredBricksPerRow the number of bricks per row.
     */
    generateBonus(wall, desiredBricksPerRow) {

        let amountOfBonuses = Math.floor(Math.random() * (3 - 1 + 1) + 1); // You can get either 1, 2 or 3 bonuses in a game.
        let randomBrick;

        for (let i = 0; i < amountOfBonuses; i++) {

            randomBrick = Math.floor(Math.random() * (this.wallHeight * desiredBricksPerRow + 1)); // selects a random brick based on the diseredBricksPerRow from generateLevel.

            wall.splice( // replaces the random chosen brick with a new "Bonus brick" (same id, same position & dimensions).
                randomBrick,
                1,
                new Bonus(
                    wall[randomBrick].id,
                    "bonus",
                    new Position(wall[randomBrick].position.xPos, wall[randomBrick].position.yPos),
                    new Dimension(wall[randomBrick].dimension.width, wall[randomBrick].dimension.height)
                )
            );

        }

        return wall;
    }
}