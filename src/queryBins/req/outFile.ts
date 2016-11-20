import {formattedStreamPipe} from "./formattedStream";
import {formattedStream} from "./formattedStream";
//class to stream a newline delimited JSON file of aggregated data
export default class outFile extends formattedStream
{
    public writeHeader() : void
    {
    }
    public write(data : string) : void
    {
        this.stream.write(data);
    }
    public writeLast(data : string) : void
    {
        this.write(data);
    }
    public writeEnd() : void
    {
        this.stream.flush();
    }    
}