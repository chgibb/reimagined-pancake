import * as fs from "fs";

var argv : any = require('minimist')(process.argv.slice(2));
var escapeStringRegexp : (input : string) => string =  require("escape-string-regexp");

import * as bins from './../req/getBins';
var jsonFile = require('./../jsreq/jsonfile');
var canRead = require('./../jsreq/canRead');
var JobMgr = require('./../jsreq/JobMgr');
var assert = require('./../jsreq/assert');

var dataDir : string = argv.dataDir;
var year : string = argv.year;
var month : string = argv.month;
if(!dataDir)
{
    console.log("must specify result directory");
    process.exit(1);
}
var threads : number = 1;
JobMgr.maxJobs = threads + 1;

assert.assert
(
    ()=>
    {
        bins.populateSourceBins(true,dataDir,year,month);
        return true;
    },'',0
);
assert.assert(()=>{return true;},'',0);