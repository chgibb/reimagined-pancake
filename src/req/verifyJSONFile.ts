var canRead = require('./../jsreq/canRead.js');
function verifyJSONFile(file : string) : boolean
{
    //file does not exist
    if(!canRead(file))
    {
        //create file with JSON skeleton
        var fs : any = require('fs');
        fs.writeFileSync(file,"{}",fs.O_CREATE);
        //file still does not exist
        //something went wrong
        if(!canRead(file))
            return false;
    }
    return true;
}
export default verifyJSONFile;