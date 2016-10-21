import * as fs from "fs";

var argv : any = require('minimist')(process.argv.slice(2));

var jsonFile = require('./../jsreq/jsonfile');

import dataStore from './../req/dataStore';
import tweet from './../twitterScraper/req/tweet';
import decomposedTweetDate from './../twitterScraper/req/decomposedTweetDate';
import applyTags from "./req/applyTags";
argv._ = argv._.sort();
for(let i = 0; i != argv._.length; ++i)
{
    fs.appendFileSync("log",new Date()+" Applying learned tags to: "+argv._[i]);
    var bin : dataStore<tweet,decomposedTweetDate> = new dataStore<tweet,decomposedTweetDate>(argv._[i]);
    applyTags(bin);
    bin.saveToFile();
    fs.appendFileSync("log",new Date()+" Done applying learned tags");
}
