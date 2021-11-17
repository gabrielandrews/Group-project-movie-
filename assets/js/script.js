// function that selects a random index using an arrays length
var randomize = function(max) {

    var value = Math.floor(Math.random() * max);
  
    return value;
  
  };

function getPosterApi() {

    // use the imdb BoxOfficeAllTime Api to get a title 
    var requestUrl = "https://imdb-api.com/en/API/BoxOfficeAllTime/k_un7r1xw2"

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })

      .then(function (data) {
        // Use the console to examine the response
        // console.log(data);

        // save a random number to one of four variables that will correspond to the index of the array api
        var option1 = randomize (200);
        var option2 = randomize (200);
        var option3 = randomize (200);
        var option4 = randomize (200);

        // save the title and id of the movie (randomly chosen out of the 200 available in the api) to a variable
        var movieTitle1 = data.items[option1].title;
        var movieId1 = data.items[option1].id;

        var movieTitle2 = data.items[option2].title;
        var movieId2 = data.items[option2].id;

        var movieTitle3 = data.items[option3].title;
        var movieId3 = data.items[option3].id;

        var movieTitle4 = data.items[option4].title;
        var movieId4 = data.items[option4].id;

        // set title of first button
        $('#option1').text(movieTitle1);

        // set title of second button
        $('#option2').text(movieTitle2);
     
        // set title of third button
        $('#option3').text(movieTitle3);
        
        // set title of fourth button
        $('#option4').text(movieTitle4);

        // create new api url's for the movie poster api
        var moviePoster1Url = "https://imdb-api.com/en/API/Posters/k_un7r1xw2/" + movieId1;
        var moviePoster2Url = "https://imdb-api.com/en/API/Posters/k_un7r1xw2/" + movieId2;
        var moviePoster3Url = "https://imdb-api.com/en/API/Posters/k_un7r1xw2/" + movieId3;
        var moviePoster4Url = "https://imdb-api.com/en/API/Posters/k_un7r1xw2/" + movieId4;

        // fetch new data about movie 1 and get poster image
        fetch(moviePoster1Url)
            .then(function (response) {
            return response.json();
        })

            .then(function (data) {
            // Use the console to examine the response
            // console.log(data);

            // save the first poster in each movie's array to a variable
            var moviePoster1 = data.posters[0].link;
            
            // set the background of the first button to the movie poster for the first film
            $('#option1').css("background-image", "url(" + moviePoster1 + ")");
            
            })

        // fetch new data about movie 2 and get poster image
        fetch(moviePoster2Url)
            .then(function (response) {
            return response.json();
        })

            .then(function (data) {
            // Use the console to examine the response
            // console.log(data);

            // save the first poster in the movie's array to a variable
            var moviePoster2 = data.posters[0].link;
     
            // set the background of the second button to the movie poster for the second film
            $('#option2').css("background-image", "url(" + moviePoster2 + ")");
            
            })

        // fetch new data about movie 3 and get poster image
        fetch(moviePoster3Url)
            .then(function (response) {
            return response.json();
        })

            .then(function (data) {
            // Use the console to examine the response
            // console.log(data);

            // save the first poster in the movie's array to a variable
            var moviePoster3 = data.posters[0].link;

            // set the background of the third button to the movie poster for the third film
            $('#option3').css("background-image", "url(" + moviePoster3 + ")");

            })

        // fetch new data about movie 4 and get poster image
        fetch(moviePoster4Url)
            .then(function (response) {
            return response.json();
        })

            .then(function (data) {
            // Use the console to examine the response
            // console.log(data);

            // save the first poster in the movie's array to a variable
            var moviePoster4 = data.posters[0].link;

            // set the background of the fourth button to the movie poster for the fourth film
            $('#option4').css("background-image", "url(" + moviePoster4 + ")");

            })

        })

};

$("#random-button").click(function () {

    getPosterApi();

});

