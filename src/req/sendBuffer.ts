export class buffer
{
    uuid : string;
    content : string;
    constructor(uuid : string)
    {
        this.uuid = uuid;
        this.content = "";
    }
}
var buffers : Array<buffer> = new Array<buffer>();
export function addToBuffer(uuid : string, content : string) : boolean
{
    for(let i : number = 0; i != buffers.length; ++i)
    {
        if(buffers[i].uuid == uuid)
        {
            buffers[i].content += content;
            return true;
        }
    }
    return false;
}
export function createNewBuffer(uuid : string) : void
{
    buffers.push(new buffer(uuid));
}
export function getBuffer(uuid : string) : buffer
{
    for(let i : number = 0; i != buffers.length; ++i)
    {
        if(buffers[i].uuid == uuid)
        {
            return buffers[i];
        }
    }
    return undefined;
}
export function removeBuffer(uuid : string) : void
{
    for(let i : number = 0; i != buffers.length; ++i)
    {
        if(buffers[i].uuid == uuid)
        {
            buffers.splice(i,1);
            return;
        }
    }
}