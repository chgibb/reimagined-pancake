import Thread from "./thread";
import decomposedPrawDate from "./praw/decomposedPrawDate";
import verifyJSONFile from "./verifyJSONFile";
var canRead = require('./../jsreq/canRead.js');
var jsonFile = require('./../jsreq/jsonfile.js');
class threadStore
{
    threads : Array<Thread>;
    file : string;
    date : decomposedPrawDate;
    constructor(extFile? : string,date? : decomposedPrawDate)
    {
        this.threads = new Array<Thread>();
        if(extFile)
            this.file = extFile;
        if(this.file !== undefined)
        {
            if(!this.loadFromFile())
                throw new Error("Could not load threads from "+this.file);
        }
        if(date)
            this.date = date;
    }
    loadFromFile(extFile? : string) : boolean
    {
        let file : string;
        if(extFile)
            file = extFile;
        else
            file = this.file;
        if(!canRead(file))
            return false;
        else
        {
            var tmp = jsonFile.readFileSync(file);
            if(tmp.thread)
                this.threads = tmp.threads;
            else
                return false;
        }
    }
    saveToFile(extFile? : string) : boolean
    {
        let file : string;
        if(extFile)
            file = extFile;
        else
            file = this.file;
        if(!verifyJSONFile(file))
            return false;
        else
        {
            jsonFile.writeFileSync(file,this,{spaces : 4});
            return true;
        }
    }
}
export default threadStore;