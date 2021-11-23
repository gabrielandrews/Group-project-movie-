// function that selects a random index using an arrays length
var randomize = function(max) {

    var value = Math.floor(Math.random() * max);
  
    return value;
  
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

        // save the id of 3 movies (randomly chosen out of the 200 available in the api) to 3 variable
        var randomMovieId1 = data.items[randomChoice1].id;
        var randomMovieId2 = data.items[randomChoice2].id;
        var randomMovieId3 = data.items[randomChoice3].id;
        
        // set text of paragraph element
        $('#title').text(movieTitle);

        // create a new api url for the movie poster api (IMDB) 
        var moviePosterUrl = "https://imdb-api.com/en/API/Posters/k_un7r1xw2/" + movieId;

        // create a new api url for the movie release year api (OMDB)
        var truemovieYearUrl = "http://www.omdbapi.com/?i=" + movieId + "&apikey=83e56856";

        // create 3 new api url's for the incorrect movie release year options (OMDB)
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
            // console.log(data);

            // save the correct release year in the movie's array to a variable
            var movieReleaseYear1 = data.Released;
            $('#option1').text(movieReleaseYear1);


            })

        // fetch new data about incorrect movie option and get year of release from omdb api
        fetch(falseChoiceUrl1)
            .then(function (response) {
            return response.json();
            })

            .then(function (data) {
            // Use the console to examine the response
            // console.log(data);

            // save the first poster in the movie's array to a variable
            var movieReleaseYear2 = data.Released;
            $('#option2').text(movieReleaseYear2);

            })

        // fetch new data about incorrect movie option and get year of release from omdb api
        fetch(falseChoiceUrl2)
            .then(function (response) {
            return response.json();
            })

            .then(function (data) {
            // Use the console to examine the response
            // console.log(data);

            // save the first poster in the movie's array to a variable
            var movieReleaseYear3 = data.Released;
            $('#option3').text(movieReleaseYear3);

            })

        // fetch new data about incorrect movie option and get year of release from omdb api
        fetch(falseChoiceUrl3)
            .then(function (response) {
            return response.json();
            })

            .then(function (data) {
            // Use the console to examine the response
            // console.log(data);

            // save the first poster in the movie's array to a variable
            var movieReleaseYear4 = data.Released;
            $('#option4').text(movieReleaseYear4);

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

            // set the background of the paragraph display to the movie poster
            $('#title').css("background-image", "url(" + moviePoster + ")");

        })

    })

};

$("#random-button").click(function () {

    getReleaseYearApi();

});

