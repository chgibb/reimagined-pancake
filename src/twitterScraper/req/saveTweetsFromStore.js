"use strict";
var decomposedTweetDate_1 = require('./decomposedTweetDate');
var verifyDir_1 = require('./../../req/verifyDir');
var verifyJSONFile_1 = require('./../../req/verifyJSONFile');
function saveTweetsFromStore(mgr, store, rootDir) {
    verifyDir_1.default(rootDir);
    for (var i = 0; i != store.items.length; ++i) {
        verifyDir_1.default(rootDir);
        verifyDir_1.default(rootDir + "/" + store.items[i].year);
        verifyDir_1.default(rootDir + "/" + store.items[i].year + "/" + store.items[i].month);
        verifyDir_1.default(rootDir + "/" + store.items[i].year + "/" + store.items[i].month + "/" + store.items[i].day);
        verifyDir_1.default(rootDir + "/" + store.items[i].year + "/" + store.items[i].month + "/" + store.items[i].day + "/" + store.items[i].hour);
        verifyDir_1.default(rootDir + "/" + store.items[i].year + "/" + store.items[i].month + "/" + store.items[i].day + "/" + store.items[i].hour + "/" + store.items[i].minute);
        verifyDir_1.default(rootDir + "/" + store.items[i].year + "/" + store.items[i].month + "/" + store.items[i].day + "/" + store.items[i].hour + "/" + store.items[i].minute + "/" + store.items[i].second);
        var fileName = rootDir + "/" + store.items[i].year + "/" + store.items[i].month + "/" + store.items[i].day + "/" + store.items[i].hour + "/" + store.items[i].minute + "/" + store.items[i].second + "/tweets.json";
        verifyJSONFile_1.default(fileName);
        try {
            mgr.cache(fileName, new decomposedTweetDate_1.default(store.items[i].year, store.items[i].month, store.items[i].day, store.items[i].hour, store.items[i].minute, store.items[i].second));
        }
        catch (err) {
            mgr.createNewStore(fileName, new decomposedTweetDate_1.default(store.items[i].year, store.items[i].month, store.items[i].day, store.items[i].hour, store.items[i].minute, store.items[i].second));
        }
        mgr.addItemToCachedStore(fileName, store.items[i]);
        mgr.flush(fileName);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = saveTweetsFromStore;
