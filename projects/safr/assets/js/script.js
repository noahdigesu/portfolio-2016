/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'assets/js/particlesjs-config.json', function () {
    // console.log('callback - particles.js config loaded - particles-js');
});

/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js-2', 'assets/js/particlesjs-config.json', function () {
    // console.log('callback - particles.js config loaded - particles-js-2');
});

$(window).scroll(function () {
    var height = $(window).scrollTop();
    let delay = 0;
    if (height !== 0 && height > 300) {

        for (let i = 1; i <= 9; i++) {
            setTimeout(function () {
                $(`.card:nth-of-type(${i})`).addClass("fade");
            }, delay);
            delay === 0 ? delay = 200 : delay += 100;
        }

    }
});

$(window).resize(function () {
    let winWidth = $(window).width();
    if (winWidth < 1300) {
        $("header h2").text("This website is only intended to be used on computers 😬");
    } else {
        $("header h2").text("Easily download extensions for your browser to keep you away from online harm");
    }
});