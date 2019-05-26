$(document).ready( function() { 

    var topics = ["puppies", "kittens", "rhino"];

    // CREATE BUTTONS FOR ARRAY OF GIFS
    function createButtons() {
        $("#button-holder").empty();
        for (var i = 0; i < topics.length; i++) {
            var button = $("<button>");
            button.addClass("gif-button");
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
        createButtons();
    })
    
    // LISTEN FOR BUTTON CLICK
    $(document).on("click", ".gif-button", makeGif)

    function makeGif() {

        $("#gif-display").empty();

        var whatToSearch = $(this).attr("gif-topic")
        var API = "HxkLNilC8OgbgenMW1pjUSt5JOV4ynGe";
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + API + "&q=" + whatToSearch + "&limit=10&offset=0&rating=PG-13&lang=en";

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response) {
            console.log(response)
            for (var i = 0; i < response.data.length; i++) {
    
                var newGif = $("<img>");
                newGif.addClass("gif-generated");
                var gifMove = response.data[i].images.fixed_width.url
                var gifStill = response.data[i].images.fixed_width_still.url

                newGif.attr({"gifMove": gifMove, "gifStill": gifStill});
                newGif.attr({"src": gifStill, "state": "still"});

                var rating = $("<p>");
                rating.addClass("gif-rating")
                ratingUpper = (response.data[i].rating).toUpperCase();
                rating.text("Rating: " + ratingUpper)
                
                $("#gif-display").append(newGif);
                $("#gif-display").append(rating);

                $(".gif-generated").on("click", function (event) {
                    var state = $(this).attr("state");

                    if (state === "still") {
                        $(this).attr("src", $(this).attr("gifMove"));
                        $(this).attr("state", "active");
                    }

                    if (state === "active") {
                        $(this).attr("src", $(this).attr("gifStill"));
                        $(this).attr("state", "still");
                    }

                })

            }
        })
    }

    // LISTEN FOR GIF CLICK
    

   


})

// response.data[i].embed_url


// use for testin: https://api.giphy.com/v1/gifs/search?api_key=HxkLNilC8OgbgenMW1pjUSt5JOV4ynGe&q=tacos&limit=25&offset=0&rating=PG-13&lang=en