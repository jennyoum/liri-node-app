require("dotenv").config();
var axios = require("axios");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var options = process.argv[2];

function runOptions(){
switch(options){
    case 'concert-this':
        concertSearch();
        break;

    case 'spotify-this-song':
        songSearch();
        break;

    case 'movie-this':
        movieSearch();
        break;

    case 'do-what-it-says':
        whatever();
        break;
}};

// Concert section
function concertSearch(){
var band = process.argv[3];

    axios.get("https://rest.bandsintown.com/artists/"+band+"/events?app_id=codingbootcamp").then(
        function(response){
            console.log(`Your band results:
            Venue Name: ${response.data[0].venue['name']}
            Venue Location: ${response.data[0].venue['city']}
            Date: ${response.data[0].datetime}
            `);
        }
    );
};

// Spotify section
function songSearch(){
    var song = process.argv[3];
    
  spotify.search({ type: 'track', query: song }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  
  console.log(data.tracks.items[0].album.artists); 
  console.log(data.tracks.items[0].album.name); 
  //console.log(data.album[0]);
  })
};

// Movie section
function movieSearch(){
    var movie = process.argv[3];

    axios.get("http://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey=trilogy").then(
    function(response) {
        console.log (`The movie's search results: 
        
        Title: ${response.data.Title},
        Release date: ${response.data.Released},
        Rating: ${response.data.imdbRating},
        Rotten Tomatoes Rating: ${response.data.imdbRating[1]},
        Country Produced: ${response.data.Country},
        Language: ${response.data.Language},
        Plot: ${response.data.Plot},
        Actors: ${response.data.Actors}
        ` );
    })
    .catch(function(error) {
        if (error.response) {
        
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
        } else if (error.request) {

        console.log(error.request);
        } else {

        console.log("Error", error.message);
        }
        console.log(error.config);
    });
};

function whatever(){

}
