let exerciceIndex = getExerciceIndex();
let currentQuestion = 0;
let availableChoices;


/* ----- URL & EXERCICE INDEX PROCESSING ----- */
// Returns the ID of the chosen exercice from the data.js file depending on the user's choice.
function getUrl() {
    
    let url = window.location.href; // Fetches the url.
    return url.substring( // Selects the part of the String from the # (not included) to the end of the String.
        url.indexOf("#") + 1
    );

}

// Returns the exercice index based on the getUrl function.
function getExerciceIndex() {

    for (let i = 0; i < data.length; i++) {

        if (data[i].id === getUrl())
            return i;

    }

}


/* ----- CHOICES PROCESSING ----- */
// Shuffles a given array and returns the given array.
function shuffle(array) {

    let counter = array.length;

    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        
        counter--;
        [array[counter], array[index]] = [array[index], array[counter]];
    }

    //return array;

}

// Fetches availableChoices from the data.js file, including extras.
function getChoices() {

    let retrievedData = data[exerciceIndex].questions[currentQuestion];
    
    availableChoices = retrievedData.answer.split(" ")
        .concat(retrievedData.extras.split(" "));

    shuffle(availableChoices);
    
    for (let i = 0; i < availableChoices.length; i++)
        $(".choicesContainer").append("<span class='word'>" + availableChoices[i].toString() + "</span>");

}


/* ----- BRAIN OF THE GAME ----- */
// Moves a span selected by the user to the sepecified destination.
function move(userSelected, where) {

    $(where).append("<span class='word'>" + userSelected + "</span>");

}

// Shows the user different congrats messages when he has a good answer.
function congratulate() {

    let random = Math.floor(Math.random() * 4) + 1; // Generates a random number between 1 and 4 used to congratulate the user (see switch below).
    let congrats = ["GOOD JOB!", "KEEP IT UP!", "WONDERFUL!", "WOW"];

    return congrats[random];

}

// Gets the answer from the selected spans and sanitizes it.
function getAnswerString() {

    let answer = [];
    $(".answerContainer .word").each(function(index) {
        answer[index] = $(this).text();
    });
    
    return answer.toString()
        .replace(/,/g, ""); // Sanitazes the string to remove all commas and spaces.

}

// Fetches the correction and sanitizes it.
function getCorrection() {

    return (data[exerciceIndex].questions[currentQuestion].answer)
        .replace(/[, ]/g, ""); // Sanitazes the string to remove all commas and spaces.

}

// Used when the user wins (completes the whole level) and notifies him he has lost, giving him
// the choice to play again (redirects him to the index page on button click).
function userHasWon() {

    $(".result h2").text("YOU HAVE WON!");
    $(".result").addClass("wonAnimation");

    setTimeout(function() {
        $("#won").addClass("wonButtonAnimation");
     }, 1500);

}

// Used when the user fails a level.
function userHasLost() {

    $(".result h2").text("TRY AGAIN!");
    $(".result").addClass("resultAnimation");

    setTimeout(function() {
        $(".result").removeClass("resultAnimation");
    }, 1500);

}

// Used when the user has a correct answer, congratulates him and shows the next question & choices the user has.
function gameContinues(congrats) {

    reset();

    $(".result h2").text(congrats);
    $(".result").addClass("resultAnimation");

    setTimeout(function() {
        $(".result").removeClass("resultAnimation");
    }, 1500);

}

// Compares the answer given by the user to the correct answer from data.js.
function verifyAnswer() {
    
    let answerString = getAnswerString();
    let correction = getCorrection();

    if (answerString === correction) {

        if (currentQuestion === data[exerciceIndex].questions.length - 1)
            userHasWon();

        else
            gameContinues(congratulate());

        currentQuestion++;

    } else {

        if (answerString !== "")
            userHasLost();

    }

}

// Resets the word choices / chosen words from the web page and displays the new data for the current question.
function reset() {

    setTimeout(function() {
        $(".word").remove();
    }, 500);
    
    setTimeout(function() {
        ui();
    }, 750);

}


/* ----- DISPLAY ----- */
// Modifies the paragraph under the title to the description fitting the id of the exercice.
function displayExerciceDescription() {

    for (let i = 0; i < data.length; i++) {

        if (data[i].id === getUrl())
            $("#exerciceChoiceID").text(data[i].description);

    }

}

// Displays the question and the previously fetched availableChoices from getChoices().
function ui() {

    let retrievedData = data[exerciceIndex].questions[currentQuestion];
    $("#currentSentence").text("\"" + retrievedData.question + "\"");

    displayExerciceDescription();
    getChoices();

}


/* ----- USER INTERRACTIONS ----- */
// Purely aesthetic, shows the info bar on click of the ? span.
$(".answerContainer .info").click(function() {

    $(".info-pannel p").addClass("infoAnimation");

    setTimeout(function(){
        $(".info-pannel p").removeClass("infoAnimation");
    }, 4000);

});

// Actions on user's chosen words click.
$(".answerContainer").delegate(".word", "click", function(){
    
    move($(this).text(), ".choicesContainer");
    $(this).animate({

        filter: 'blur(4px)',
        opacity: '0'

    }, function(){

        $(this).remove();

    });

});

// Action on user's choice list click.
$(".choicesContainer").delegate(".word", "click", function(){
    
    move($(this).text(), ".answerContainer");
    $(this).animate({

        filter: 'blur(4px)',
        opacity: '0'

    }, function(){

        $(this).remove();

    });

});


/* ----- DOCUMENT READY ----- */
// Executes when document is ready.
$(document).ready(function() {    

    getUrl();
    ui();

    $("#game button").click(function() {
        verifyAnswer();
    });

});