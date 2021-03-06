require("dotenv").config();

//so that i can recall the keys 
var keys = require("./keys.js");

//required for twitter/spotify recall
var Twitter = require("Twitter");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var request = require("request");

//just so i don't have to type in process.argv over and over
var node_action = process.argv[2];


function doSomething() {
    switch (node_action) {
        case "my-tweets":
        getTweets();
        break;

        case "spotify-this-song":
        getSpotify();
        break;

        case "movie-this": 
        getOMDB();
        break;
    }
};

doSomething();


//NOTE: i didn't know how to do the do-what-it-says part but if you just type in spotify-this-song and don't input a third command, it automatically goes to "Knee socks" that i set up in random.txt


//nothing yet for this
//var command = "";

//twitter function
//don't spend too much time reading the tweets, this is actually from my personal twitter account because i was too lazy to create a new one. 
function getTweets(){

    //node_action = process.argv[2];

    var params = {screen_name: "w0lf_fl0w", count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                var tweetsText = tweets[i].text;
                var results = "*-*-*-*-*-*-*-*-*-*-*" + "\n" +
                "Tweets: " + tweetsText + "\n" +
                "*-*-*-*-*-*-*-*-*-*-*"
                
                console.log(results);                
            }
        }
        else {
            console.log(error);
        }  
    });   
}

//spotify function
function getSpotify(){

    var trackName = process.argv[3];

        if (!trackName) {
            trackName = "Knee Socks"
        }

    spotify.search({ type: 'track', query: trackName }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
        else {
            var trackInfo = data.tracks.items;
            for (var i = 0; i < 1; i++) {
                var results = 
                    "<=================================>" + "\n" +
                    "Artist: " + trackInfo[i].artists[0].name + "\n" +
                    "Album: " + trackInfo[i].album.name + "\n"
                    +
                    "Song: " + trackInfo[i].name + "\n"
                    +
                    "Preview URL: " + trackInfo[i].preview_url + "\n"
                    + "<=================================>"
                console.log(results); 
            };
        }
    });
}


//omdb function
function getOMDB() {
    //search = search.split(' ').join('+');
    var movie = process.argv[3];
    if (!movie) {
        movie = "spiderman"
    }

    var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie;

    request(queryURL, function(error, response, body) {
        
        if (!error && response.statusCode === 200) {
            for(var i = 0; i < 1; i++) {
                var jsonData = JSON.parse(body);
                var output = "Movie Title: " + jsonData.Title + "\n" +       "Year: " + jsonData.Year + "\n" +
                         "IMDB rating: " + jsonData.imdbRating + "\n" + "Rotten Tomatoes: " + jsonData.Ratings[0].Value + "\n" + "Country: " + jsonData.Country + "\n" +
                         "Language: " + jsonData.Language + "\n" + "Plot: " + jsonData.Plot + "\n" +
                         "Actors: " + jsonData.Actors + "\n"
                         console.log(output);
                        };
                    }
                });
            //console.log(jsonData);
            }









