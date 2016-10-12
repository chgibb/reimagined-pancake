var Chart = require("chart.js");
import createDefaultLineChartSettings from "./req/lineChartSettings";
import * as request from "./req/makeRequest";
var canvas : HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myChart");
var ctx : CanvasRenderingContext2D  = canvas.getContext("2d");
var dataSet = createDefaultLineChartSettings();
dataSet.data = <Array<number>>[];
/*
var data = 
{
    labels : ["","2016 Jan 01 01 01 00","","", "February", "March", "April", "May", "June", "July"],
    datasets : 
    [
        dataSet
    ]
};
var myLineChart = new Chart
(
    ctx,
    {
        type: 'line',
        data: data
    }
);*/
var lineChart : any;
var data = 
{
    labels : <Array<string>>[],
    datasets : [dataSet]
}

/*request.makeRequest
(
    {
        dataPoint : "sentiment",
        month : "Oct"
    },
    function(response : string,params : request.requestParams)
    {
        var res : Array<any> = JSON.parse(response);
        data.labels = [];
        dataSet.data = [];
        for(let i : number = 0; i != res.length; ++i)
        {
            data.labels.push(res[i].date);
            dataSet.data.push(res[i].sentiment);
            
        }
        lineChart = new Chart
(
    ctx,
    {
        type: 'line',
        data: data
    }
);
    }
);*/
console.log("hello world");