import * as fs from "fs";

var argv : any = require('minimist')(process.argv.slice(2));

var jsonFile = require('./../jsreq/jsonfile');
var assert = require("./../jsreq/assert");
var JobMgr = require('./../jsreq/JobMgr');
JobMgr.maxJobs = 1;

import * as bins from './../scrapeScheduler/req/getBins';
import dataStore from './../req/dataStore';
import tweet from './../twitterScraper/req/tweet';
import decomposedTweetDate from './../twitterScraper/req/decomposedTweetDate';
import applyTags from "./req/applyTags";

var dataDir : string=  argv.dataDir;
var year : string = argv.year;
var month : string = argv.month;
var day : string = argv.day;
var hour : string = argv.hour;
var minute : string = argv.minute;
assert.assert
(
    ()=>
    {
        bins.populateSourceBins(dataDir,year,month,day,hour,minute);
        return true;
    },'',0
);
assert.assert
(
    ()=>
    {
        for(let i = 0; i != bins.sourceBins.length; ++i)
        {
            fs.appendFileSync("log",new Date()+" Applying learned tags to: "+bins.sourceBins[i]+"\n");
            var bin : dataStore<tweet,decomposedTweetDate> = new dataStore<tweet,decomposedTweetDate>(bins.sourceBins[i]);
            applyTags(bin);
            var res : boolean = bin.saveToFile();
            if(!res)
                console.log("Could not save "+bin.file);
            fs.appendFileSync("log",new Date()+" Done applying learned tags\n");
        }
        return true;
        },'',0
);
var jobRunner : NodeJS.Timer = setInterval
(
    ()=>
    {
        JobMgr.runJobs();
    },200
);
assert.runAsserts(<Array<NodeJS.Timer>>[jobRunner]);
