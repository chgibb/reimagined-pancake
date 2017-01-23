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
import java.io.OutputStream;
import java.io.PrintStream;
import java.util.Scanner;
import java.util.concurrent.*;
import java.util.ArrayList;
import java.lang.Thread;


import src.*;

public class nerLearner
{
    public static TagStorageEngine tagEngine;
    public static SlashTagParser slashTagParser;
    public static GetTweetsFromBin tweetBin;
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
        tweetBin = new GetTweetsFromBin();
        String serializedClassifier = trainedClassifier;
        classifier = CRFClassifier.getClassifierNoExceptions(serializedClassifier);

        try
        {
            BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(binList)));
         
            String line = reader.readLine();

            //Start piping stderr to null from this point on.
            //This prevents Stanford-NER's unrecognized character warnings from being displayed.
            System.setErr
            (
                new PrintStream
                (
                    new OutputStream()
                    {
                        public void write(int b)
                        {
                        }
                    }
                )
            );
            while(line != null)
            {
                tweetBin.loadBin(line);
                String tweet = "";
                tweet = tweetBin.getTweet();
                while(!(tweet.equals("")))
                {
                    //regex based on answer by Giuseppe Ricupero
                    //http://stackoverflow.com/questions/33722024/how-to-remove-non-valid-unicode-characters-from-strings-in-java
                    String slashString = classifier.classifyToString(tweet.replaceAll("[^\\p{L}\\p{N}\\p{Z}\\p{Sm}\\p{Sc}\\p{Sk}\\p{Pi}\\p{Pf}\\p{Pc}\\p{Mc}]",""),"slashTags",false);
                    ArrayList<String> tags = slashTagParser.parseSlashTags(slashString);
                    for(int i = 0; i != tags.size(); i += 2)
                    {
                        if(!(tags.get(i+1).equals("NOTHING")))
                            tagEngine.storeTag(tags.get(i),tags.get(i+1));
                    }
                    tweetBin.pop();
                    tweet = tweetBin.getTweet();
                }
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
