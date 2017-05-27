import * as fs from "fs";
import * as EventEmitter from "events";

const twitterScreenScrape = require("twitter-screen-scrape");
const readLines = require("n-readlines");

const sha256 = require('js-sha256');
let argv = require("minimist")(process.argv.slice(2));

import {default as Tweet} from "./../req/tweet";
import decomposedTweetDate from "./../req/decomposedTweetDate";
import dataStore from "./../req/dataStore";
import {ScrapedTweetAnalyzer} from "./req/scrapedTweetAnalyzer";
import saveTweetsFromStore from "./../req//saveTweetsFromStore";

const dataDir : string = argv.dataDir;

const nerBucket : string = argv.nerBucket;

let tweetSaveMgr : ScrapedTweetAnalyzer = new ScrapedTweetAnalyzer();

let store : dataStore<Tweet,decomposedTweetDate> = new dataStore<Tweet,decomposedTweetDate>();

function processTweet(tweet : {time : number,text : string}) : void
{
    let year : string;
    let month : string;
    let day : string;
    let hour : string;
    let minute : string;
    let second : string;

    //The scraped time is in a different format than that returned when mining and needs to
    //be converted
    let time : Date = new Date(tweet.time * 1000);
    let date = time.toLocaleString(
        'en-US'
        ,<Intl.DateTimeFormatOptions>{
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false
        }
    );
    let tokens = date.split(/\//);

    month = tokens[0];
    day = tokens[1];

    tokens = tokens[2].split(/,/);

    year = tokens[0];

    tokens[1] = tokens[1].substring(1);

    tokens = tokens[1].split(/:/);

    hour = tokens[0];
    minute = tokens[1];
    second = tokens[2];

    store.items.push(new Tweet(tweet.text));

    let newTweet = store.items[store.items.length - 1];
    newTweet.text = tweet.text;
    newTweet.textHash = sha256(newTweet.text);

    newTweet.year = year;
    newTweet.month = month;
    newTweet.day = day;
    newTweet.hour = hour;
    newTweet.minute = minute;
    newTweet.second = second;


    
}


let tweetStream : any;

let nerBucketReadStream = new readLines(nerBucket);


function scrapeNextUser() : void
{
    let line = nerBucketReadStream.next();
    if(!line)
    {
        saveTweetsFromStore(tweetSaveMgr,store,dataDir);
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
        let tweet = tweetStream.read();
        processTweet(tweet);
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


