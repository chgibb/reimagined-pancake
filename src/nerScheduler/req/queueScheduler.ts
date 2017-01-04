import * as bins from './../../req/getBins';
import * as dispatch from './../req/dispatch';
var JobMgr = require('./../../jsreq/JobMgr');
var assert = require('./../../jsreq/assert');
//Big recursive, convoluted for loop
let binIndex = 0;
export default function queueScheduler() : void
{
    if(binIndex < bins.sourceBins.length)
    {
        assert.assert
        ( 
            ()=>
            {
                console.log(binIndex+" of "+bins.sourceBins.length);  
                console.log("runningEvents "+assert.runningEvents); 
                dispatch.queueDispatchTweetsFromBin(bins.sourceBins[binIndex]);
                binIndex++;
                queueScheduler();
                return true;
            },'',0
        );
    }
    else
    {
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
                return true;
            },'',0
        );
    }
}