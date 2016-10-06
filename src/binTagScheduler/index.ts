var argv : any = require('minimist')(process.argv.slice(2));

import * as fs from "fs";

import * as bins from './../scrapeScheduler/req/getBins';

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

//max concurrent threads to run
JobMgr.maxJobs = threads + 1;

assert.assert
(
    ()=>
    {
        //find all the bins to tag
        bins.populateSourceBins(dataDir);
        return true;
    },'',0
);
//wait for bins to populate
assert.assert(()=>{return true;},'',0);
assert.assert
(
    ()=>
    {
        for(let i : number = 0; i != bins.sourceBins.length; ++i)
        {
            assert.assert
            (
                ()=>
                {
                    JobMgr.addJob
                    (
                        "node",
                        ["--max_old_space_size=11000","binTagger","--dataDir="+dataDir,"--bin="+bins.sourceBins[i]],
                        "",true,
                        callBack,
                        {}
                    );
                    assert.runningEvents += 1;
                    return true;
                },'',0
            );
        }
        return true;
    },'',0
);
assert.runAsserts();
setInterval
(
    ()=>
    {
        JobMgr.runJobs();
    },200
);
