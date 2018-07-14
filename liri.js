require("dotenv").config();

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var node_action = process.argv[2];
var command = "";

function getTweets(){

    var params = {screen_name: "w0lf_fl0w", count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.statuses.length; i++) {
                var tweetsText = tweets.statuses[i].text;
                console.log("Tweets: " + tweetsText);                
            }
        }
        else {
            console.log(error);
        }  
    });   
}

