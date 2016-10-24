import * as fs from "fs";
export default class inputFile
{
    json : any;
    file : string;
    constructor(filePath : string)
    {
        this.file = filePath;
        this.loadFile();
    }
    loadFile()
    {
        this.json = JSON.parse(fs.readFileSync(this.file).toString());
    }
}