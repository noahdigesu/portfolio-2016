/**
 * Controls the paddle.
*/
class PaddleCtrl {

    /**
     * Display the paddle and controls it with the mouse.
     * @constructor
     * @param {Game} game the game.
     * @param {View} view the view.
     */
    constructor(game, view) { $(document).mousemove(this.moveMouse.bind(this, game.paddle, view)); }

    /**
     * Called when the mouse is moved thanks to the constructor.
     * It moves the paddle (horizontally) where the mouse is and between it's defined limits.
     * @param {Paddle} paddle the paddle.
     * @param {View} view the view.
     * @param {number} evt the mouse event.
     */
    moveMouse(paddle, view, evt) {
        let paddlePosX = evt.clientX - view.sceneLeft();
        paddle.limits(paddle, view, paddlePosX);
    }

}