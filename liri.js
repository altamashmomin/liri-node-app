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

//type in something and you'll get a response
doSomething(node_action);

//im aware that this can be consolidated with a "switch"; i did this originally in order to test out each feature one by one

//twitter worked up into spotify was added, and i think it has to do with the variable set for process.argv that seems to override my-tweets and assume it's for spotify

//does nothing and it's probably because i'm not using some sort of split method to add the movie input as "this+is+a+movie"
function doSomething(node_action) {
    if(node_action = "movie-this") {
        getOMDB();
    }
};

//twitter function to call
function doSomething(node_action) {
    if(action = "my-tweets") {
        getTweets(node_action);
    }
}; 

//spotify function to call
function doSomething(node_action) {
    if (node_action = "spotify-this-song") {
        getSpotify();
    }
};


//NOTE: i didn't know how to do the do-what-it-says part but if you just type in spotify-this-song and don't input a third command, it automatically goes to "Knee socks" that i set up in random.txt


//nothing yet for this
//var command = "";

//twitter function
//don't spend too much time reading the tweets, this is actually from my personal twitter account because i was too lazy to create a new one. 
function getTweets(node_action){

    var params = {screen_name: "w0lf_fl0w", count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                var tweetsText = tweets[i].text;
                console.log("Tweets: " + tweetsText);                
            }
        }
        else {
            console.log(error);
        }  
    });   
}

//spotify function
function getSpotify(trackName, trackInfo){

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
                    "=======================================" + "\n" +
                    "Artist: " + trackInfo[i].artists[0].name + "\n" +
                    "Album: " + trackInfo[i].album.name + "\n"
                    +
                    "Song: " + trackInfo[i].name + "\n"
                    +
                    "Preview URL: " + trackInfo[i].preview_url + "\n"
                    + "====================================="
                console.log(results); 
            };
        }
    });
}


//omdb function
function getOMDB() {
    search = search.split(' ').join('+');
    var movie = process.argv[3];

    request("http://www.omdbapi.com/?i=tt3896198&apikey=9882e428" + "/?t=" + movie + "", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("The movie's stats are: " + JSON.parse(body).title);
        }
    });
}








