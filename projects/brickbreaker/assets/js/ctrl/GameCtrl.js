/**
 * Allows to start or stop the game and creates new Instances for the controllers.
 */
class GameCtrl {

    /**
     * Constructor of GameCtrl.
     * @param {Game} game the game.
     * @param {View} view the view.
     */
    constructor(game, view) {
        this._game = game;
        this._view = view;
        this._audio = audio;

        this._paddleCtrl = new PaddleCtrl(game, view);
        this._ballCtrl = new BallCtrl(game, view);
        
        this.addVisuals();
    }

    addVisuals() {
        this._view.add(this._game.ball);
        this._view.add(this._game.paddle);
        this._view.addAll(this._game.wall);
    }

    /**
     * Starts the game.
     */
    play() { this._ballCtrl.start(); }

    /**
     * Stops the game.
     */
    stop() { this._ballCtrl.stop(); }

    /**
     * Restarts a game with a new paddle & ball.
     */
    restart() {
        this._paddleCtrl = new PaddleCtrl(this._game, this._view);
        this._ballCtrl = new BallCtrl(this._game, this._view);
        // ! I'll continue this part during my free time.
    }

    /**
     * Increases the level of the game and creates a new paddle & ball.
     */
    nextLevel() {
        this._paddleCtrl = new PaddleCtrl(this._game, this._view);
        this._ballCtrl = new BallCtrl(this._game, this._view);
        // ! I'll continue this part during my free time.
    }

}