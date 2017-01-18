import edu.stanford.nlp.ie.crf.*;
import edu.stanford.nlp.ie.*;
import edu.stanford.nlp.ling.CoreLabel;
import edu.stanford.nlp.ling.CoreAnnotations.AnswerAnnotation;
import edu.stanford.nlp.util.StringUtils;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.Scanner;
import java.util.concurrent.*;
import java.util.ArrayList;
import java.lang.Thread;

import src.*;

public class nerServer
{
    public static TagStorageEngine tagEngine;
    public static SlashTagParser slashTagParser;
    public static AbstractSequenceClassifier classifier;
    public static void main(String[] args) throws IOException 
    {
        String learnedClassifierDirectory = "";
        String trainedClassifier = "";
        String binList = "";
        for(int i = 0; i != args.length; ++i)
        {
            String[] split = args[i].split("=");
            for(int k = 0; k != split.length; ++k)
            {
                if(split[k].equals("--learnedClassifierDirectory"))
                {
                   learnedClassifierDirectory = split[k+1];
                }
                if(split[k].equals("--trainedClassifier"))
                {
                    trainedClassifier = split[k+1];
                }
                if(split[k].equals("--binList"))
                {
                    binList = split[k+1];
                }
            }
        }
        tagEngine = new TagStorageEngine();
        tagEngine.setStorageDirectory(learnedClassifierDirectory);
        slashTagParser = new SlashTagParser();
        String serializedClassifier = trainedClassifier;
        classifier = CRFClassifier.getClassifierNoExceptions(serializedClassifier);

        try
        {
            BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(binList)));
         
            String line = reader.readLine();
            while(line != null)
            {
                System.out.println(line);
                line = reader.readLine();
            }    
        }
        catch(FileNotFoundException e)
        {
            System.out.println("Could not find bin list "+binList);
        }
        catch(IOException e)
        {
            System.out.println("IOException while reading from bin list "+binList);
        }

    }
}
