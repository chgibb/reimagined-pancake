import * as fs from "fs";
import * as EventEmitter from "events";

const twitterScreenScrape = require("twitter-screen-scrape");
const readLines = require("n-readlines");
let argv = require("minimist")(process.argv.slice(2));

const dataDir : string = argv.dataDir;

const nerBucket : string = argv.nerBucket;

let total = 0;
function processTweet(tweet : {time : number,text : string}) : void
{
    total++;
    console.log(tweet.text+" "+total);
}


let tweetStream : any;

let nerBucketReadStream = new readLines(nerBucket);

function scrapeNextUser() : void
{
    let line = nerBucketReadStream.next();
    if(!line)
    {
        clearInterval(keepAlive);
        process.exitCode = 0;
        return;
    }
    let tag : any = JSON.parse(line);
    let user : string = tag.token;
    //trim leading @
    user = user.substring(1);

    //retweets will usually be of the form @user:
    if(user[user.length - 1] == ":")
        user = user.substring(0,user.length - 1);
    
        console.log(user);

    tweetStream = new twitterScreenScrape({
        username : user,
        retweets : true
    });
    tweetStream.on("readable",function(){
        tweetStream.read();
        processTweet({time:0,text:user});
    });
    tweetStream.on("error",function(){
        console.log("stream error");
        scrapeNextUser();
    });
    tweetStream.on("close",function(){
        console.log("stream closed");
        scrapeNextUser();
    });
    tweetStream.on("end",function(){
        console.log("stream ended");
        scrapeNextUser();
    });
}

scrapeNextUser();

let keepAlive = setInterval(function(){},1000);


