var jsonFile = require('./../jsreq/jsonfile.js');
import Thread from "./thread";
export class Day
{
    begin : string;
    end : string;
    ID : string;
    folder : string;
    fileList : Array<string>;
    threads : Array<Thread>;
    constructor(begin : string,end : string)
    {
    }
}