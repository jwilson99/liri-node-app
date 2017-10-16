//core Node package for reading and writing files
var fs = require("fs");

//get exported data from keys.js
var keys = require("./keys.js");

//for twitter api, and spotify api
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

//takes data from the terminal
var userRequest = process.argv[2];
var userInput = process.argv[3];

//if the user doesn't specify a song, a default song is returned
var song = "";
if (process.argv.length < 4) {
    var song = "The Sign Ace of Base";
}
else {
    var song = userInput;
}

//takes in user input to determine which function to run
switch (userRequest) {

    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        spotifyThis();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doTheThing();
        break;
}


//my-tweets function
function myTweets() {

    var twitter = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });

    var params = {screen_name: "CodeGameLinks"};

    twitter.get("statuses/user_timeline", params, function (error, tweets, response) {
        if (error) {
            console.log(error);
        }
        if (!error) {
            for (var i = 0; i < tweets.length && i <= 20; i++){
                console.log("***************************************************");
                console.log(tweets[i].text);
                console.log("Tweet created: " + tweets[i].created_at);
            }
        }
    })
}

//spotify-this-song function
function spotifyThis() {
    console.log("La-la-la");

    var spotify = new Spotify({
        id: keys.spotifyKeys.client_ID,
        secret: keys.spotifyKeys.client_secret
    });

    spotify.search({type: "track", query: song}, function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }
        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
        console.log("Title: " + data.tracks.items[0].name);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("Listen here: " + data.tracks.items[0].external_urls.spotify);
    });
}

//movie-this function
function movieThis() {
    console.log("Coming soon!");
}

//do-what-it-says function
function doTheThing() {
    console.log("Zhu Li, do the thing!");
}


