import edu.stanford.nlp.ie.crf.*;
import edu.stanford.nlp.ie.*;
import edu.stanford.nlp.ling.CoreLabel;
import edu.stanford.nlp.ling.CoreAnnotations.AnswerAnnotation;
import edu.stanford.nlp.util.StringUtils;

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
            }
        }
        tagEngine = new TagStorageEngine();
        tagEngine.setStorageDirectory(learnedClassifierDirectory);
        slashTagParser = new SlashTagParser();
        String serializedClassifier = trainedClassifier;
        classifier = CRFClassifier.getClassifierNoExceptions(serializedClassifier);
    }
}
