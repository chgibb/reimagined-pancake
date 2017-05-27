import * as fs from "fs";
import * as EventEmitter from "events";


const readLines = require("n-readlines");


let argv = require("minimist")(process.argv.slice(2));

import {default as Tweet} from "./../req/tweet";
import decomposedTweetDate from "./../req/decomposedTweetDate";
import dataStore from "./../req/dataStore";
import {ScrapedTweetAnalyzer} from "./req/scrapedTweetAnalyzer";
import tweetAnalyzer from './../req/tweetAnalyzer';
import saveTweetsFromStore from "./../req//saveTweetsFromStore";

import {scrapeUser} from "./req/scrapeUser";

const dataDir : string = argv.dataDir;

const nerBucket : string = argv.nerBucket;

let tweetSaveMgr : ScrapedTweetAnalyzer = new ScrapedTweetAnalyzer();

let store : dataStore<Tweet,decomposedTweetDate> = new dataStore<Tweet,decomposedTweetDate>();



function deDup(store : dataStore<Tweet,decomposedTweetDate>) : void
{
    for(let i : number = store.items.length - 1; i != -1; --i)
    {
        for(let k : number = 0; k != store.items.length - 1; ++k)
        {
            let l = store.items[i];
            let r = store.items[k];
            if(l.textHash == r.textHash &&
            i != k &&
            l.second == r.second &&
            l.minute == r.minute &&
            l.hour == r.hour &&
            l.day == r.day &&
            l.month == r.month &&
            l.year == r.year)
            {
                console.log(store.items.splice(i,1));
                
            }
        }
    }
}

let tweetStream : Array<any> = new Array<any>();

let nerBucketReadStream = new readLines(nerBucket);


function scrapeNextUser() : void
{
    let line = nerBucketReadStream.next();
    if(!line)
    {
        //deDup(store);
        //saveTweetsFromStore(tweetSaveMgr,store,dataDir);
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
    let scrapePromise = scrapeUser(user);
    scrapePromise.then((arg : any) => {
        console.log(arg.items.length);
        scrapeNextUser();
    });

    
}

scrapeNextUser();

let keepAlive = setInterval(function(){},1000);


