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
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + showTyped + 
        "&api_key=Y5HLWEx42M4KjcaOgQaEmorM1w1rbx4l&limit=10&rating=pg";

        $.get(queryURL).then(function(response) {
            console.log(response);
            for(var i = 0; i < 10; i++) {
            var gifCol = $("<div>").addClass("col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4");
            var gifCard = $("<div>").addClass("card");
            var gifItself = $("<img src='" + 
            response.data[i].images.original_still.url + "' alt='gif' class='gif'>")
            .addClass("card-img-top")
            .attr("data-animate", response.data[i].images.original.url)
            .attr("data-still", response.data[i].images.original_still.url)
            .attr("data-state", "still");
            var gifTitle = $("<p>" + "<strong>Title:</strong><br> " + 
            response.data[i].title + "</p>").addClass("card-text");
            var gifSource = $("<p>" + "<strong>Source:</strong><br> " + 
            response.data[i].source + "</p>").addClass("card-text");
            if(response.data[i].source === "") {
                gifSource = $("<p>" + "<strong>Source:</strong><br> N/A</p>").addClass("card-text");;
            }
            var cardBody = $("<div>").addClass("card-body");
            var cardText = $("<p>" + "<strong>Rating:</strong><br> " + 
            response.data[i].rating+ "</p>").addClass("card-text");
            console.log(showTyped);
            cardBody.append(cardText, gifTitle, gifSource);
            gifCard.append(gifItself, cardBody);
            gifCol.append(gifCard);
            $(".forGifs").prepend(gifCol);
            }
        });
    }

    function gifAnimate() { 
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
    };
        
    

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

    $(".forGifs").on("click", ".gif", gifAnimate);

    makeButtons();