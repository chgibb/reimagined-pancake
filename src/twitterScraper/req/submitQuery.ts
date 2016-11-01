import dataStore from './../../req/dataStore';
import tweet from './../../req/tweet';
import decomposedTweetDate from './../../req/decomposedTweetDate';
import * as retrieve from './retrieveTweets';
var assert = require('./../../jsreq/assert');

var mention : RegExp = new RegExp("@","g");
var hashTag : RegExp = new RegExp("#","g");
function submitQuery(T : any,storeObj : dataStore<tweet,decomposedTweetDate>,query : string,result_type : string) : void
{
    assert.runningEvents += 1;
    retrieve.retrieveTweets
    (
        T,
        {
            q : query,
            lang : 'en',
            result_type : result_type,
            count : 100,
        },
        storeObj,
        //filter
        function(item : tweet)
        {
            item.text = item.text.replace(mention,"");
            item.text = item.text.replace(hashTag,"");
            return item;
        },
        //onComplete
        function(data : any,filtered : dataStore<tweet,decomposedTweetDate>)
        {
            console.log("Completed query for "+query);
            assert.runningEvents -= 1;
        }
    );
}
export default submitQuery;