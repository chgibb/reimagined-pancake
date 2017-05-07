/*
    --dataDir=<string>
        directory to use as tweet database.
    --listing=<string>

*/
let argv : any = require('minimist')(process.argv.slice(2));
let escapeStringRegexp : (input : string) => string =  require("escape-string-regexp");

import * as fs from "fs";
import * as readline from "readline";

import dataStore from './../req/dataStore';
import tweet from './../req/tweet';
import decomposedTweetDate from './../req/decomposedTweetDate';

import outFile from "./req/outFile";
import {formattedStreamPipe} from "./req/formattedStream";

let assert = require('./../jsreq/assert');
let sleep = require('./../jsreq/sleep');

let dataDir : string = argv.dataDir;
if(!dataDir)
{
    console.log("must specify data directory");
    process.exit(1);
}

let listing : string = argv.listing;

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
let rl : readline.ReadLine;

assert.assert
(
    ()=>
    {
        rl = readline.createInterface(<readline.ReadLineOptions>{
            input : fs.createReadStream(listing)
        });
        rl.on("line",function(line : string){
            let store : dataStore<tweet,decomposedTweetDate>
            fs.appendFileSync("log",new Date()+" "+"Considering "+line+" in query\n");
            try
            {
                store = new dataStore<tweet,decomposedTweetDate>(line);
            }
            catch(err)
            {
                fs.appendFileSync("log",new Date()+" "+line+" has an error preventing it from being queried\n");
                return;
            }
            for(let j : number = 0; j != store.items.length; ++j)
            {
                let toWrite : string = "";
                toWrite = JSON.stringify({date:store.items[j].createdAt,nerTags:store.items[j].nerTags,sentiment:store.items[j].sentiment.score});
                res.write(toWrite);
            }
        });

        rl.on("close",function(){
            assert.runningEvents -= 1;
        });
        assert.runningEvents += 1;
        return true;
    },'',0
);

assert.assert
(
    ()=>
    {
        sleep(3);
        return true;
    },'',0
);

assert.runAsserts();