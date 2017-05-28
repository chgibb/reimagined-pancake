import * as cp from "child_process";
import * as fs from "fs";

const rimraf : any = require('rimraf');

import {default as Tweet} from "./../../req/tweet";
import decomposedTweetDate from "./../../req/decomposedTweetDate";
import dataStore from "./../../req/dataStore";
import tweetAnalyzer from './../../req/tweetAnalyzer';
import saveTweetsFromStore from "./../../req//saveTweetsFromStore";

let tweetSaveMgr : tweetAnalyzer = new tweetAnalyzer();
function createListing(dataDir : string) : Promise<{}>
{
    return new Promise((resolve,reject) => {
        let listing = dataDir+"listing";
        let genListing : cp.ChildProcess = cp.spawn(
            "node",<string[]>[
                "--max_old_space_size=11000",
                "genListingNoDate",
                dataDir
            ]);
        genListing.stdout.on("data",function(data : string){
            fs.appendFileSync(listing,data);
        });
        genListing.on("close",function(code : number){
            resolve(listing);
        });
    });
}

function merge(src : string,dest : string,listing : string) : Promise<{}>
{
    return new Promise((resolve,reject) => {
        let merger : cp.ChildProcess = cp.spawn(
            "./binMerger",<string[]>[
                src,dest,listing
            ]
        );
        merger.on("close",function(code : number){
            resolve(code);
        })
    });
}

export function mergeScrapedTweets(store : dataStore<Tweet,decomposedTweetDate>,src : string,dest : string) : Promise<{}>
{
    return new Promise((resolve,reject) => {
        saveTweetsFromStore(tweetSaveMgr,store,src);
        createListing(src).then((listing : string) => {
            merge(src,dest,listing).then(() => {
                fs.unlinkSync(listing);
                rimraf.sync(src);
                resolve();
            });
        });
    });
}