colors = ["#FFDA7D", "#D07DE7", "#e06c75", "#DBA169", "#85e65f", "#94caf9"];

function checkText(text) {
  if (text.length >= 1) {
    switch(text) {
      case "-yellow":
        changeColor("font", colors[0]);
        break;
        
      case "-purple":
        changeColor("font", colors[1]);
        break;
        
      case "-red":
        changeColor("font", colors[2]);
        break;
        
      case "-green":
        changeColor("font", colors[4]);
        break;
        
      case "-blue":
        changeColor("font", colors[5]);
        break;
        
      default:
        changeColor("font", text);
        break;
    }
  }
}

$("#default").click(function() {
   changeColor("bg", "#FF7D85");
});

$("#purple").click(function() {
   changeColor("bg", colors[1]);
});

$("#yellow").click(function() {
   changeColor("bg", colors[0]);
});

$("#brown").click(function() {
   changeColor("bg", colors[3]);
});

$("#blue").click(function() {
   changeColor("bg", colors[5]);
});

function changeColor(type, colorHex) {
  if (type === "font")
    $("textarea").css("color", colorHex);
  
  else if (type === "bg")
    $("body").css("background-color", colorHex);
  
}

$(".container").mouseenter(function() {
  $("#tip").css({"transform": "translate(-50%, 70%)", "opacity": "1"});
});
$(".container").mouseleave(function() {
  $("#tip").css({"transform": "translate(-50%, 50%)", "opacity": "0"});
});

$(".close").click(function() {
  $(".popIn").addClass("popOut");
});