//Named Entity Recognition Server.
//using Stanford Named Entity Recognizer to take in input text
//and output slash tagged output.
import edu.stanford.nlp.ie.crf.*;
import edu.stanford.nlp.ie.*;
import edu.stanford.nlp.ling.CoreLabel;
import edu.stanford.nlp.ling.CoreAnnotations.AnswerAnnotation;
import edu.stanford.nlp.util.StringUtils;

import com.sun.jna.Library;

import java.io.IOException;
import java.util.Scanner;

import src.*;

public class nerServer
{
  public static void main(String[] args) throws IOException 
  {
    Scanner scanner = new Scanner(System.in);
    inputQueue queue = new inputQueue();
    queue.start();
    for(;;)
    { 
      queue.queue.add(scanner.nextLine());
    }
  }
}
