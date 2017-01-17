package src;
import java.util.*;
import java.io.*;
public class GetTweetsFromBin
{
    public native void loadBin(String bin);
    public native String getNextTweet();
    public GetTweetsFromBin()
    {
        String cwd = "";
        try
        {
            cwd = new File(".").getCanonicalPath()+File.separator;
        }
        catch(IOException e){}
        System.load(cwd+"libgetTweetsFromBin.so");
    }
}