var express = require("express");
var bodyParser = require("body-parser");
var app = express();

import * as buff from "./req/sendBuffer";

var JobMgr = require('./../jsreq/JobMgr');
var sha256 = require('./../jsreq/sha256.min.js');

JobMgr.maxJobs = 1;
var port = 8080;

app.use("/public",express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

app.get('/', function(req : any, res : any)
{
    console.log(process.cwd());
	res.sendFile(process.cwd()+'/index.html');
});

router.route('/search').post
(
    function(req : any,res : any)
    {
        //console.log(JSON.stringify(req));
    }
).get
(
    function(req : any,res : any)
    {
        var uuid : string = "";
        uuid += sha256(JSON.stringify(req.query));
        uuid +=(Math.random()*1000).toString();
        var args : Array<string> = new Array<string>();
        args.push("queryBins");
        args.push("--dataDir=data");
        if(req.query.dataPoint)
            args.push("--dataPoint="+req.query.dataPoint);
        if(req.query.tagFilter)
            args.push("--tagFilter="+req.query.tagFilter);
        if(req.query.filterType)
            args.push("--filterType="+req.query.filterType);
        if(req.query.year)
            args.push("--year="+req.query.year);
        if(req.query.month)
            args.push("--month="+req.query.month);
        if(req.query.day)
            args.push("--day="+req.query.day);
        if(req.query.hour)
            args.push("--hour="+req.query.hour);
        if(req.query.minute)
            args.push("--minute="+req.query.minute);
        JobMgr.addJob
        (
            "node",
            args,
            "",true,
            queryCallBack,
            {res:res,uuid:uuid}
        );
        console.log(req.query);
    }
);
var queryCallBack : any = 
{
    send : function(channel : any,args : any)
    {
        if(args.retCode != undefined)
        {
            setTimeout(function(){
            console.log(buff.getBuffer(args.extraData.uuid).content);
            args.extraData.res.send(buff.getBuffer(args.extraData.uuid).content);
            buff.removeBuffer(args.extraData.uuid);},1000);
            //return;
        }
        //args.extraData.res.send(args.unBufferedData);
        //console.log(args.unBufferdData);
        if(!buff.addToBuffer(args.extraData.uuid,args.unBufferedData))
        {
            buff.createNewBuffer(args.extraData.uuid)
            buff.addToBuffer(args.extraData.uuid,args.unBufferedData);
        }
    }
}
app.use('/api',router);
app.listen(port);
var jobRunner : NodeJS.Timer = setInterval
(
    ()=>
    {
        JobMgr.runJobs();
    },200
);
