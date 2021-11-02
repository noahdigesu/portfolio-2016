
// Fetches the descriptions from the data.js file and displays them as options of the drop down list.
function showDescriptions() {
    
    for (let i = 0; i < data.length; i++)
        $('#langues').append(new Option( // Adds a new option with the text to display, then the value for the current option.
            data[i].description,
            data[i].id
        ));

}

// Redirects the user to the selected language web page.
$("#startTest").click(function() {

    let selectedOption = $("#langues option:selected").val();

    $('#form').attr('action', "jeu.html#" + selectedOption);

});

// Executes when the web page is ready.
$(document).ready(function() {

    showDescriptions();
    
});