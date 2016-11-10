var argv : any = require('minimist')(process.argv.slice(2));

import * as fs from "fs";

var jsonFile = require('./../jsreq/jsonfile');
var canRead = require('./../jsreq/canRead');

import * as tag from "./req/tagExists";

var filePath = argv.file;
var date = argv.date;
if(!filePath)
{
    console.log("Must specify file to open");
    process.exit(1);
}
//expect output from queryBins
var file : Array<any> = jsonFile.readFileSync(filePath);
if(!file)
{
    console.log("Error accessing "+filePath);
    process.exit(1);
}

var nerTags : Array<tag.nerTagAverage> = new Array<tag.nerTagAverage>();
var sentimentAverage : number = 0;
var totalTweets = 0;

for(let i = 0; i != file.length; ++i)
{
    if(file[i].nerTags)
    {
        for(let k = 0; k != file[i].nerTags.length; ++k)
        {
            tag.considerNerTag(nerTags,file[i].nerTags[k],file[i].sentiment);
        }
    }
    if(file[i].sentiment != undefined)
    {
        sentimentAverage += file[i].sentiment;
    }
}

for(let i = 0; i != nerTags.length; ++i)
{
    nerTags[i].sentimentAverage = nerTags[i].sentimentAverage/nerTags[i].count;
}

var res : any = 
{
    nerTags : nerTags,
    sentimentAverage : sentimentAverage/file.length,
    date : date,
    totalTweets : file.length
}



console.log(JSON.stringify(res,undefined,4));


