require("dotenv").config();

var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var keys = require("./keys.js");
var request = require("request");

// Contructors for Twitter and Spotify
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

// First user input
var command = process.argv[2];
// Second user input
var keyword = process.argv[3];

var queryUrl = "http://www.omdbapi.com/?t=" + keyword + "&y=&plot=short&apikey=trilogy";

//Need to add better user interface

//Twitter API 
if (command === 'my-tweets') {
    var params = {screen_name: 'Hazy_Hazard10'};
client.get('statuses/user_timeline', params, function(error, tweets) {
    if (error) throw error;
    for (var i = 0; i< tweets.length; i++) {
    console.log(tweets[i].created_at);
    console.log(tweets[i].text);
    }
    // console.log("Tweet" + (i+1) +":" tweets[i].text)

});
}
// Spotify API
else if (command === 'spotify-this-song') {
spotify.search({ type: 'track', query: keyword }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
// Spotify Artist information
console.log("Artist: " + data.tracks.items[0].artists[0].name);
console.log("Song Title: " + data.tracks.items[0].name);
console.log("Song Preview: " + data.tracks.items[0].preview_url);
console.log("Album: " + data.tracks.items[0].album.name);
  });
  //Need to add default Ace of Base
}


else if (command === 'movie-this') {
    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title)
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value); 
            console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Year);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });

    //Need to add My.Nobody work
}



//Need to work on
// do-what-it-says


//   fs.readFile("./movies.txt", "utf8", function(err, data) {
//     if (err) {
//         return console.log(err);
//     }
    
// });

