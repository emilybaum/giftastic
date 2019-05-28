$(document).ready( function() { 

    var topics = ["puppy", "puppies", "pupper", "pup", "dog", "doggo"];

    // CREATE BUTTONS FOR ARRAY OF GIFS
    function createButtons() {
        $("#button-holder").empty();
        for (var i = 0; i < topics.length; i++) {
            var button = $("<button type='button'>");
            button.addClass("btn btn-secondary gif-button");
            button.attr("gif-topic", topics[i]);
            button.text(topics[i]);
            $("#button-holder").append(button); 
        }
    }
    createButtons();

    // ADD NEW GIF TO THE ARRAY OF GIFS
    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        var newTopic = $("#search-input").val().trim();
        topics.push(newTopic);
        document.getElementById("search-input").value = "";
        createButtons();
    })
    
    // LISTEN FOR BUTTON CLICK
    $(document).on("click", ".gif-button", makeGif)

    function makeGif() {

        $("#gif-display").empty();
        $(".before-gen").addClass("d-none");
        $(".after-gen").removeClass("d-none");

        var whatToSearch = $(this).attr("gif-topic")
        var API = "HxkLNilC8OgbgenMW1pjUSt5JOV4ynGe";
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + API + "&q=" + whatToSearch + "&limit=10&offset=0&rating=PG&lang=en";

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response) {
            console.log(response)
            for (var i = 0; i < response.data.length; i++) {
                
                // MAKE GIF AS AN IMAGE AND SET AS STILL IMAGE
                var newGif = $("<img>");
                newGif.addClass("gif-generated");
                var gifMove = response.data[i].images.fixed_width.url;
                var gifStill = response.data[i].images.fixed_width_still.url

                newGif.attr({"gifMove": gifMove, "gifStill": gifStill});
                newGif.attr({"src": gifStill, "state": "still"});

                // ADD RATING UNDER GIF
                var rating = $("<p>");
                rating.addClass("gif-rating")
                ratingUpper = (response.data[i].rating).toUpperCase();
                rating.text("Rating: " + ratingUpper)

                var gifAndRating = $("<div>").append(newGif).append(rating);
                gifAndRating.addClass("gifAndRating-div")

                $("#gif-display").append(gifAndRating);

                makeMove();

                // LISTEN FOR GIF CLICK TO MAKE MOVE (OR STILL)
                // $(".gif-generated").on("click", function (event) {
                //     var state = $(this).attr("state");

                //     if (state === "still") {
                //         $(this).attr("state", "active");
                //         $(this).attr("src", $(this).attr("gifMove"));
                //     }

                //     if (state === "active") {
                //         $(this).attr("state", "still");
                //         $(this).attr("src", $(this).attr("gifStill"));
                //     }
                // })
            }
        })
    } 

function makeMove() {
    $(".gif-generated").on("click", function (event) {
        var state = $(this).attr("state");

        if (state === "still") {
            $(this).attr("state", "active");
            $(this).attr("src", $(this).attr("gifMove"));
        }

        if (state === "active") {
            $(this).attr("state", "still");
            $(this).attr("src", $(this).attr("gifStill"));
        }
    })
}



})

