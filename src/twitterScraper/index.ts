//twitter api
var Twit = require('twit');
//cli arg parser
var argv = require('minimist')(process.argv.slice(2));

//json loader
var jsonFile = require('./../jsreq/jsonfile.js');

var apiAuthStore : authStore;
try
{

    //load api keys 
    apiAuthStore = jsonFile.readFileSync('keys.json');
}
catch(err)
{
    console.log("No keys.json file is present");
    console.log("File must be of format: ");
    console.log("{");
    console.log("   \"consumerKey\" : \"\",");
    console.log("   \"consumerSecret\" : \"\",");
    console.log("   \"requestToken\" : \"\",");
    console.log("  \"requestTokenSecret\" : \"\",");
    console.log("   \"accessToken\" : \"\",");
    console.log("   \"accessTokenSecret\" : \"\"");
    console.log("}");
    process.exit(1);
}

var sleep = require('./../jsreq/sleep.js');

//originally convieved for unit testing
//forces async calls to be sync by spinning the event loop until completion
//used to wait for twitter responses before trying to process data
var assert = require('./../jsreq/assert.js');

//wrapper over twit's Twit.get
import * as retrieve from './req/retrieveTweets';
import tweet from './req/tweet';
import dataStore from './../req/dataStore';
import tweetStoreMgr from './req/tweetStoreMgr';
//parsed tweet date
import decomposedTweetDate from './req/decomposedTweetDate';

//create dir if it doesnt exist
import verifyDir from './../req/verifyDir';
//create json skeleton in file if it doesnt exist
import verifyJSONFile from './../req/verifyJSONFile';
//save tweet store to file
//bins tweets based on published date and excludes duplicates by bin
import saveTweetsFromStore from './req/saveTweetsFromStore';
//wrapper over retrieve
import submitQuery from './req/submitQuery';

//directory to store tweets into
var dataDir : string = argv.dataDir;
if(!dataDir)
{
    console.log("must specify storage directory");
    process.exit(1);
}

var T = new Twit
(
    {
        consumer_key : apiAuthStore.consumerKey,
        consumer_secret : apiAuthStore.consumerSecret,
        app_only_auth : true
    }
);

var tweetSaveMgr : tweetStoreMgr = new tweetStoreMgr();

//all queries to execute
var queries : Array<string>;
//user can specify a group of queries to always execute in defaultQueries.json
try
{
    queries = jsonFile.readFileSync('defaultQueries.json');
}
catch(err)
{
    queries = new Array<string>();
}

//add queries specified off the command line to execute as well as the defaultQueries
for(let i : number = 0; i != argv._.length; ++i)
{
    queries.push(argv._[i]);
}


var stores : Array<dataStore<tweet,decomposedTweetDate>> = new Array<dataStore<tweet,decomposedTweetDate>>(queries.length);
for(let i : number = 0; i != stores.length; ++i)
{
    stores[i] = new dataStore<tweet,decomposedTweetDate>();
}

//execute all queries async
for(let i : number = 0; i != queries.length; ++i)
{
    assert.assert(()=>{
        submitQuery(T,stores[i],queries[i],"mixed");
        return true;
    },'');
}

//save query results to disc synchronously after all queries have completed
for(let i : number = 0; i != queries.length; ++i)
{
    assert.assert(()=>{
        saveTweetsFromStore(tweetSaveMgr,stores[i],dataDir);
        stores[i] = null;
        return true;
    },'',0);
}
//Twit likes to fail silently occasionally. There's a PR addressing the issue but the repo appears abandoned.
//This will reduce the number of running events every 20 seconds. Allowing us to abort async operations and continue on.
setInterval(()=>{
    assert.runningEvents -= 1;
},20000);

assert.runAsserts();

