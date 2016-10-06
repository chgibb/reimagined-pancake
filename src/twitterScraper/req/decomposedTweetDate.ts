class decomposedTweetDate
{
    year : string;
    month : string;
    day : string;
    hour : string;
    minute : string;
    second : string;
    constructor
    (
        year : string,
        month : string,
        day : string,
        hour : string,
        minute : string,
        second : string
    )
    {
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
        this.minute = minute;
        this.second = second;
    }
}
export default decomposedTweetDate;