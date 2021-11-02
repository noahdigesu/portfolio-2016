/**
 * Infos about the player such as it's score & it's remaining life.
 */
class Player {
    /**
     * Constructor of Player.
     */
    constructor() { this._score = 0; this._lives = 3; }

    /**
     * Getter of score.
     */
    get score() { return this._score;}

    /**
     * Getter of lives.
     */
    get lives() { return this._lives; }

    /**
     * Sets the player's current score.
     * @param {number} score the score to update to.
     */
    set score(score) { this._score = score; }

    /**
     * Sets the player's current lives.
     * @param {number} lives the number of lives to update to.
     */
    set lives(lives) { this._lives = lives; }

    /**
     * Checks if the player is still alive.
     */
    isStillAlive() { if (this.lives > 0) return true; else return false; }
}