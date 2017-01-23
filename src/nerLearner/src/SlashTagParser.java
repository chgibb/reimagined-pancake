package src;
import java.util.ArrayList;
public class SlashTagParser
{
    public SlashTagParser(){}
    /*
        Stanford NER returns a slash string of the format token/ENTITY
        Where ENTITY can be:
        O indicating the token is unrecognized
        PERSON
        LOCATION
        ORGANIZATION

        We want to parse out the entity types from their tokens.
        Will return an ArrayList where every i is the token and i + 1 is the ENTITY
        Converts O to the string NOTHING for readability
    */
    public ArrayList<String> parseSlashTags(String slashString)
    {
        ArrayList<String> res = new ArrayList<String>();
        //Separate by whitespace
        String[] tokens = slashString.split("(\\s)|(\\n)|( )");
        //iterate whitespace delimited tokens
        for(int tokensIt = 0; tokensIt != tokens.length; ++tokensIt)
        {
            String entity = "";
            //reverse iterate each individual token to extract the entity type.
            //this will set the value of entity to the reversed entity string
            for(int stringIt = tokens[tokensIt].length()-1; stringIt != -1; --stringIt)
            {
                //Have not found the end of the entity string yet
                if(tokens[tokensIt].charAt(stringIt) != '/')
                    entity += tokens[tokensIt].charAt(stringIt);
                //Found the end
                else
                {
                    if(entity.equals("O"))
                    {
                        res.add(tokens[tokensIt].substring(0,stringIt));
                        res.add("NOTHING");
                    }
                    else if(entity.equals("NOITACOL"))
                    {
                        res.add(tokens[tokensIt].substring(0,stringIt));
                        res.add("LOCATION");
                    }
                    else if(entity.equals("NOSREP"))
                    {
                        res.add(tokens[tokensIt].substring(0,stringIt));
                        res.add("PERSON");
                    }
                    else if(entity.equals("NOITAZINAGRO"))
                    {
                        res.add(tokens[tokensIt].substring(0,stringIt));
                        res.add("ORGANIZATION");
                    }
                }
            }
        }
        return res;
    }
}