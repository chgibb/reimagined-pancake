"use strict";
var months = new Array("dummy", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
function getMonthStringByNum(monthNum) {
    return months[monthNum];
}
function decomposePrawDate(input) {
    var tmp = input.split("/");
    var year = tmp[2];
    var month = getMonthStringByNum(parseInt(tmp[1]));
    if (month === undefined)
        month = "";
    var day = tmp[0];
    if (parseInt(day) > 32)
        day = "";
    return { year: year, month: month, day: day };
}
class decomposedPrawDate {
    constructor(begin) {
        var tmp = decomposePrawDate(begin);
        this.year = tmp.year;
        this.month = tmp.month;
        this.day = tmp.day;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = decomposedPrawDate;
