"use strict";
var JobMgr = require('./../../jsreq/JobMgr');
var assert = require('./../../jsreq/assert');
var binCallBack = {
    send: function (channel, args) {
        var tmp;
        if (args.retCode !== undefined) {
            exports.sourceBins.sort();
            assert.runningEvents -= 1;
        }
        if (args.unBufferedData) {
            tmp = args.unBufferedData.split("\n");
            for (var i = 0; i != tmp.length; ++i) {
                if (tmp[i] && args.extraData.binType == "source") {
                    exports.sourceBins.push(tmp[i]);
                }
            }
        }
    }
};
function populateSourceBins(targeted, dir, year, month, day, hour, minute, second) {
    exports.sourceBins = new Array();
    var argsToPass = new Array();
    if (!targeted)
        argsToPass.push("scripts/getBinNames.bash");
    if (dir)
        argsToPass.push(dir);
    if (year)
        argsToPass.push(year);
    if (month)
        argsToPass.push(month);
    if (day)
        argsToPass.push(day);
    if (hour)
        argsToPass.push(hour);
    if (minute)
        argsToPass.push(minute);
    if (second)
        argsToPass.push(second);
    if (!targeted) {
        JobMgr.addJob("bash", argsToPass, "", true, binCallBack, { binType: "source" });
    }
    if (targeted) {
        JobMgr.addJob("./binDiscoverer", argsToPass, "", true, binCallBack, { binType: "source" });
    }
    assert.runningEvents += 1;
}
exports.populateSourceBins = populateSourceBins;
