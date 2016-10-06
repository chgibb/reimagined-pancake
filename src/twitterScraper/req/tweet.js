"use strict";
var tweet = (function () {
    function tweet(text, createdAt) {
        this.text = text;
        this.createdAt = createdAt;
        this.textHash = "";
        this.decomposeDate();
        this.nerTags = new Array();
    }
    tweet.prototype.decomposeDate = function () {
        var tmp = this.createdAt.split(' ');
        this.year = tmp[5];
        this.month = tmp[1];
        this.day = tmp[2];
        tmp = tmp[3].split(':');
        this.hour = tmp[0];
        this.minute = tmp[1];
        this.second = tmp[2];
    };
    return tweet;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = tweet;
