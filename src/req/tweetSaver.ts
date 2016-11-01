import dataStore from './dataStore';
import dataStoreMgr from './dataStoreMgr';
import tweetStoreMgr from './tweetStoreMgr';
import tweet from './tweet';
import decomposedTweetDate from './decomposedTweetDate';
var sentiment = require('sentiment');
class tweetSaver extends tweetStoreMgr
{
    constructor()
    {
        super();
    }
    //no dup checking
    addToCachedStore(name : string,arr : Array<tweet>) : void
    {/*
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
        }*/
    }
}
export default tweetSaver;