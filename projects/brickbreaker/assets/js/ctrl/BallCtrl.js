
/**
 * Controller of Ball.
 * Provides methods to start / stop the ball and makes it move.
 */
class BallCtrl {

    /**
     * Constructor of Ball Ctrl.
     * @param {Game} game the game.
     * @param {View} view the View.
     */
    constructor(game, view) {
        this._ball = game.ball;
        this._view = view;
        this._game = game;
    }

    /**
     * Moves the ball of one step (defined by its movement)
     * and handles different types of events.
     */
    move() {
        
        let ballMove = this._game.ballMove();

        if (ballMove !== undefined && ballMove.length > 0) {
            
            ballMove.forEach(element => {
                setTimeout(function(){
                    audio.hitBrick();
                }, element * 700);
            });
        }
        
        this.lostLife();
        this.gameLost();
        this.gameWon();
        this.hitsPaddle();
        
        this.visualUpdates(ballMove);
    }

    /**
     * Handles events when the user has lost a life.
     */
    lostLife() {
        if (this._game.lostALife() && this._game.player.lives > 0) {
            this._view.lostALife(); audio.hitBottom();
        }
    }

    /**
     * Handles events when the user has lost the game.
     * Resets the game to the current level.
     */
    gameLost() {
        if (this._game.player.isStillAlive() === false) {
            
            gameCtrl.stop();
            this._view.gameOver();
            audio.gameLost(); audio.stopThemeSong();
            
            setTimeout(function() {
                audio.gameOver();
            }, 2500);

            gameCtrl.restart();
        }
    }

    /**
     * Handles events when the user has won the game.
     * It passes to the next.
     */
    gameWon() {
        if (this._game.won()) {
            gameCtrl.stop();
            audio.levelUp();
            gameCtrl.nextLevel();
            this._game.level++;
        }
    }

    /**
     * Handles events when the user hits the paddle.
     */
    hitsPaddle() { if (this._game.onPaddle()) audio.hitPaddle(); }
    
    /**
     * Visually updates the elements on the page.
     */
    visualUpdates(ballMove) {
        this._view.removeSprites(ballMove);
        this._view.update(this._ball);
        this._view.updateScore(this._game.player.score);
        this._view.updateLives(this._game.player.lives);
        this._view.updateLevel(this._game.level);
    }

    /**
     * Starts the ball.
     */
    start() { this._moveListener = setInterval(() => this.move(), 10); }
    
    /**
     * Stops the ball.
     */
    stop() { clearInterval(this._moveListener); }

}