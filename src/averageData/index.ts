var argv : any = require('minimist')(process.argv.slice(2));

let ndJson : any = require("ndjson");

import * as fs from "fs";

var jsonFile = require('./../jsreq/jsonfile');
var canRead = require('./../jsreq/canRead');
var assert = require('./../jsreq/assert');
import * as tag from "./req/tagExists";

var filePath = argv.file;
var date = argv.date;
if(!filePath)
{
    console.log("Must specify file to open");
    process.exit(1);
}
//expect output from queryBins
//var file : Array<any> = jsonFile.readFileSync(filePath);
if(!canRead(filePath))
{
    console.log("Error accessing "+filePath);
    process.exit(1);
}

var nerTags : Array<tag.nerTagAverage> = new Array<tag.nerTagAverage>();
var sentimentAverage : number = 0;
var totalTweets = 0;
assert.runningEvents += 1;
let stream = fs.createReadStream(filePath);
stream.pipe(ndJson.parse()).on
(
    'data',(data : any) => 
    {
        if(data.nerTags)
        {
            for(let k = 0; k != data.nerTags.length; ++k)
            {
                tag.considerNerTag(nerTags,data.nerTags[k],data.sentiment);
            }
        }
        if(data.sentiment != undefined)
        {
            sentimentAverage += data.sentiment;
        }
        totalTweets += 1;
    }
).on
(
    'end',() => 
    {
        assert.runningEvents -= 1;
    }
);

assert.assert
(
    ()=>
    {
        for(let i = 0; i != nerTags.length; ++i)
        {
            nerTags[i].sentimentAverage = nerTags[i].sentimentAverage/nerTags[i].count;
        }

        var res : any = 
        {
            nerTags : nerTags,
            sentimentAverage : sentimentAverage/totalTweets,
            date : date,
            totalTweets : totalTweets
        }
        console.log(JSON.stringify(res,undefined,4));
        return true;
    },'',0
);
assert.runAsserts();
