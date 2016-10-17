export interface nerTagAverage
{
    token : string;
    entity : string;
    count : number;
    sentimentAverage : number;
}
export function considerNerTag(store : Array<nerTagAverage>,nerTag : nerTagAverage,sentiment : number) : boolean
{
    for(let i = 0; i != store.length; ++i)
    {
        if(store[i].token == nerTag.token)
        {
            store[i].count++;
            store[i].sentimentAverage += sentiment;
            return true;
        }
    }
    store.push
    (
        {
            token : nerTag.token,
            entity : nerTag.entity,
            count : 1,
            sentimentAverage : sentiment
        }
    );
    return false;
}