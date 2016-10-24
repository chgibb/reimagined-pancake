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
        {
            sourceBins.sort();
            assert.runningEvents -= 1;
        }
        if(args.unBufferedData)
        {
            tmp = args.unBufferedData.split("\n");
            for(let i : number = 0; i != tmp.length; ++i)
            {
                if(tmp[i] && args.extraData.binType == "source")
                {
                    sourceBins.push(tmp[i]);
                }
            }
        }
    }
}
export function populateSourceBins(dir : string,year? : string,month? : string,day? : string, hour? : string, minute? : string,second? : string) : void
{
    sourceBins = new Array<string>();
    var argsToPass : Array<string> = new Array<string>();
    argsToPass.push("scripts/getBinNames.bash");
    if(dir)
        argsToPass.push(dir);
    if(year)
        argsToPass.push(year);
    if(month)
        argsToPass.push(month);
    if(day)
        argsToPass.push(day);
    if(hour)
        argsToPass.push(hour);
    if(minute)
        argsToPass.push(minute);
    if(second)
        argsToPass.push(second);
    JobMgr.addJob
    (
        "bash",
        argsToPass,
        "",true,
        binCallBack,
        {binType:"source"}
    );
    assert.runningEvents += 1;
}
/*export function populateDestinationBins(dir  :string)
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
}*/