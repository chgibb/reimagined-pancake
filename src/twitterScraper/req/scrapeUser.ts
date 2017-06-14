import {default as Tweet} from "./../../req/tweet";
import decomposedTweetDate from "./../../req/decomposedTweetDate";
import dataStore from "./../../req/dataStore";

const twitterScreenScrape = require("twitter-screen-scrape");
const sha256 = require('js-sha256');

let months : Array<string> = <string[]>[
    "dummy",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
]

function processTweet(store : dataStore<Tweet,decomposedTweetDate>,tweet : {time : number,text : string}) : void
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
    newTweet.month = months[parseInt(month)];
    newTweet.day = day;
    newTweet.hour = hour;
    newTweet.minute = minute;
    newTweet.second = second;   
}
export function scrapeUser(user : string) : Promise<{}>
{
    return new Promise((resolve,reject) => {
        let store : dataStore<Tweet,decomposedTweetDate> = new dataStore<Tweet,decomposedTweetDate>();
        let tweetStream = new twitterScreenScrape({
            username : user,
            retweets : true
        });

        tweetStream.on("readable",function(){
            let tweet = this.read();
            processTweet(store,tweet);
            
        });
        tweetStream.on("error",function(){
            resolve(store);
            
        });
        tweetStream.on("close",function(){
            resolve(store);
            
        });
        tweetStream.on("end",function(){
            resolve(store);
        });
    });
}