let play = true;
let audio = new Audio("https://rliveradio.out.airtime.pro/rliveradio_a");
$(".player").click(function() {
  if (play) {
    $(".state").html("<i class='gg-play-stop-o'></i>");
    audio.play();
    $(".player").css("transform", "translatex(-15%)");
    $(".state i").addClass("roll");
    $(".outside").removeClass("unhovered");
    $(".outside").addClass("hovered");
    play = false;
  } else {
    $(".state").html("<i class='gg-play-button-o'></i>");
    audio.pause();
    $(".player").css("transform", "translatex(50%)");
    $(".state i ").removeClass("roll");
    $(".outside").removeClass("hovered");
    $(".outside").addClass("unhovered");
    play = true;
  }
});