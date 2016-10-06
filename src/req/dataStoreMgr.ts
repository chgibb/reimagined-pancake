abstract class dataStoreMgr<storeType,itemType,dateType>
{
    stores : Array<storeType>
    constructor(){}
    abstract cache(file : string,date : dateType) : void;
    abstract createNewStore(file : string,date : dateType) : void;
    abstract flush(file : string) : void;
    abstract addToCachedStore(name : string,arr : Array<itemType>) : void;
    abstract addItemToCachedStore(name : string,item : itemType) : void;
}
export default dataStoreMgr;