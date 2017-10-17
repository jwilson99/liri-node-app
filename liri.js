//core Node package for reading and writing files
var fs = require("fs");

//get exported data from keys.js
var keys = require("./keys.js");

//for twitter api NPM, request NPM, and spotify api NPM
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var Request = require("request");

//takes data from the terminal
var userRequest = process.argv[2];
var userInput = "";
for (var i = 3; i < process.argv.length; i++) {
    userInput = userInput + " " + process.argv[i];
}

var userInputMovie = "";
for (var i = 3; i < process.argv.length; i++) {
    userInputMovie = userInputMovie + process.argv[i] + "+";
}

//if the user doesn't specify a song, a default song is returned
var song = "";
if (process.argv.length < 4 && process.argv[2] !== "do-what-it-says") {
    var song = "The Sign Ace of Base";
}
else {
    var song = userInput;
}

//if the user doesn't specify a movie, a default is set
var movie = "";
if (process.argv.length < 4 & process.argv[2] !== "do-what-it-says") {
    movie = "mr+nobody";
}
else {
    movie = userInputMovie;
}

//OMDB api request URL
var omdbURL = "http://www.omdbapi.com/?apikey=" + keys.omdbKeys.omdb_key + "&t=" + movie;

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

    Request(omdbURL, function (error, response, body) {
        if (error){
            return console.log("error: " + error);
        }

        console.log(JSON.parse(body));
        var rottenTomatoes = "NA";

        for (var i = 0; i < JSON.parse(body).Ratings.length; i++){
            if (JSON.parse(body).Ratings[i].Source === "Rotten Tomatoes"){
                rottenTomatoes = JSON.parse(body).Ratings[i].Value;
            }
        }

        console.log("***************************************************");
        console.log("Movie Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating: " + rottenTomatoes);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("***************************************************");
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("***************************************************");
        console.log("Actors: " + JSON.parse(body).Actors);
    });
}

//do-what-it-says function
function doTheThing() {
    fs.readFile("random.txt","utf-8",function(error, data){

        if (error) {
            return console.log(error);
        }

        //splits the data received into an array
        var dataArr = data.split(",");
        var commandArr = [];
        var queryArr = [];
        //sorts random text commands out of random.txt
        for (var i = 0; i < dataArr.length; i){
            commandArr.push(dataArr[i]);
            i += 2;
        }

        //sorts random text queries out of random.txt
        for (var i = 1; i < dataArr.length; i){
            queryArr.push(dataArr[i]);
            i += 2;
        }

        //uses a random number to select a command and its corresponding query
        var randomNumber = Math.round(Math.random() * (commandArr.length));

        var randomCommand = commandArr[randomNumber];
        console.log(randomCommand);

        var randomQuery = queryArr[randomNumber];
        console.log(randomQuery);

        if (randomCommand === "spotify-this-song"){
            song = randomQuery;
            spotifyThis();
        }
        else if (randomCommand === "movie-this"){
            movie = randomQuery;
            omdbURL = "http://www.omdbapi.com/?apikey=" + keys.omdbKeys.omdb_key + "&t=" + movie;
            movieThis();
        }
    })
}


