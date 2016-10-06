"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var dataStore_1 = require('./../../req/dataStore');
var dataStoreMgr_1 = require('./../../req/dataStoreMgr');
var tweetStoreMgr = (function (_super) {
    __extends(tweetStoreMgr, _super);
    function tweetStoreMgr() {
        _super.apply(this, arguments);
    }
    tweetStoreMgr.prototype.contructor = function () {
        this.stores = new Array();
    };
    tweetStoreMgr.prototype.cache = function (file, date) {
        if (!this.stores)
            this.stores = new Array();
        this.stores.push(new dataStore_1.default(file, date));
    };
    tweetStoreMgr.prototype.createNewStore = function (file, date) {
        this.stores.push(new dataStore_1.default("", date));
        this.stores[this.stores.length - 1].file = file;
    };
    tweetStoreMgr.prototype.flush = function (file) {
        for (var i = 0; i != this.stores.length; ++i) {
            if (this.stores[i].file == file) {
                this.stores[i].saveToFile();
                return;
            }
        }
    };
    tweetStoreMgr.prototype.addToCachedStore = function (name, arr) {
        for (var i = 0; i != this.stores.length; ++i) {
            if (this.stores[i].file == name) {
                for (var k = 0; k != arr.length; ++k) {
                    for (var j = 0; j != this.stores[i].items.length; ++j) {
                        if (arr[k].textHash == this.stores[i].items[j].textHash) {
                            arr[k].text = "";
                        }
                    }
                }
                for (var k = 0; k != arr.length; ++k) {
                    if (arr[k].text != "")
                        this.stores[i].items.push(arr[k]);
                }
                return;
            }
        }
    };
    tweetStoreMgr.prototype.addItemToCachedStore = function (name, twiit) {
        this.addToCachedStore(name, new Array(twiit));
    };
    return tweetStoreMgr;
}(dataStoreMgr_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = tweetStoreMgr;
