import * as fs from "fs";
import * as EventEmitter from "events";


const readLines = require("n-readlines");


let argv = require("minimist")(process.argv.slice(2));

import {mergeScrapedTweets} from "./req/mergeScrapedTweets";
import {scrapeUser} from "./req/scrapeUser";

const dataDir : string = argv.dataDir;

const nerBucket : string = argv.nerBucket;

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
    let scrapePromise = scrapeUser(user);
    scrapePromise.then((arg : any) => {
        console.log(arg.items.length);

        let range = Math.floor(Math.random() * (100 - 10 + 1)) + 10;

        let saveDir = dataDir+range.toString();
        
        mergeScrapedTweets(arg,saveDir,dataDir).then(() =>{
            scrapeNextUser();
        });
        
    });

    
}

scrapeNextUser();

let keepAlive = setInterval(function(){},1000);


