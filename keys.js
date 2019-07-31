console.log('this is loaded');
require("dotenv").config();
exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
// Spotify Client ID b6dd004bef0d47ee9624512c9bdc7f4c