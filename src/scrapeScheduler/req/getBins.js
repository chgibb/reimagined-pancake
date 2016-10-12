"use strict";
var JobMgr = require('./../../jsreq/JobMgr');
var assert = require('./../../jsreq/assert');
var binCallBack = {
    send: function (channel, args) {
        var tmp;
        if (args.retCode !== undefined)
            assert.runningEvents -= 1;
        if (args.unBufferedData) {
            tmp = args.unBufferedData.split("\n");
            for (var i = 0; i != tmp.length; ++i) {
                if (tmp[i] == "tweets.json") {
                    var path = tmp[i - 1];
                    if (path) {
                        path = path.replace(":", "");
                        path += "/" + tmp[i];
                        if (args.extraData.binType == "source")
                            exports.sourceBins.push(path);
                    }
                }
            }
        }
    }
};
function populateSourceBins(dir) {
    exports.sourceBins = new Array();
    JobMgr.addJob("ls", ["-R", dir], "", true, binCallBack, { binType: "source" });
    assert.runningEvents += 1;
}
exports.populateSourceBins = populateSourceBins;
function populateDestinationBins(dir) {
    exports.destinationBins = new Array();
    JobMgr.addJob("ls", ["-R", dir], "", true, binCallBack, { binType: "destination" });
    assert.runningEvents += 1;
}
exports.populateDestinationBins = populateDestinationBins;
