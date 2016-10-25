import * as electron from "electron";
let dialog = electron.remote.dialog;

import inputFile from "./inputFile";
import comparePanCakeDayDateString from "./comparePancakeDayDateString";

export default function showInputDialog(inputs : Array<inputFile>) : void
{
    dialog.showOpenDialog
    (
        {
            title : "Select Date Data to Input",
            filters : 
            [
                {
                    name : "Pancake Day Data",
                    extensions : 
                    [
                        "json"
                    ]
                }
            ],
            properties : 
            [
                "openFile",
                "multiSelections"
            ]
        },
        (files : Array<string>) =>
        {
            if(files)
            {
                for(let i : number = 0; i != inputs.length; ++i)
                {
                    for(let k : number = 0; k != files.length; ++k)
                    {
                        if(inputs[i].file == files[k])
                        {
                            files.splice(k,1);
                            console.log("Removed "+files[k]);
                        }
                    }
                }
                for(let i : number = 0; i != files.length; ++i)
                {
                    inputs.push(new inputFile(files[i]));
                }
                inputs.sort
                (
                    (a : inputFile,b : inputFile) : number =>
                    {
                       //return comparePanCakeDayDateString(a.file,b.file);
                       var res : number = comparePanCakeDayDateString(a.file,b.file);
                       console.log("Compare "+a.json.date+" "+b.json.date+" = "+res);
                       return res;
                    }
                );
            }
        }
    );
}