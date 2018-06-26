$(document).ready(function () {


    var television = ["The Office", "Silicon Valley", "Seinfeld", "Breaking Bad", "The Sopranos", "Game of Thrones",]
    GIFs = " "

    function renderButtons() {

        $("#television-view").empty();

        for (var i = 0; i < television.length; i++) {

            var a = $('<button>');

            //maybe delete? look up addClass
            a.addClass('tv');

            a.attr('data-name', television[i]);

            a.text(television[i]);

            $("#television-view").append(a);

        }
        //look to delete? 
        s = $("#tv-input").focus();

    }

    renderButtons();

    $("#add-tv").on('click', function () {

        event.preventDefault();

        var tv = $("#tv-input").val().trim();

        television.push(tv);

        renderButtons();


    });

    //========================================================

    $(document).on('click', 'button', function () {

        var b = $(this).attr('data-name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + b + "&api_key=Jkge13eYehFv6NgcBTFG7c4c8bVJsF12";
        console.log(queryURL);

        $.ajax({
            data: {
                limit: 10,
            },
            url: queryURL,
            method: 'GET'
        })

            .done(function (response) {
                console.log(response);

                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $('<div class="item">');

                    var rating = results[i].rating;

                    var r = $('<p>').text("Rating: " + rating);

                    var gifImage = $('<img>');

                    gifImage.attr('src', results[i].images.fixed_height_still.url)
                        .attr('data-still', results[i].images.fixed_height_still.url)
                        .attr('data-animate', results[i].images.fixed_height.url)
                        .attr('data-state', "still")
                        .addClass("showImage");

                    gifDiv.append(r)
                        .append(gifImage);

                    $('#GIFs').prepend(gifDiv);
                }

            });

    });

    $(document).on('click', '.showImage', function () {

        var state = $(this).data('state');
        //If the clicked image's state is still, update its src attribute to what its data-animate value is
        if (state == "still") {
            console.log("still image works");
            // Then, set the image's data-state to animate
            $(this).attr('src', $(this).data('animate'))
                .data('state', 'animate');
        } else {
            //  else set src to the data-still value
            console.log("animated image works");
            $(this).attr('src', $(this).data('still'))
                .data('state', 'still');
        }

    });

    //=========================================================


});