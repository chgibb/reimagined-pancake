export interface formattedStreamPipe
{
    write : (data : string) => void;
    flush : () => void;
    close : () => void;
}
export abstract class formattedStream
{
    public stream : formattedStreamPipe
    constructor(stream : formattedStreamPipe)
    {
        this.stream = stream;
    }
    public abstract writeHeader() : void;
    public abstract write(data : string) : void;
    public abstract writeLast(data : string) : void;
    public abstract writeEnd() : void;
}
