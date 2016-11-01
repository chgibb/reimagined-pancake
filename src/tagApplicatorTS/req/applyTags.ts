import dataStore from './../../req/dataStore';
import tweet from './../../req/tweet';
import decomposedTweetDate from './../../req/decomposedTweetDate';
import * as slashTagParser from './../../req/slashTagParser';
export default function applyTags(bin : dataStore<tweet,decomposedTweetDate>) : void
{
    var removePunctuation : RegExp = new RegExp("(\n)|(\\n)|(,)|(\\.)|(\\?)|(!)","g");
    for(let i : number = 0; i != bin.items.length; ++i)
    {
        bin.items[i].nerTags = new Array();
        var tokens : Array<string> = bin.items[i].text.replace(removePunctuation," ").split(slashTagParser.splitTokens);
        for(let k : number = 0; k != slashTagParser.learnedTags.length; ++k)
        {
            for(let j : number = 0; j != tokens.length; ++j)
            {
                if(tokens[j] !== " " && tokens[j] !== undefined && slashTagParser.learnedTags[k].regex.test(tokens[j]))
                {
                    bin.items[i].nerTags.push
                    (
                        {
                            token : tokens[j],
                            entity : slashTagParser.learnedTags[k].entity
                        }
                    );
                }
            }
        }

    }

}