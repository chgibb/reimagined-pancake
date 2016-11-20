import {formattedStreamPipe} from "./formattedStream";
import {formattedStream} from "./formattedStream";
//class to stream a JSON file of aggregated data
//should be of the format:
/*
[
    {
        date : Full twitter utc time stamp as string,
        nerTags : [
            token,
            entity
        ]
    }
]
*/
export default class outFile extends formattedStream
{
    public writeHeader() : void
    {
        this.stream.write("[");
    }
    public write(data : string) : void
    {
        this.stream.write(data+",");
    }
    public writeLast(data : string) : void
    {
        this.stream.write(data);
    }
    public writeEnd() : void
    {
        this.stream.write("]");
        this.stream.flush();
    }    
}