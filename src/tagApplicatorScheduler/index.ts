var argv : any = require('minimist')(process.argv.slice(2));

import * as fs from "fs";

import * as bins from './../scrapeScheduler/req/getBins';

var JobMgr = require('./../jsreq/JobMgr');
var assert = require('./../jsreq/assert');

var dataDir : string = argv.dataDir;
var year : string = argv.year;
var month : string = argv.month;
var day : string = argv.day;
var hour : string = argv.hour;

var threads : number = 1;
JobMgr.maxJobs = threads + 1;

assert.assert
(
    ()=>
    {
        //find all the bins to tag
        bins.populateSourceBins(true,dataDir,year,month,day,hour);
        return true;
    },'',0
);

//wait for bins to populate
assert.assert(()=>{return true;},'',0);

//on call back from a spawned tagger
var callBack : any = 
{
    send : function(channel : string, args : any)
    {
        if(args.retCode !== undefined)
        {
            //console.log("1 bin tagged");
            assert.runningEvents -= 1;
        }
        if(args.unBufferedData)
        {
            fs.appendFileSync("log",new Date()+" "+args.unBufferedData);
        }
    }
}

assert.assert
(
    ()=>
    {
        for(let i : number = 0; i != bins.sourceBins.length; i += 3)
        {
            assert.assert
            (
                ()=>
                {
                    JobMgr.addJob
                    (
                        "./tagApplicator",
                        ["classifiers/learnedTags.json",bins.sourceBins[i],bins.sourceBins[i+1],bins.sourceBins[i+2],bins.sourceBins[i+3]],
                        "",true,
                        callBack,
                        {}
                    );
                    assert.runningEvents += 1;
                    return true;
                },'',0
            );
        }
        assert.assert(()=>{return true;},'',0);
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
