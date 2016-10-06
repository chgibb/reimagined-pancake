//binTagger
//Will populate the nerTags field of every item in the bin specified on the command line.
//Will use the facilities in slashTagParser to parse tags from Stanford NER as well as learn
//from Stanford NER and tag past entities that it has learned about.
var argv : any = require('minimist')(process.argv.slice(2));

var jsonFile = require('./../jsreq/jsonfile');
var canRead = require('./../jsreq/canRead');
var JobMgr = require('./../jsreq/JobMgr');
var assert = require('./../jsreq/assert');
var sleep = require('./../jsreq/sleep');

import dataStore from './../req/dataStore';
import tweet from './../twitterScraper/req/tweet';
import decomposedTweetDate from './../twitterScraper/req/decomposedTweetDate';
import * as slashTags from './req/slashTagParser';

//directory to save bin to
var dataDir : string = argv.dataDir;
var binPath : string = argv.bin;
if(!dataDir)
{
    console.log("must specify storage directory");
    process.exit(1);
}
if(!binPath)
{
    console.log("must specify bin to tag");
    process.exit(1);
}
console.log("Tagging: "+binPath);

var bin : dataStore<tweet,decomposedTweetDate> = new dataStore<tweet,decomposedTweetDate>(binPath);


var isNERData : RegExp = new RegExp("(\\/O)|(\\/0)|(Untokenizable)|(\\/ORGANIZATION)|(\\/PERSON)|(\\/LOCATION)","i");
var isComplete : RegExp = new RegExp("(@DONE@)","i");
var binIndex : number = 0;

var nerCallBack = 
{
    send : function(channel : string,args : any)
    {
        if(!args.extraData.i)
            args.extraData.i = 0;
        if(args.extraData.i !== undefined)
        {
            if(args.unBufferedData && isNERData.test(args.unBufferedData))
            {
                //parse slash tags from Stanford NER.
                //Will save any new tags it finds and apply them in the future.
                var res = slashTags.parseSlashTags(args.unBufferedData);
                if(res.length != 0)
                {
                    bin.items[args.extraData.i].nerTags = res;
                }
            }
        }
        if(isComplete.test(args.unBufferedData))
        {
            if(args.extraData.i)
                binIndex += 1;  
            assert.runningEvents -= 1;
        }
    }
}
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

JobMgr.maxJobs = 1;


var removePunctuation : RegExp = new RegExp("(\n)|(\\n)|(,)|(\\.)|(\\?)|(!)","g");
for(let i : number = 0; i != bin.items.length; ++i)
{
    assert.assert
    (
        ()=>
        {
            JobMgr.findJob
            (
                "java",
                function(job : any)
                {
                    var index : number = i;
                    job.extraData = {i:index}
                    //cull new lines before submitting to server
                    job.StdIn(bin.items[i].text.replace(removePunctuation," ")+"\n");
                    return true;
                }
            );
            //wait for reply from server before submitting another string
            assert.runningEvents += 1;
            return true;
        },'',0
    );
}

assert.assert
(
    ()=>
    {
        //kill nerServer
        JobMgr.findJob
        (
            "java",
            function(job : any)
            {
                job.process.kill("SIGINT");
            }
        );
        //if slash tag parser has learned anything new from Stanford's NER then save
        slashTags.saveLearnedTags();
        bin.saveToFile();
        console.log("completed tagging "+binPath);
        process.exit(0);
        return true;
    },'',0
);

assert.runAsserts();

setInterval(()=>{JobMgr.runJobs();},200);
