var shows = ["game of thrones", 
    "archer", 
    "rick and morty", 
    "house", 
    "that 70s show", 
    "new girl", 
    "parks and rec", 
    "the office", 
    "the fresh prince of bel air", 
    "spongebob"];

    function gifBlock() {
        var showTyped = $(this).attr("data-name");

        // var apikey = Y5HLWEx42M4KjcaOgQaEmorM1w1rbx4l;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + showTyped + 
        "&api_key=Y5HLWEx42M4KjcaOgQaEmorM1w1rbx4l&limit=10&rating=pg";

        $.get(queryURL).then(function(response) {
            console.log(response);
            for(var i = 0; i < 10; i++) {
            var gifRow = $("<div>").addClass("row");
            var gifCol = $("<div>").addClass("col-12 col-md-6 col-lg-3");
            var gifCard = $("<div>").addClass("card");

            var gifItself = $("<img src='" + 
            response.data[i].images.original_still.url + "' alt='gif'>")
            .addClass("card-img-top");

            var cardBody = $("<div>").addClass("card-body");
            var cardText = $("<p>" + "Rating: " + 
            response.data[i].rating+ "</p>").addClass("card-text");
            console.log(showTyped);
            // var gRated = $("<p>").text("Rating: " + 
            // response.data[i].rating);
            cardBody.append(cardText);
            gifCard.append(gifItself, cardBody);
            gifCol.append(gifCard);
            // gifRow.append(gifCol);
            $(".forGifs").append(gifCol);
            }
        });
    }


    $(".addShow").on("click", function(event) {
        event.preventDefault();
        var newShow = $(".showInput").val().trim().toLowerCase();
        shows.push(newShow);
        makeButtons();
    });


    function makeButtons() {
        $(".forButtons").empty();

        for(var i = 0; i < shows.length; i++) {
            var newButton = $("<button>");
            newButton.attr("type", "button");
            newButton.addClass("btn btn-success");
            newButton.attr("data-name", shows[i]);
            newButton.text(shows[i]);
            $(".forButtons").append(newButton);
        }
    }
    $(document).on("click", ".btn", gifBlock);

    makeButtons();