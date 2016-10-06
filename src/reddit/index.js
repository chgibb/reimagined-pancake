"use strict";
const thread_1 = require('./req/thread');
var Job = require('./jsreq/Job.js');
var JobMgr = require('./jsreq/JobMgr.js');
var assert = require('./jsreq/assert');
var jsonFile = require('./jsreq/jsonfile.js');
var threads = {};
var thread = new thread_1.default("foo", "33/13/2016");
console.log(JSON.stringify(thread));
var archiveResponse = {
    send: function (channel, args) {
        if (args.retCode !== undefined) {
            console.log("done");
        }
        var tmp;
        if (args.unBufferedData) {
            var err = new RegExp("(Traceback \\(most recent call last\\)\\:)", "g");
            if (args.unBufferedData.match(err))
                return;
            var invalidDate = new RegExp("(ValueError\\: time data)|(does not match format)", "g");
            if (args.unBufferedData.match(invalidDate)) {
                console.log("Invalid date");
                return;
            }
            console.log(args.unBufferedData);
        }
    }
};
JobMgr.addJob("python", ["subredditarchive.py", "01/01/2016", "32/01/2016"], "", true, archiveResponse, {
    start: "01/01/2016",
    end: "01/02/2016"
});
setInterval(() => { JobMgr.runJobs(); }, 200);
