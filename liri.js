require("dotenv").config();

//so that i can recall the keys 
var keys = require("./keys.js");

//required for twitter/spotify recall
var twitter = require("twitter");
var spotify = require("spotify");


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//just so i don't have to type in process.argv over and over
var node_action = process.argv[2];

//type in something and you'll get a response
doSomething(node_action);

//nothing yet for this
//var command = "";


//don't spend too much time reading the tweets, this is actually from my personal twitter account because i was too lazy to create a new one. 
function getTweets(){

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

function doSomething(node_action) {
    if(action = "my-tweets") {
        getTweets();
    }
}; 



