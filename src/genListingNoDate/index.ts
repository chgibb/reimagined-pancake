import * as fs from "fs";

let walk = require("walk");

let dataDir = process.argv[2];
if(!dataDir)
{
    console.log("Must specify directory to generate listing for!");
    process.exit(1);
}

let walker = walk.walk(dataDir,{});

walker.on
(
    "file",(root : string,fileStats : {name : string}, next : () => void) =>
    {
        console.log(root+"/"+fileStats.name);
        next();
    }
);