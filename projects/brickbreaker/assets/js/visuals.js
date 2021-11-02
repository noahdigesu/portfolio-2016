/**
 * Animations for the website.
 */

$(document).ready(function () {

  setTimeout(function () { // Fades in the button to start the game on page load
    $(".start").css({
      "opacity": "1",
      "pointer-events": "all"
    });
  }, 3000);

  $("#theme-song").prop("volume", .5);

});

/**
 * Actions on "INSERT COIN" click.
 */
$(".start").click(function () { // Actions to do on the click of the start button

  let audio = document.getElementById("game-start");
	audio.play();

  $(".start-game img").addClass("jump");

  setTimeout(function () {
    $(".start-game").fadeOut();
  }, 1000);

  setTimeout(function () {
    $("#started-game").fadeIn();
  }, 1400);

  setTimeout(function () {
    $(".paddle").addClass("blink");
    $(".mute").fadeIn();
    let audio = document.getElementById("theme-song");
    audio.play();
  }, 1500);

  setTimeout(function () {
    gameCtrl.play();
  }, 1600);

});

/**
 * Mutes the theme song on click.
 */
$(".music").click(function() {
  let audio = document.getElementById("theme-song"); toggleMute(audio);
});

function toggleMute(audio) { return audio.paused ? audio.play() : audio.pause(); };

$(".sounds").click(function() {

  let audio;
  audio = document.getElementById("level-up"); toggleSounds(audio);
  audio = document.getElementById("game-start"); toggleSounds(audio);
  audio = document.getElementById("game-lost"); toggleSounds(audio);
  audio = document.getElementById("touched-bottom"); toggleSounds(audio);
  audio = document.getElementById("touched-paddle"); toggleSounds(audio);
  audio = document.getElementById("touched-brick"); toggleSounds(audio);

});

function toggleSounds(audio) { return audio.volume === 1 ? audio.volume = 0 : audio.volume = 1; };