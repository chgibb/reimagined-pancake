"use strict";
var decomposedTweetDate = (function () {
    function decomposedTweetDate(year, month, day, hour, minute, second) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
        this.minute = minute;
        this.second = second;
    }
    return decomposedTweetDate;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = decomposedTweetDate;
