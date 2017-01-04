import * as bins from './../../req/getBins';
import dataStore from './../../req/dataStore';
import tweet from './../../req/tweet';
import decomposedTweetDate from './../../req/decomposedTweetDate';
var JobMgr = require('./../../jsreq/JobMgr');
var assert = require('./../../jsreq/assert');
let removePunctuation : RegExp = new RegExp("(\n)|(\\n)|(,)|(\\.)|(\\?)|(!)","g");
//Queue every tweet from the specified bin to be submitted to nerServer for classificiation
export function queueDispatchTweetsFromBin(binPath : string) : void
{
    var bin : dataStore<tweet,decomposedTweetDate> = new dataStore<tweet,decomposedTweetDate>(binPath);
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
                        //cull new lines before submitting for classification
                        job.StdIn(bin.items[i].text.replace(removePunctuation," ")+"\n");
                        return true;
                    }
                );
                assert.runningEvents += 1;
                return true;
            },'',0
        );
    }
}