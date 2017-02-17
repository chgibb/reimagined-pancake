import tweet from './tweet';
import tweetStoreMgr from './tweetStoreMgr';
import dataStore from './dataStore';
import decomposedTweetDate from './decomposedTweetDate';
import verifyDir from './verifyDir';
import verifyJSONFile from './verifyJSONFile';
export default function saveTweetsFromStore(mgr : tweetStoreMgr,store : dataStore<tweet,decomposedTweetDate>,rootDir : string) : void
{
    verifyDir(rootDir);
    for(var i : number = 0; i != store.items.length; ++i)
    {
        verifyDir(rootDir);
        verifyDir(rootDir+"/"+store.items[i].year);
        verifyDir(rootDir+"/"+store.items[i].year+"/"+store.items[i].month);
        verifyDir(rootDir+"/"+store.items[i].year+"/"+store.items[i].month+"/"+store.items[i].day);
        verifyDir(rootDir+"/"+store.items[i].year+"/"+store.items[i].month+"/"+store.items[i].day+"/"+store.items[i].hour);
        verifyDir(rootDir+"/"+store.items[i].year+"/"+store.items[i].month+"/"+store.items[i].day+"/"+store.items[i].hour+"/"+store.items[i].minute);
        verifyDir(rootDir+"/"+store.items[i].year+"/"+store.items[i].month+"/"+store.items[i].day+"/"+store.items[i].hour+"/"+store.items[i].minute+"/"+store.items[i].second);
        
        var fileName = rootDir+"/"+store.items[i].year+"/"+store.items[i].month+"/"+store.items[i].day+"/"+store.items[i].hour+"/"+store.items[i].minute+"/"+store.items[i].second+"/"+store.items[i].textHash[0];
        verifyJSONFile(fileName);
        try
        {
            mgr.cache(fileName,new decomposedTweetDate(store.items[i].year,store.items[i].month,store.items[i].day,store.items[i].hour,store.items[i].minute,store.items[i].second));
        }
        catch(err)
        {
            mgr.createNewStore(fileName,new decomposedTweetDate(store.items[i].year,store.items[i].month,store.items[i].day,store.items[i].hour,store.items[i].minute,store.items[i].second));
        }
        mgr.addItemToCachedStore(fileName,store.items[i]);
        mgr.flush(fileName);
    }
}