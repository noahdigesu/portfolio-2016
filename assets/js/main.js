$(window).scroll(function () {
	let scroll = $(window).scrollTop();
	let header = $("#scroll");
	let autoportrait = $("#end");
	let headerPosition = header.offset().top;
	let autoportraitPosition = autoportrait.offset().top;

	if (scroll > headerPosition - 300) {
		$("#scroll").addClass("fade");
		$("nav").addClass("small");
	}

	if (scroll < headerPosition - 300) $("nav").removeClass("small");

	if (scroll > autoportraitPosition - 300) $("#end").addClass("fade");
});

$("#scrollbutton").click(function () {
	$("#scroll").addClass("fade");
	$("nav").addClass("small");
});

$("#quote").click(function () {
	$("#end").addClass("fade");
});

$("#burger").click(function () {
	$("#menu ul").toggleClass("on");
	$(".bar").toggleClass("rotate");
});

$("a.disabled").click(function (e) {
	e.preventDefault();
	$("div#notify").css("opacity", "1");
	$("div#blur").fadeIn("slow");
	$("div#notify").addClass("slideIn");
	$("body").css("overflow-y", "hidden");
});

$("button#close").click(function (e) {
	e.preventDefault();
	$("div#notify").animate({ opacity: 0 });
	setTimeout(function () {
		$("div#notify").removeClass("slideIn");
		$("div#blur").fadeOut("slow");
		$("body").css("overflow-y", "auto");
	}, 400);
});
