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
    private TagStorageEngine tagEngine = new TagStorageEngine();
    private SlashTagParser slashTagParser = new SlashTagParser();
    public inputQueue()
    {
        super();
        String serializedClassifier = "classifiers/ner-eng-ie.crf-3-all2008.ser.gz";
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
                for(String i : tags)
                    System.out.println(i);
                //this.tagEngine.SampleFunction1(in);
                /*
                System.out.println(classifier.classifyToString(in.replaceAll("\\uFFFD",""),"slashTags",false));
                //Output is sometimes chunked. Output this piece of text to signal that the operation is complete to the client.
                System.out.println("@DONE@");
                System.out.flush();
                System.out.flush();
                System.out.flush();
                System.out.flush();
                System.out.flush();
                System.out.flush();
                */
            }
        }
    }
}
