import tweet from "./../../req/tweet";
import tweetStoreMgr from "./../../req/tweetStoreMgr";
const sentiment = require("sentiment");

export class ScrapedTweetAnalyzer extends tweetStoreMgr
{
    constructor()
    {
        super();
    }
    //Don't worry about deduping here
    addToCachedStore(name : string,arr : Array<tweet>) : void
    {
        for(let i : number = 0; i != this.stores.length; ++i)
        {
            if(this.stores[i].file == name)
            {
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
