var canRead = require('./../jsreq/canRead.js');
function verifyDir(dir : string) : boolean
{
    if(!canRead(dir))
    {
        var fs : any = require('fs');
        fs.mkdirSync(dir);
        if(!canRead(dir))
            return false;
    }
    return true;
}
export default verifyDir;