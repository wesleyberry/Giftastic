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
            var gifRow = $("<row>");
            var gifCol = $("<col-6>");
            var gifItself = $("<img src='" + response.data[0].embed_url + "' alt='gif'>");
            console.log(showTyped);
            // console.log(response.data[0].url);
            // var gRated = $("<p>").text("Rating: " + response.Rated);
            gifCol.append(gifItself);
            gifRow.append(gifCol);
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