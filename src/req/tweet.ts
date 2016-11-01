class tweet
{
    text : string;
    createdAt : string
    textHash : string;
    year : string;
    month : string;
    day : string;
    hour : string;
    minute : string;
    second : string;
    nerTags : Array<any>;
    sentiment : any;
    constructor(text : string,createdAt : string)
    {
        this.text = text;
        this.createdAt = createdAt;
        this.textHash = "";
        this.decomposeDate();
        this.nerTags = new Array<any>();
    }
    decomposeDate() : void
    {
        var tmp : Array<string> = this.createdAt.split(' ');
        this.year = tmp[5];
        this.month = tmp[1];
        this.day = tmp[2];
        tmp = tmp[3].split(':');
        this.hour = tmp[0];
        this.minute = tmp[1];
        this.second = tmp[2];
    }
}
export default tweet;