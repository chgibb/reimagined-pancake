/*
    --dataDir=<string>
        directory to use as tweet database.
    --dataPoint=<string>
        data point to extract.
        Either sentiment or nerTags.
    --tagFilter=<string>
        If dataPoint==nerTags, only return time stamp and list of nertags with at least one matching filter.
    --filterType=strong|undefined
        If strong, nerTag must match whole string to count. Else may match substring.
    --year=<string>
    --month=<string>
        3 letter month to extract from.
    --day=<string>
        2 digit day to extract from.
    --hour=<string>
        2 digit hour to extract from.
    --minute=<string>
        2 digit minute to extract from.
    --dateFormat=twitter

*/

var argv : any = require('minimist')(process.argv.slice(2));
var escapeStringRegexp : (input : string) => string =  require("escape-string-regexp");

import * as fs from "fs";

import * as bins from './../req/getBins';

import dataStore from './../req/dataStore';
import tweet from './../req/tweet';
import decomposedTweetDate from './../req/decomposedTweetDate';

import outFile from "./req/outFile";
import {formattedStreamPipe} from "./req/formattedStream";

import checkDateFilterOnBinPath from "./req/checkDateFilterOnBinPath";

var JobMgr = require('./../jsreq/JobMgr');
var assert = require('./../jsreq/assert');
var sleep = require('./../jsreq/sleep');

var dataDir : string = argv.dataDir;
if(!dataDir)
{
    console.log("must specify data directory");
    process.exit(1);
}
var dataPoint : string = argv.dataPoint;
if(!dataPoint)
{
    console.log("must specify data point to extract");
    process.exit(1);
}
var tagFilter : string = argv.tagFilter;
var filterType : string = argv.filterType;
var tagFilterRegExp : RegExp;
if(tagFilter)
{
    if(filterType == "strong")
        tagFilterRegExp = new RegExp("\\b"+tagFilter+"\\b","i");
    else
        tagFilterRegExp = new RegExp(tagFilter,"i");
}
var dateFormat : string = argv.dateFormat;
if(!dateFormat)
{
    dateFormat = "twitter";
}
var year : string = argv.year;

var month : string = argv.month;

var day : string = argv.day;

var hour : string = argv.hour;

var minute : string = argv.minute;

JobMgr.maxJobs = 1;

assert.assert
(
    ()=>
    {
        bins.populateSourceBins(true,dataDir,year,month,day,hour,minute);
        return true;
    },'',0
);
//var res : Array<any> = new Array<any>();
let res : outFile = new outFile
(
    {
       write : (data : string) =>
       {
           console.log(data);
       },
       flush : () =>
       {

       },
       close : () =>
       {
           
       }
    }
);
res.writeHeader();
assert.assert(()=>{return true;},'',0);
assert.assert
(
    ()=>
    {
        for(let i : number = 0; i != bins.sourceBins.length; ++i)
        {
            var store : dataStore<tweet,decomposedTweetDate>
            fs.appendFileSync("log",new Date()+" "+"Considering "+bins.sourceBins[i]+" in query\n");
            try
            {
                store = new dataStore<tweet,decomposedTweetDate>(bins.sourceBins[i]);
            }
            catch(err)
            {
                fs.appendFileSync("log",new Date()+" "+bins.sourceBins[i]+" has an error preventing it from being queried\n");
                continue;
            }
            var avg  = 0;
            for(let j : number = 0; j != store.items.length; ++j)
            {
                let toWrite : string = "";
                if(dataPoint == "sentiment")
                {
                    toWrite = JSON.stringify({date:store.items[j].createdAt,sentiment:store.items[j].sentiment.score});
                }
                if(dataPoint == "nerTags")
                {
                    if(!tagFilter)
                        toWrite = JSON.stringify({date:store.items[j].createdAt,nerTags:store.items[j].nerTags,sentiment:store.items[j].sentiment.score});
                    if(tagFilter)
                    {
                        for(let k : number = 0; k != store.items[j].nerTags.length; ++k)
                        {
                            if(tagFilterRegExp.test(store.items[j].nerTags[k].token))
                            {
                                toWrite = JSON.stringify({date:store.items[j].createdAt,nerTags:store.items[j].nerTags,sentiment:store.items[j].sentiment.score});
                                break;
                            }
                        }
                    }
                }
                res.write(toWrite);

            }
        }
        res.writeEnd();
        return true;
    },'',0
);
assert.assert
(
    ()=>
    {
        //console.log(JSON.stringify(res,undefined,0));
        sleep(3);
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