package src;
import java.util.*;
import java.io.*;
public class tagStorageEngine
{
    public native void SampleFunction1();
    public tagStorageEngine()
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