var argv : any = require('minimist')(process.argv.slice(2));
var rimraf : any = require('rimraf');

import * as fs from "fs";

import tweet from './../twitterScraper/req/tweet';
import dataStore from './../req/dataStore';
import tweetStoreMgr from './../twitterScraper/req/tweetStoreMgr';
import decomposedTweetDate from './../twitterScraper/req/decomposedTweetDate';
import verifyDir from './../req/verifyDir';
import verifyJSONFile from './../req/verifyJSONFile';
import saveTweetsFromStore from './../twitterScraper/req/saveTweetsFromStore';
import tweetAnalyzer from './req/tweetAnalyzer';
import * as bins from './req/getBins';

var JobMgr = require('./../jsreq/JobMgr');
var assert = require('./../jsreq/assert');

var dataDir : string = argv.dataDir;
if(!dataDir)
{
    console.log("must specify result directory");
    process.exit(1);
}
var threads : number = argv.threads;
if(!threads)
{
    console.log("must specify number of threads to run");
    process.exit(1);
}
var iterations : number = argv.iterations;
if(!iterations)
{
    console.log("must specify number of iterations before data consolidation");
    process.exit(1);
}
var dirs : Array<string> = new Array<string>();
for(let i : number = 0; i != threads; ++i)
{
    dirs.push(dataDir+i.toString());
}

//on call back from a spawned scrapper
var callBack : any = 
{
    send : function(channel : string, args : any)
    {
        if(args.retCode !== undefined)
        {
            fs.appendFileSync("log",new Date()+" 1 scrapper done\n");
            assert.runningEvents -= 1;
        }
        if(args.unBufferedData)
        {
            fs.appendFileSync("log",new Date()+" "+args.unBufferedData);
        }
    }
}

//max concurrent threads to run
JobMgr.maxJobs = threads + 1;

//override default save behaviour to include sentiment analysis on saved tweets
var tweetSaveMgr : tweetAnalyzer = new tweetAnalyzer();

//queue up threadsxiterations scrapers
for(let i : number = 0; i != iterations; ++i)
{
    for(let k : number = 0; k < threads; ++k)
    {
        assert.assert(()=>{
            JobMgr.addJob
            (
                "node",
                ["--max_old_space_size=11000","twitterScraper","--dataDir="+dirs[k]],
                "",true,
                callBack,
                {}
            );
            assert.runningEvents += 1;
            return true;
        },'');
    }
}
for(let j : number = 0; j != dirs.length; ++j)
{
    //for every thread's directory
    assert.assert
    (
        ()=>
        {
            //find all the bins generated
            bins.populateSourceBins(false,dirs[j]);
            return true;
        },'',0
    );
    assert.assert
    (
        ()=>
        {
            //commit each bin into the corresponding bin in the data directory
            for(let i : number = 0; i != bins.sourceBins.length; ++i)
            {
                var store : dataStore<tweet,decomposedTweetDate> = new dataStore<tweet,decomposedTweetDate>(bins.sourceBins[i]);
                fs.appendFileSync("log",new Date()+" "+"committing "+store.items.length+" tweets\n");
                saveTweetsFromStore(tweetSaveMgr,store,dataDir);
                fs.appendFileSync("log",new Date()+" "+"done\n");
            }
            return true;
        },'',0
    );
    assert.assert
    (
        ()=>
        {
            //remove the directory
            rimraf.sync(dirs[j]);
            return true;
        },'',0
    );
}
var jobRunner : NodeJS.Timer = setInterval
(
    ()=>
    {
        JobMgr.runJobs();
    },200
);
assert.runAsserts(<Array<NodeJS.Timer>>[jobRunner]);


