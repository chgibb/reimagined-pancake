package src;
public class GetRawTweets
{
    public native void loadBin(String bin);
    public native String getNextTweet();
    public GetRawTweets()
    {
        String cwd = "";
        try
        {
            cwd = new File(".").getCanonicalPath()+File.separator;
        }
        catch(IOException e){}
        System.load(cwd+"libgetRawTweets.so");
    }
}