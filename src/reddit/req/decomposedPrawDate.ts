interface prawDate
{
    year : string;
    month : string;
    day : string;
}
var months : Array<string> = new Array<string>
(
    "dummy",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
);
function getMonthStringByNum(monthNum : number) : string
{
    return months[monthNum];
}
function decomposePrawDate(input : string) : prawDate
{
    var tmp : Array<string> = input.split("/");
    var year : string = tmp[2];
    var month : string = getMonthStringByNum(parseInt(tmp[1]));
    if(month === undefined)
        month = "";
    var day : string = tmp[0];
    if(parseInt(day) > 32)
        day = "";
    return{year:year,month:month,day:day}
}
class decomposedPrawDate
{
    year : string;
    month : string;
    day : string
    constructor(begin : string)
    {
        var tmp = decomposePrawDate(begin);
        this.year = tmp.year;
        this.month = tmp.month;
        this.day = tmp.day;
    }
}
export default decomposedPrawDate;