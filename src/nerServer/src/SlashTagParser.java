package src;
import java.util.ArrayList;
public class SlashTagParser
{
    public SlashTagParser(){}
    public ArrayList<String> parseSlashTags(String slashString)
    {
        ArrayList<String> res = new ArrayList<String>();
        //Separate by whitespace
        String[] tokens = slashString.split("(\\s)|(\\n)|( )");
        //iterate whitespace delimited tokens
        for(int tokensIt = 0; tokensIt != tokens.length; ++tokensIt)
        {
            String entity = "";
            //reverse iterate each individual token to extract the entity type
            for(int stringIt = tokens[tokensIt].length()-1; stringIt != -1; --stringIt)
            {
                if(tokens[tokensIt].charAt(stringIt) != '/')
                    entity += tokens[tokensIt].charAt(stringIt);
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