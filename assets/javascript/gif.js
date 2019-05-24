$(document).ready( function() { 

    var topics = ["puppies", "kittens", "rhino"];

    // CREATE BUTTONS FOR ARRAY OF GIFS
    function createButtons() {
        $("#button-holder").empty();
        for (var i = 0; i < topics.length; i++) {
            var button = $("<button>");
            button.addClass("gifs");
            button.attr("gif-topic", topics[i]);
            button.text(topics[i]);
            $("#button-holder").append(button);
        }
    }
    createButtons();

    // ADD NEW GIF TO THE ARRAY OF GIFS
    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        var newGif = $("#search-input").val().trim();
        topics.push(newGif);
        createButtons();
    })
    



})