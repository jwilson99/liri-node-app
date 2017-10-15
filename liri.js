//core Node package for reading and writing files
var fs = require("fs");

//get exported data from keys.js
var keys = require("./keys.js");

//for twitter api
var Twitter = require("twitter");

//takes data from the terminal
var userRequest = process.argv[2];

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
    console.log("tweet tweet");

    var client = new Twitter({
        consumer_key: keys.consumer_key,
        consumer_secret: keys.consumer_secret,
        access_token_key: keys.access_token_key,
        access_token_secret: keys.access_token_secret
    });

        var params = {screen_name: 'nodejs'};

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) {
            console.log(error);
        }
        if (!error) {
            console.log(tweets);
            //WANTED: Display last 20 tweets and when they were posted in the terminal
        }
    })
}

//spotify-this-song function
function spotifyThis() {
    console.log("La-la-la");
}

//movie-this function
function movieThis() {
    console.log("Coming soon!");
}

//do-what-it-says function
function doTheThing() {
    console.log("Zhuli, do the thing!");
}

// ### What Each Command Should Do
//
// 1. `node liri.js my-tweets`
//
// * This will show your last 20 tweets and when they were created at in your terminal/bash window.

