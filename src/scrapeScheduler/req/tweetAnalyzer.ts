import dataStore from './../../req/dataStore';
import dataStoreMgr from './../../req/dataStoreMgr';
import tweetStoreMgr from './../../twitterScraper/req/tweetStoreMgr';
import tweet from './../../twitterScraper/req/tweet';
import decomposedTweetDate from './../../twitterScraper/req/decomposedTweetDate';
var sentiment = require('sentiment');
class tweetAnalyzer extends tweetStoreMgr
{
    constructor()
    {
        super();
    }
    addToCachedStore(name : string,arr : Array<tweet>) : void
    {
        for(let i : number = 0; i != this.stores.length; ++i)
        {
            if(this.stores[i].file == name)
            {
                for(let k : number = 0; k != arr.length; ++k)
                {
                    for(let j : number = 0; j != this.stores[i].items.length; ++j)
                    {
                        if(arr[k].textHash == this.stores[i].items[j].textHash)
                        {
                            arr[k].text = "";
                        }
                    }
                }
                for(let k : number = 0; k != arr.length; ++k)
                {
                    if(arr[k].text != "")
                    {
                        arr[k].sentiment = sentiment(arr[k].text);
                        this.stores[i].items.push(arr[k]);
                    }
                }
                return;
            }
        }
    }
}
export default tweetAnalyzer;