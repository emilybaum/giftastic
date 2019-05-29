$(document).ready( function() { 

    // var topics = ["puppy", "puppies", "pupper", "pup", "dog", "doggo"];
    var topics = JSON.parse(localStorage.getItem("gif-stored"));

    if (!Array.isArray(topics)) {
        topics = [];
    }

    // STARTER BUTTONS
    function starterButtons() {
        $("#button-holder").empty();
        var startTopics = ["golden retriever", "puppy", "puppies", "pupper", "pup", "dog", "doggo"]
        localStorage.setItem("gif-stored", JSON.stringify(startTopics));

        for (var i = 0; i < startTopics.length; i++) {
            var button = $("<button type='button'>");
            button.addClass("btn btn-secondary gif-button");
            button.attr("gif-topic", startTopics[i]);
            button.text(startTopics[i]);
            $("#button-holder").prepend(button);
        }
        
    }
    starterButtons();
    


    // CREATE BUTTONS FOR ARRAY OF GIFS
    function createButtons() {
        $("#button-holder").empty();
        for (var i = 0; i < topics.length; i++) {
            var button = $("<button type='button'>");
            button.addClass("btn btn-secondary gif-button");
            button.attr("gif-topic", topics[i]);
            button.text(topics[i]);
            localStorage.setItem("gif-stored", JSON.stringify(topics));
            $("#button-holder").prepend(button); 
        }
    }
    // createButtons();

    // ADD NEW GIF TO THE ARRAY OF GIFS
    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        var newTopic = $("#search-input").val().trim();
        topics.push(newTopic);
        localStorage.setItem("gif-stored", JSON.stringify(topics));
        document.getElementById("search-input").value = "";
        createButtons();
    })
    
    // LISTEN FOR BUTTON CLICK
    $(document).on("click", ".gif-button", makeGif)

    function makeGif() {
        $("#gif-display").empty();
        $(".before-gen").addClass("d-none");
        $(".cleared-gen").addClass("d-none");
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
            }
        })
    } 

    // LISTEN FOR GIF CLICK TO MAKE MOVE (OR STILL)
    $(document).on("click", ".gif-generated", makeMove);

    function makeMove() {
        var state = $(this).attr("state");

        if (state === "still") {
            $(this).attr("state", "active");
            $(this).attr("src", $(this).attr("gifMove"));
        }

        if (state === "active") {
            $(this).attr("state", "still");
            $(this).attr("src", $(this).attr("gifStill"));
        }
    }

    // CLEAR THE LOCAL STORAGE
    $(document).on("click", "#gif-clear", clearStroage);

    function clearStroage () {
        localStorage.clear();
        topics.splice(0, topics.length);
        createButtons();

        $(".before-gen").addClass("d-none");
        $(".after-gen").addClass("d-none");
        $(".cleared-gen").removeClass("d-none");
    }
})

