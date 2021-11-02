/**
 * The audio part of the game.
 * Purely auditive.
 */
class Audio {

    /**
     * Plays a sound when the ball hits the bottom of the board.
     */
    hitBottom() { let audio = document.getElementById("touched-bottom"); audio.play(); }

    /**
     * Plays a sound when the ball hits paddle.
     */
    hitPaddle() { let audio = document.getElementById("touched-paddle"); audio.play(); }

    /**
     * Plays a sound when the ball hits a brick.
     */
    hitBrick() { let audio = document.getElementById("touched-brick"); audio.play(); }

    /**
     * Plays a sound when the user levels up.
     */
    levelUp() { let audio = document.getElementById("level-up"); audio.play(); }

    /**
     * Plays a sound when the user has lost.
     */
    gameLost() { let audio = document.getElementById("game-lost"); audio.play(); }

    /**
     * Plays a sound for the game over screen.
     */
    gameOver() { let audio = document.getElementById("game-over"); audio.play(); }

    /**
     * Pauses the theme song and resets the time to 0.
     */
    stopThemeSong() {
        let audio = document.getElementById("theme-song"); audio.pause();
        audio.currentTime = 0;
    }

}