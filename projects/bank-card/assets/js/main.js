// I tried to find back the person who coded that but I couldn't :/

const card = document.querySelector(".bank");
const range = 70;

const calcValue = (a, b) => (a / b * range - range / 2).toFixed(1) // thanks @alice-mx

let timeout;
document.addEventListener('mousemove', ({ x, y }) => {
    if (timeout) {
        window.cancelAnimationFrame(timeout);
    }

    timeout = window.requestAnimationFrame(() => {
        const yValue = -calcValue(y, window.innerHeight);
        const xValue = -calcValue(x, window.innerWidth);

        card.style.transform = `rotateX(${yValue}deg) rotateY(${xValue}deg)`;
    })
}, false);

// change theme
toggled = false;
$(".theme").click(function() { 
  
  if(toggled === false) {
    
    toggled = true;
    $(".theme").html('<i class="far fa-lightbulb"></i>');
    $("body").css("background", "white");
    $(".bank").css(
      {
       "background": "radial-gradient(circle, rgba(61,56,56,1) 0%, rgba(34,32,32,1) 100%)",
       "color": "white"
      }
    );
    
  } else {
    
    toggled = false;
    $(".theme").html('<i class="fas fa-lightbulb"></i>');
    $("body").css("background", "#182a3a");
    $(".bank").css(
      {
       "background": "radial-gradient(circle, rgb(255, 255, 255) 0%, rgb(213, 213, 213) 100%)",
       "color": "black"
      }
    );
    
  }
});

// removes the card
$(".remove").click(function() {
  $(".bank").addClass("delete");
  $(".add").delay(800).fadeIn('slow');
});

$(".add").click(function() {
    //$(".reset i").css("transform", "rotateZ(360deg)");
    $(".add").addClass("zoomOut");
    $(".number span").html(pickRandomNumber());
    $(".owner").html(pickRandomName());

    setTimeout(function() {
      $(".add").removeClass("zoomOut");
      $(".add").css("display", "none");
      $(".bank").removeClass("delete");
      $(".bank").addClass("zoomIn");

        /*setTimeout(function() {
          $(".bank").removeClass("zoomIn");
        }, 700);*/
    }, 700);
    
});

// random number & name.
function pickRandomName() {
  const names = [
    "Jhon D.",
    "Francis O.",
    "Joseph L.",
    "Bertha M.",
    "Madeline B.",
    "Robert M.",
    "Agnes J.",
    "Thomas B.",
    "Ester D.",
    "Todd J.",
    "Lee D.",
    "Richard K.",
    "Patricia S.",
    "Janice A.",
    "Sandra J.",
    "Dolores D.",
    "Jackie E.",
    "Catherine R."
  ];
  
  return names[Math.floor(Math.random() * (names.length + 1))];
  
}

function pickRandomNumber() {
  return Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
}

// on load
$(".number span").html(pickRandomNumber());
$(".owner").html(pickRandomName());