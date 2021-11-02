
/**
 * The view of the game.
 * It allows for graphical output for the user.
*/
class View {

    /**
     * Returns the offset of the left position based on the cursor's position plus half the size of the paddle.
     * It allows to move the paddle based on the cursor. 
     */
    sceneLeft() { return $("#board").offset().left + (PADDLE.width / 2); }

    /**
     * Creates a sprite on the page based on it's id.
     * @param {Sprite} sprite the sprite.
     */
    add(sprite) { $("#board").append(`<span class="${sprite.type}" id="${sprite.id}"></span>`); }

    /**
     * Updates a given sprite's position on the page based on it's id.
     * @param {Sprite} sprite the sprite.
     */
    update(sprite) {
        $(`.${sprite.type}`).css({
            "left": sprite.position.xPos + "px",
            "top": sprite.position.yPos + "px"
        });
    }

    /**
     * Displays an array of sprites on the page with given X & Y coordinates.
     * @param {Sprite} sprite the array of sprites to add.
     */
    addAll(sprite) {
        sprite.forEach(
            element => $("#board").append(
                `<span class="${element.type}" id="${element.id}" style="top: ${element.position.yPos}px; left: ${element.position.xPos}px;"></span>`
            )
        );
    }

    /**
     * Removes an array of sprites on the page.
     * @param {Sprite} sprite the array of sprites to remove.
     */
    removeSprites(sprite) {
        if (sprite !== undefined) for (let i = 0; i < sprite.length; i++) { $(`#${sprite[i].id}`).remove(); }
    }

    /**
     * Updates the score of the player on the board.
     * @param {number} score the current score of the player.
     */
    updateScore(score) { $("#score").text(`score: ${score}`); }

    /**
     * Updates the remaining lifes ot the player on the board.
     * @param {number} lives the current lives of the player;
     */
    updateLives(lives) {
        $("#lives").text(`lives: ${lives}`);
    }

    /**
     * Updates the current level.
     * @param {number} level the level to update to.
     */
    updateLevel(level) { $("#level").text(`level: ${level}`); }

    /**
     * Animates a span when the user has lost a life.
     */
    lostALife() {
        $("#life-lost").addClass("lost-life");
        setTimeout(function () {
            $("#life-lost").removeClass("lost-life");
        }, 1500);
    }

    /**
     * Visual changes for when the game is over.
     */
    gameOver() {
        $(".title-container h1").text("GAME OVER");
        $(".start span").text("RESTART ?");

        $(".start").css({
            "opacity": "0",
            "pointer-events": "all"
        });

        setTimeout(function () {
            $("#started-game").fadeOut("slow");
            $(".mute").fadeOut();
        }, 600);

        setTimeout(function () {
            $(".start-game").fadeIn("slow");
        }, 1200);

        setTimeout(function () { // Shows the button to restart the game.
            $(".start").css({
                "opacity": "1",
                "pointer-events": "all"
            });
        }, 4000);
    }

}