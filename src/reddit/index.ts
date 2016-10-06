import * as dayMgr from './req/dayMgr';
import Thread from './req/thread';
import threadStore from './req/threadStore';
import threadStoreMgr from './req/threadStoreMgr';


var Job = require('./jsreq/Job.js');
var JobMgr = require('./jsreq/JobMgr.js');
var assert = require('./jsreq/assert');
var jsonFile = require('./jsreq/jsonfile.js');

var threads : any = {};


var thread : Thread = new Thread("foo","33/13/2016");

/*console.log(JSON.stringify(thread));


var archiveResponse = 
{
    send : function(channel : string, args : any)
    {   
        if(args.retCode !== undefined)
        {   
            console.log("done");
        }
        var tmp : any;
        if(args.unBufferedData)
        {
            var err : RegExp = new RegExp("(Traceback \\(most recent call last\\)\\:)","g");
            
            //python error
            if(args.unBufferedData.match(err))
                return;
            
            var invalidDate : RegExp = new RegExp("(ValueError\\: time data)|(does not match format)","g");
            //invalid date format given
            if(args.unBufferedData.match(invalidDate))
            {
                console.log("Invalid date");
                return;
            }
            console.log(args.unBufferedData);
        }
    }
}


JobMgr.addJob
(
    "python",
    ["subredditarchive.py","01/01/2016","32/01/2016"],
    "",true,
    archiveResponse,
    {
        start : "01/01/2016",
        end : "01/02/2016"
    }
);

setInterval(()=>{JobMgr.runJobs();},200);
*/