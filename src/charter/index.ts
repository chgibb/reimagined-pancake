//declare var Plotly : any;

import inputFile from "./req/inputFile";
import refreshChart from "./req/refreshChart";
import showInputDialog from "./req/inputDataFiles";
var $ = require("jquery");
var inputs : Array<inputFile> = new Array<inputFile>(); 
/*inputs.push(new inputFile("resources/app/2016Oct16.json"));
inputs.push(new inputFile("resources/app/2016Oct17.json"));
inputs.push(new inputFile("resources/app/2016Oct18.json"));
inputs.push(new inputFile("resources/app/2016Oct19.json"));
inputs.push(new inputFile("resources/app/2016Oct20.json"));*/
function refreshChartWithInputs() : void
{
    refreshChart("chartView",inputs,$("#nerFilterBox").val());
}

$
(
    function()
    {
        refreshChartWithInputs();
    }
);
$(window).on
(
    "resize",
    ()=>
    {
        refreshChartWithInputs();
    }
);
$("#dataInput").click
(
    (event : {target:{id:string}})=>
    {
        if(!event || !event.target || !event.target.id)
            return;
        if(event.target.id == "refreshChart")
            refreshChartWithInputs();
        if(event.target.id == "inputJSON")
        {
            showInputDialog(inputs);
            refreshChartWithInputs();
        }
    }
);