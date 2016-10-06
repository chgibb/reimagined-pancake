import threadStore from './threadStore';
import thread from './thread';
import decomposedPrawDate from './praw/decomposedPrawDate';

class threadStoreMgr
{
    stores : Array<threadStore>;
    constructor()
    {
        this.stores = new Array<threadStore>();
    }
    cache(file : string,date : decomposedPrawDate) : void
    {
        if(!this.stores)
            this.stores = new Array<threadStore>();
        this.stores.push(new threadStore(file,date));
    }
    createNewStore(file : string,date : decomposedPrawDate)
    {
        this.stores.push(new threadStore("",date));
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
    addToCachedStore(name : string,arr : Array<thread>) : void
    {
        for(let i : number = 0; i != this.stores.length; ++i)
        {
            if(this.stores[i].file == name)
            {
                for(let k : number = 0; k != arr.length; ++k)
                {
                    for(let j : number = 0; j != this.stores[i].threads.length; ++j)
                    {
                        if(arr[k].titleTextHash == this.stores[i].threads[j].titleTextHash)
                        {
                            arr[k].title = "";
                        }
                    }
                }
                for(let k : number = 0; k != arr.length; ++k)
                {
                    if(arr[k].title != "")
                        this.stores[i].threads.push(arr[k]);
                }
                return;
            }
        }
    }
    addThreadToCachedStore(name : string, thrid : thread) : void
    {
        this.addToCachedStore(name,new Array<thread>(thrid));
    }
}
export default threadStoreMgr;