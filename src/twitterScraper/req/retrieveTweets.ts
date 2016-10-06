import dataStore from './../../req/dataStore';
import tweet from './tweet';
import decomposedTweetDate from './decomposedTweetDate';
var jsonFile = require('./../../jsreq/jsonfile.js');
var sha256 = require('./../../jsreq/sha256.min.js');
var sleep = require('./../../jsreq/sleep.js');
interface queryParams
{
    q : string;
    lang : string;
    count : number;
    result_type? : string;
}
export function retrieveTweets
(
    T : any, //Twit object
    q : queryParams,
    res : dataStore<tweet,decomposedTweetDate>,
    filter? : (item : tweet) => tweet,
    onComplete? : (data : any, filtered : dataStore<tweet,decomposedTweetDate>) => void
) : void
{ 
    T.get
    (
        'search/tweets',
        q,function(err : string,data : any,response : any)
        {
            if(err)
            {
                console.log(err);
                process.exit(1);
                //onComplete(undefined,undefined);
            }
            if(data)
            {
                for(var i in data.statuses)
                {
                    //sometimes twitter returns tweets that don't match the submitted lang code
                    if(data.statuses[i].lang == q.lang)
                    {
                        if(!res.items)
                            res.items = new Array<tweet>();
                        if(filter)
                        {
                            var modTweet : tweet = filter(new tweet(data.statuses[i].text,data.statuses[i].created_at));
                            if(modTweet)
                            {
                                modTweet.textHash = sha256(modTweet.text);
                                res.items.push(modTweet);
                            }
                        }
                        else if (!filter)
                        {
                            res.items.push(new tweet(data.statuses[i].text,data.statuses[i].created_at));
                            res.items[res.items.length-1].textHash = sha256(res.items[res.items.length-1].text);
                        }
                    }
                }
            }
            onComplete(data,res);
        }
    );
}
