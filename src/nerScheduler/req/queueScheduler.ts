import * as bins from './../../req/getBins';
import * as dispatch from './../req/dispatch';
var JobMgr = require('./../../jsreq/JobMgr');
var assert = require('./../../jsreq/assert');

export let binIndex : number = -1;
export function incrementBinIndex() : void
{
    binIndex++;
}
//Big recursive, convoluted for loop
export function scheduleNextDispatch() : void
{
    if(binIndex != -1 && binIndex < bins.sourceBins.length)
    {
        assert.assert
        ( 
            ()=>
            {
                console.log("Learning about bin "+binIndex+" of "+bins.sourceBins.length);  
                JobMgr.findJob
                (
                    "java",
                    function(job : any)
                    {
                        var index : number = binIndex;
                        job.extraData = {i:index}
                        //cull new lines before submitting for classification
                        job.StdIn(bins.sourceBins[binIndex]);
                        return true;
                    }
                );

                binIndex++;
                scheduleNextDispatch();
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