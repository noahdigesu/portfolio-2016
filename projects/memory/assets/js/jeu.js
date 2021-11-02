let currentNumber = 1;
let sequence = createShuffledSequence(); // Stocks the current sequence in a variable for future access.
let tries = 3; // Defines the maximum number of tries before ending the game.
let gameInfos = {
    "numberOfGames": 0,
    "wins": 0,
    "losses": 0,
}

// Shuffles a given array.
// Returns: an integer array.
function shuffle(tab) {

    for (let i = tab.length - 1; i > 0; i--) {

        let j = Math.floor(Math.random() * (i + 1));
        [tab[i], tab[j]] = [tab[j], [tab[i]]];

    }

    return tab;

}

// Creates a sequence of shuffled integers from 1 to 7.
// Returns: an integer array.
function createShuffledSequence() {

    let tab = [1, 2, 3, 4, 5, 6, 7];    
    return shuffle(tab);
    
}

// Shows the sequence on the user"s screen by displaying ONE integer per button.
function showSequence() {

    for (let i = 0; i < sequence.length; i++) {

        $("#sequence").children().eq(i).text(sequence[i]);

    }

}

// Hides the sequence. Used in set() and startGame().
function hideSequence() {
    
    $("#sequence").children().text("?");

}

// Resets the game and creates a new shuffled sequence.
function reset() {

    currentNumber = 1; // Resets the current number.
    sequence = createShuffledSequence(); // Creates a new shuffled sequence.
    tries = 3; // Resets the number of tries.

    $(".selection").css({
        'background-color': 'transparent',
        'color': 'white'
    });

    $(".tries").removeClass("triesAnimation");
    
    setTimeout(function() { // Looks better visually.

        $("#start").removeClass("startAnimation");

    }, 500);

    setTimeout(function() {

        $(".container").removeClass("statusAnimation"); // Places the container back to it's original position.

    }, 1500);

    hideSequence();

}

function userWins() {

}

function userLooses() {
    
}

// Actions on click of the user's selection.
$('.selection').click(function(){

    let index = ($('.selection').index(this)); // Fetches the index of the clicked .selection element.
    let number = Math.floor(sequence[index]); // Fetches the number contained at the sequence's index. Math.floor used for stability reasons.

    if (currentNumber === number) { // ! USER WINS.

        $("#sequence").children().eq(index).text(number)
            .prop('disabled', true)
            .css({
                'cursor': 'default',
                'background-color': '#f5d76e',
                'color': '#182a3a'
            });

        currentNumber++;

        if (currentNumber > 7) {

            $(".status h2").text("YOU'VE WON :)"); // Modifies the status screen with the appropriate text.
            $(".container").addClass("statusAnimation"); // Shows the status screen.

            gameInfos.wins++;

            $("aside p:nth-of-type(2)").text(`total number of wins: ${gameInfos.wins}`);

            reset();

        }

    } else { // ! USER LOSES.

        tries--;

        if (tries === 0) {

            $(".status h2").text("YOU'VE LOST :("); // Modifies the status screen with the appropriate text.
            $(".container").addClass("statusAnimation"); // Shows the status screen.

            gameInfos.losses++;

            $("aside p:nth-of-type(3)").text(`total number of losses: ${gameInfos.losses}`);

            reset();

        }

        if (tries === 1) { // Displays the number of tries left.

            $(".tries p").text(`You have ${tries} try left`); // Changes "tries" to "try" to be orthographically correct.
            $(".tries").css({ // Changes the padding as there are fewer letters in "try" than "tries".
                "padding-left": "109px",
                "padding-right": "110px"
            });

        } else {

            $(".tries p").text(`You have ${tries} tries left`);
            $(".tries").css({ // Changes back to original padding.
                "padding-left": "100px",
                "padding-right": "100px"
            });
            
        }

    }

});


// Sets some graphical elements at the begining of a new game.
function set() {

    showSequence();

    $(".selection").css('cursor', 'default')
        .prop('disabled', true);

    setTimeout(function() {

        hideSequence();
        
        $(".selection").css('cursor', 'pointer')
            .prop('disabled', false);

    }, 3000);

}

// Starts the game.
function startGame() {

    $("#start").addClass("startAnimation");
    $(".tries").addClass("triesAnimation");

    gameInfos.numberOfGames++;

    $("aside p:nth-of-type(1)").text(`total number of games: ${gameInfos.numberOfGames}`);

    set();
}

// Disables the buttons when document is loaded.
$(document).ready(function() {

    $(".selection").prop('disabled', true);

});