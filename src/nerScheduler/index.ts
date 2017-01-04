import * as fs from "fs";

var argv : any = require('minimist')(process.argv.slice(2));
var escapeStringRegexp : (input : string) => string =  require("escape-string-regexp");

import * as bins from './../req/getBins';
import * as dispatch from './req/dispatch';
import queueScheduler from './req/queueScheduler';
var jsonFile = require('./../jsreq/jsonfile');
var canRead = require('./../jsreq/canRead');
var JobMgr = require('./../jsreq/JobMgr');
var assert = require('./../jsreq/assert');

var dataDir : string = argv.dataDir;
var year : string = argv.year;
var month : string = argv.month;
if(!dataDir)
{
    console.log("must specify source directory");
    process.exit(1);
}
JobMgr.maxJobs = 1;
var isComplete : RegExp = new RegExp("(@DONE@)","i");
let nerCallBack = 
{
    send : function(channel : string,args : any)
    {
        if(args.unBufferedData)
        {
            //on completion of an operation in the server, execute next local operation
            if(isComplete.test(args.unBufferedData))
            {
                assert.runningEvents -= 1;
            }
        }
    }
}
assert.assert
(
    ()=>
    {
        bins.populateSourceBins(true,dataDir,year,month);
        return true;
    },'',0
);
assert.assert(()=>{return true;},'',0);
assert.assert
( 
    ()=>
    {
        //Start up NER server
        JobMgr.addJob
        (
            "java",
            ["-jar","nerServer.jar"],
            "",true,
            nerCallBack,
            {}
        );
        assert.runningEvents += 1;
        return true;
    },'',0
);
assert.assert
(
    ()=>
    {
        queueScheduler();
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
