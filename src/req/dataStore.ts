import verifyJSONFile from './verifyJSONFile';
var canRead = require('./../jsreq/canRead');
var jsonFile = require('./../jsreq/jsonfile');
class dataStore<objectType,dateType>
{
    items : Array<objectType>;
    file : string;
    date : dateType;
    constructor(extFile? : string,date? : dateType)
    {
        this.items = new Array<objectType>();
        if(extFile)
            this.file = extFile;
        if(this.file !== undefined)
        {
            if(!this.loadFromFile())
                throw new Error("Could not load items from "+this.file);
        }
        if(date)
            this.date = date;
    }
    setDate(date : dateType)
    {
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
            var tmp = jsonFile.readFileSync(file,this);
            if(tmp.items)
                this.items = tmp.items;
            else
                return false;
            
        }
        return true;
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
export default dataStore;