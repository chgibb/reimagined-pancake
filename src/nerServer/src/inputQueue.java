package src;
import java.util.concurrent.*;
import java.util.ArrayList;
import java.lang.Thread;

import edu.stanford.nlp.ie.crf.*;
import edu.stanford.nlp.ie.*;
import edu.stanford.nlp.ling.CoreLabel;
import edu.stanford.nlp.ling.CoreAnnotations.AnswerAnnotation;
import edu.stanford.nlp.util.StringUtils;
public class inputQueue extends Thread
{
    private TagStorageEngine tagEngine;
    private SlashTagParser slashTagParser;
    public inputQueue(String[] args)
    {
        super();
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
        this.tagEngine = new TagStorageEngine();
        this.tagEngine.setStorageDirectory(learnedClassifierDirectory);
        this.slashTagParser = new SlashTagParser();
        String serializedClassifier = trainedClassifier;
        this.classifier = CRFClassifier.getClassifierNoExceptions(serializedClassifier);
        System.out.flush();
        System.out.println("@DONE@");
        System.out.flush();
    }
    AbstractSequenceClassifier classifier;
    public ConcurrentLinkedQueue<String> queue = new ConcurrentLinkedQueue<String>();
    public void run()
    {
        String in = "";
        for(;;)
        {
            in = this.queue.poll();
            if(in != null)
            {
                String slashString = classifier.classifyToString(in.replaceAll("\\uFFFD",""),"slashTags",false);
                ArrayList<String> tags = this.slashTagParser.parseSlashTags(slashString);
                for(int i = 0; i != tags.size(); i += 2)
                    tagEngine.storeTag(tags.get(i),tags.get(i+1));
                System.out.println("@DONE@");
                System.out.flush();
            }
        }
    }
}
