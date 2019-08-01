require("dotenv").config();
var axios = require("axios");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
var fs = require("fs");

switch(process.argv[2]){
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
};

// Concert section
function concertSearch(){
var band = process.argv[3];

    axios.get("https://rest.bandsintown.com/artists/"+band+"/events?app_id=codingbootcamp").then(
        function(response){
            console.log(`Your band results:
            Venue Name: ${response.data[0].venue['name']}
            Venue Location: ${response.data[0].venue['city']}
            Date: ${moment(response.data[0].datetime).format("MMM Do YYYY")}
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

  console.log("Artist: ", data.tracks.items[0].album.artists[0].name); 
  console.log("Album Name: ", data.tracks.items[0].album.name);
  console.log("Song Name: ", data.tracks.items[0].name);
  console.log("Link from Spotify: ", data.tracks.items[0].album.artists[0].external_urls);
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

// whatever section
function whatever(){
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }
        console.log(data);

        var dataArr = data.split(",");

        console.log(dataArr);
      
      });
};