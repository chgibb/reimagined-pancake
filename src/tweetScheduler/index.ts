var argv : any = require('minimist')(process.argv.slice(2));
var rimraf : any = require('rimraf');

import * as fs from "fs";
import * as cp from "child_process";

import tweet from './../req/tweet';
import dataStore from './../req/dataStore';
import tweetStoreMgr from './../req/tweetStoreMgr';
import decomposedTweetDate from './../req/decomposedTweetDate';
import verifyDir from './../req/verifyDir';
import verifyJSONFile from './../req/verifyJSONFile';
import saveTweetsFromStore from './../req/saveTweetsFromStore';
import tweetAnalyzer from './../req/tweetAnalyzer';
import * as bins from './../req/getBins';

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

//on call back from a spawned miner
let minerCallBack : any = 
{
    send : function(channel : string, args : any)
    {
        if(args.retCode !== undefined)
        {
            if(args.retCode != 0)
            {
                console.log("Miner exited with "+JSON.stringify(args,undefined,4));
            }
            assert.runningEvents -= 1;
        }
        if(args.unBufferedData)
        {
            fs.appendFileSync("log",new Date()+" "+args.unBufferedData);
        }
    }
};
let listingCallBack : any = {
    send : function(channel : string,args : any)
    {
        if(args.retCode !== undefined)
        {
            if(args.retCode != 0)
            {
                console.log("Listing fialed "+JSON.stringify(args,undefined,4));
            }
            assert.runningEvents -= 1;
        }
        if(args.unBufferedData)
        {
            fs.appendFileSync(dataDir+"listing"+args.args[2],args.unBufferedData);
        }
    }
};
let mergingCallBack : any = {
    send : function(channel : string,args : any)
    {
        if(args.retCode !== undefined)
        {
            if(args.retCode != 0)
            {
                console.log("Merging failed "+JSON.stringify(args,undefined,4));
            }
            assert.runningEvents -= 1;
        }
        if(args.unBufferedData)
        {
            fs.appendFileSync(`modBins${dataDir}`,args.unBufferedData);
        }
    }
};

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
                ["--max_old_space_size=11000","twitterMiner","--dataDir="+dirs[k]],
                "",true,
                minerCallBack,
                {}
            );
            assert.runningEvents += 1;
            return true;
        },'');
    }
}
for(let i : number = 0; i != dirs.length; ++i)
{
    //generate listings for all temp dbs
    assert.assert(()=>{
        JobMgr.addJob(
            "node",
            ["--max_old_space_size=11000","genListingNoDate",dirs[i]],
            "",true,
            listingCallBack,
            {}
        );
        assert.runningEvents += 1;
        return true;
    },'',0);

    //merge temp dbs using generated listings
    assert.assert(()=>{
        JobMgr.addJob(
            "./binMerger",
            [dirs[i],dataDir,`${dataDir}listing${dirs[i]}`],
            "",true,
            mergingCallBack,
            {}
        );
        assert.runningEvents += 1;
        return true;
    },'',0);
    
    assert.assert(()=>{
        //remove temp tweet dbs
        rimraf.sync(dirs[i]);
        //remove db listings
        fs.unlinkSync(`${dataDir}listing${dirs[i]}`);
        return true;
    },'',0);
}

var jobRunner : NodeJS.Timer = setInterval
(
    ()=>
    {
        JobMgr.runJobs();
    },200
);
assert.runAsserts(<Array<NodeJS.Timer>>[jobRunner]);


