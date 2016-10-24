//var Plotly = require("plotly");
declare var Plotly : any;
import * as fs from "fs";
import inputFile from "./req/inputFile";
import refreshChart from "./req/refreshChart";
var $ = require("jquery");
$
(
  function()
  {
    console.log("Loading data");



refreshChart
(
  "chartView",
  <Array<inputFile>>[
    new inputFile("resources/app/2016Oct16.json"),
    new inputFile("resources/app/2016Oct17.json"),
    new inputFile("resources/app/2016Oct18.json"),
    new inputFile("resources/app/2016Oct19.json"),
    new inputFile("resources/app/2016Oct20.json")
  ],new RegExp("RT","i")
);
console.log("done");

});