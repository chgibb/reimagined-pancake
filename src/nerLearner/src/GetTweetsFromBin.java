package src;
import java.util.*;
import java.io.*;
public class GetTweetsFromBin
{
    public native boolean loadBin(String bin);
    public native void clearBin();
    public native String getTweet();
    public native int size();
    public native void pop();
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