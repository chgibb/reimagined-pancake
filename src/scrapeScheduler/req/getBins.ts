import tweet from './../../twitterScraper/req/tweet';
import dataStore from './../../req/dataStore';
import tweetStoreMgr from './../../twitterScraper/req/tweetStoreMgr';
import decomposedTweetDate from './../../twitterScraper/req/decomposedTweetDate';
var JobMgr = require('./../../jsreq/JobMgr');
var assert = require('./../../jsreq/assert');
export var sourceBins : Array<string>;
export var destinationBins : Array<dataStore<tweet,decomposedTweetDate>>;
var binCallBack : any = 
{
    send : function(channel : string,args : any)
    {
        var tmp : Array<string>;
        if(args.retCode !== undefined)
            assert.runningEvents -= 1;
        if(args.unBufferedData)
        {
            tmp = args.unBufferedData.split("\n");
            for(let i : number = 0; i != tmp.length; ++i)
            {
                if(tmp[i] == "tweets.json")
                {
                    var path : string = tmp[i-1];
                    path = path.replace(":","");
                    path += "/"+tmp[i];
                    //console.log(path);
                    if(args.extraData.binType == "source")
                        sourceBins.push(path);
                }
            }
        }
    }
}
export function populateSourceBins(dir : string)
{
    sourceBins = new Array<string>();
    JobMgr.addJob
    (
        "ls",
        ["-R",dir],
        "",true,
        binCallBack,
        {binType:"source"}
    );
    assert.runningEvents += 1;
}
export function populateDestinationBins(dir  :string)
{
    destinationBins = new Array<dataStore<tweet,decomposedTweetDate>>();
    JobMgr.addJob
    (
        "ls",
        ["-R",dir],
        "",true,
        binCallBack,
        {binType:"destination"}
    );
    assert.runningEvents += 1;
}