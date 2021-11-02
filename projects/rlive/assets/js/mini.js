let play = true;
let audio = new Audio("https://rliveradio.out.airtime.pro/rliveradio_a");
$(".player").click(function () {
    if (play) {
        $(".state").html("<i class='gg-play-stop-o'></i>");
        audio.play();
        $(".state i").addClass("roll");
        play = false;
    } else {
        $(".state").html("<i class='gg-play-button-o'></i>");
        audio.pause();
        $(".state i ").removeClass("roll");
        play = true;
    }
});
