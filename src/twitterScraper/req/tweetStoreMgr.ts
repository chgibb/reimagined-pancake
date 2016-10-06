import dataStore from './../../req/dataStore';
import dataStoreMgr from './../../req/dataStoreMgr';
import tweet from './tweet';
import decomposedTweetDate from './decomposedTweetDate';

class tweetStoreMgr extends dataStoreMgr<dataStore<tweet,decomposedTweetDate>,tweet,decomposedTweetDate>
{
    stores : Array<dataStore<tweet,decomposedTweetDate>>
    contructor()
    {
        this.stores = new Array<dataStore<tweet,decomposedTweetDate>>();
    }
    cache(file : string,date : decomposedTweetDate) : void
    {
        if(!this.stores)
            this.stores = new Array<dataStore<tweet,decomposedTweetDate>>();
        this.stores.push(new dataStore<tweet,decomposedTweetDate>(file,date));
    }
    createNewStore(file : string,date : decomposedTweetDate) : void
    {
        this.stores.push(new dataStore<tweet,decomposedTweetDate>("",date));
        this.stores[this.stores.length-1].file = file;
    }
    flush(file : string) : void
    {
        for(let i : number = 0; i != this.stores.length; ++i)
        {
            if(this.stores[i].file == file)
            {
                this.stores[i].saveToFile();
                return;
            }
        }
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
                        this.stores[i].items.push(arr[k]);
                }
                return;
            }
        }
    }
    addItemToCachedStore(name : string,twiit : tweet) : void
    {
        this.addToCachedStore(name,new Array<tweet>(twiit));
    }

}
export default tweetStoreMgr;