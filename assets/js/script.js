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

function getReleaseYearApi() {

    // use the IMDB BoxOfficeAllTime Api to get a title and poster 
    var requestUrl = "https://imdb-api.com/en/API/BoxOfficeAllTime/k_un7r1xw2"

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })

      .then(function (data) {
        // console.log(data);

        // save a random number to a variable that will correspond to the index of the array api
        var thisMovie = randomize (200);
        var randomChoice1 = randomize (200);
        var randomChoice2 = randomize (200);
        var randomChoice3 = randomize (200);

        // save the title and id of the movie (randomly chosen out of the 200 available in the api) to variables       
        var movieTitle = data.items[thisMovie].title;
        var movieId = data.items[thisMovie].id;

        var randomMovieId1 = data.items[randomChoice1].id;
        var randomMovieId2 = data.items[randomChoice2].id;
        var randomMovieId3 = data.items[randomChoice3].id;
        
        // set title of fourth button
        $('#title').text(movieTitle);

        // create a new api url for the movie poster api (IMDB) 
        var moviePosterUrl = "https://imdb-api.com/en/API/Posters/k_un7r1xw2/" + movieId;

        // create a new api url for the movie release year api (OMDB)
        var truemovieYearUrl = "http://www.omdbapi.com/?i=" + movieId + "&apikey=83e56856";

        var falseChoiceUrl1 = "http://www.omdbapi.com/?i=" + randomMovieId1 + "&apikey=83e56856";
        var falseChoiceUrl2 = "http://www.omdbapi.com/?i=" + randomMovieId2 + "&apikey=83e56856";
        var falseChoiceUrl3 = "http://www.omdbapi.com/?i=" + randomMovieId3 + "&apikey=83e56856";

        // fetch new data about movie and get year of release from omdb api
        fetch(truemovieYearUrl)
            .then(function (response) {
            return response.json();
            })

            .then(function (data) {
            // Use the console to examine the response
            console.log(data);

            // save the first poster in the movie's array to a variable
            // var movieReleaseYear1 = data.posters[0].link;

            })

        // fetch new data about movie and get year of release from omdb api
        fetch(falseChoiceUrl1)
            .then(function (response) {
            return response.json();
            })

            .then(function (data) {
            // Use the console to examine the response
            // console.log(data);

            // save the first poster in the movie's array to a variable
            // var movieReleaseYear1 = data.posters[0].link;

            })

        // fetch new data about movie and get year of release from omdb api
        fetch(falseChoiceUrl2)
            .then(function (response) {
            return response.json();
            })

            .then(function (data) {
            // Use the console to examine the response
            // console.log(data);

            // save the first poster in the movie's array to a variable
            // var movieReleaseYear1 = data.posters[0].link;

            })

        // fetch new data about movie and get year of release from omdb api
        fetch(falseChoiceUrl3)
            .then(function (response) {
            return response.json();
            })

            .then(function (data) {
            // Use the console to examine the response
            // console.log(data);

            // save the first poster in the movie's array to a variable
            // var movieReleaseYear1 = data.posters[0].link;

            })





            
        // fetch new data about movie and get poster image
        fetch(moviePosterUrl)
            .then(function (response) {
            return response.json();
            })

        .then(function (data) {
            // Use the console to examine the response
            // console.log(data);

            // save the first poster in the movie's array to a variable
            var moviePoster = data.posters[0].link;

            // set the background of the fourth button to the movie poster for the fourth film
            $('#title').css("background-image", "url(" + moviePoster + ")");

        })

    })


};


$("#random-button").click(function () {

    // getPosterApi();

    getReleaseYearApi();
});

