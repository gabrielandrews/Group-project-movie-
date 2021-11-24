// kyles api key for imdb: k_un7r1xw2
// lisa api key for imdb: k_652kwzuy
// alvin api key for imdb: k_63os7wtz

// function that selects a random index using an arrays length
var randomize = function(max) {

    var value = Math.floor(Math.random() * max);
  
    return value;
  
  };

function getReleaseYearApi() {

    // clear the response message content
    document.getElementById("correct-or-incorrect").textContent = "";

    // use the IMDB BoxOfficeAllTime Api to get a title and poster 
    var requestUrl = "https://imdb-api.com/en/API/BoxOfficeAllTime/" + apikey;

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })

      .then(function (data) {
        console.log(data);

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
        var moviePosterUrl = "https://imdb-api.com/en/API/Posters/" + apikey+ "/" + movieId;

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

            // save the genre for this correct movie
            var genreList = data.Genre.split(",");
            movieGenre = genreList[0];

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
            $('#title-image').css("background-image", "url(" + moviePoster + ")");

        })

    })

};

// find duplicate genres in genreList
// just pick first duplicate
getGenreExpertise = function() {
    var uniq = correctGenres
        .map((genre) => {
            return {
                count: 1,
                genre: genre
            }
        })
        .reduce((a,b) => {
            a[b.genre] = (a[b.genre] || 0) + b.count
            return a
        }, {});
    var duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1);

    return duplicates;
}

// keep track of total questions and count of correct ones
// and correct genres
resetStatValues = function() {
    totalQuestions = 0;
    correctAnswers = 0;
    movieGenre = "";
    genreExpertise = "";
    correctGenres = [];
};

// get stats from local storage 
getStats = function() {

    var movieStats = localStorage.getItem("movie-stats");
    if (movieStats === null) {
        movieStats = [];
    } else {
        movieStats = JSON.parse(movieStats);
    }

    return movieStats;
};

// collect user initials and save stats to local storage
saveStats = function(event) {
    event.preventDefault();

    // retrieve currently saved stats, if any
    var savedStats = getStats();

    // get current stats
    var inputEl = document.querySelector("input[name='initials']");
    // now find textarea associated with this parent
    var initials = inputEl.value;
    // get expertise - if any
    // retrieve text context from expertise <p>
    // will like like this example: "Genre expertise: None"
    genreExpertise = "None";
    var tmpExpertise = document.getElementById("expertise").textContent
    if (tmpExpertise) {
        tmpList = tmpExpertise.split(":");
        if (tmpList.length > 1) {
            genreExpertise = tmpList[1].trim();
        }
    }
    
    if (initials) {
        // add this task to the arrray and save
        statsObj = {
            initials: initials,
            answered: totalQuestions,
            correct: correctAnswers,
            genreExpertise: genreExpertise
        };

        savedStats.push(statsObj);

        // save modified tasklist to local storage
        localStorage.setItem("movie-stats", JSON.stringify(savedStats));
    }
    displayPrevioudStats();
};

// display any saved stats in local storage to Saved Stats
// portion of the webpage
displayPrevioudStats = function() {

    // get ol element
    olEl = document.querySelector("#saved-stats");
    // remove any existing children
    while (olEl.hasChildNodes()) {
        olEl.removeChild(olEl.firstChild);
    }

    // retrieve stats from local storage
    statsList = getStats();

    for(var i=0; i<statsList.length; i++) {
        // create list items
        liEl = document.createElement("li");
        liEl.textContent = statsList[i].initials +  ":  " +
                            statsList[i].correct + " of " + statsList[i].answered + " correct,  " +
                            "genre expertise: " + statsList[i].genreExpertise;
        olEl.appendChild(liEl);
    }
}

// retrieve answer from option1 element and see if it is correct or not
function processAnswer(event) {
    // retrieve button clicked
    var selectedYear = event.currentTarget.textContent;

    // retrieve correct year
    var correctYear = document.getElementById("option1").textContent;

    // find out if this button is the correct answer
    var message = "Incorrect"
    if (selectedYear === correctYear) {
        message = "Correct";
        correctAnswers++;
        correctGenres.push(movieGenre);
    }
    document.getElementById("correct-or-incorrect").textContent = message;
    totalQuestions++;

    // calculate genre expertise
    var genre = getGenreExpertise();

    // now write out stats
    document.getElementById("current-stats").textContent = correctAnswers + " out of " + totalQuestions + " correct";
    genreText = "None";
    if (genre.length) {
        genreText = genre;
    }
    document.getElementById("expertise").textContent = "Genre expertise: " + genreText;
}

var totalQuestions = 0;
var correctAnswers = 0;
var movieGenre = "";
var correctGenres = [];
var apikey = "k_un7r1xw2";

// display any stats stored in local storage
displayPrevioudStats();

$("#random-button").click(function () {

    getReleaseYearApi();

});

// add listener for for movie buttons
$(".movie-button").on("click", processAnswer);

// set up event listener for saving stats
var formEl = document.querySelector("#stats-form");
formEl.addEventListener("submit", saveStats);
