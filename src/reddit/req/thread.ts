var sha256 = require('./../jsreq/sha256.min');
import decomposedPrawDate from './praw/decomposedPrawDate';
class Thread
{
    title : string;
    titleTextHash : string;
    beginDate : decomposedPrawDate;
    endDate : decomposedPrawDate;
    constructor(title : string,beginDate? : string,endDate? : string)
    {
        this.title = title;
        this.titleTextHash = sha256(this.title);
        if(beginDate)
        {
            this.beginDate = new decomposedPrawDate(beginDate);
        }
        if(endDate)
        {
            this.endDate = new decomposedPrawDate(endDate);
        }
    }

}
export default Thread;