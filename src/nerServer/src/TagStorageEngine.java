package src;
import java.util.*;
import java.io.*;
public class TagStorageEngine
{
    public native void SampleFunction1(String token);
    public TagStorageEngine()
    {
        String cwd = "";
        try
        {
            cwd = new File(".").getCanonicalPath()+File.separator;
        }
        catch(IOException e){}
        System.load(cwd+"libtagStorageEngine.so");
    }
}