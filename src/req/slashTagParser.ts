import * as fs from "fs";
interface nerTaggedItem
{
    token : string;
    entity : string;
}
interface learnedNERTag extends nerTaggedItem
{
    regex : RegExp;
}
export function makeLearnedTagRegex(token : string) : RegExp
{
    return new RegExp("\\b"+escapeStringRegexp(token)+"\\b","i");
}
function makeLearnedTagRegexs(tags : Array<learnedNERTag>) : void
{
    for(let i : number = 0; i != tags.length; ++i)
    {
        tags[i].regex = makeLearnedTagRegex(tags[i].token);
    }
}
var learnedTagsPath : string = "classifiers/learnedTags.json";
var blackListTagsPath : string = "classifiers/learnedBlackList.json";
var jsonFile = require('./../jsreq/jsonfile');
var escapeStringRegexp : (input : string) => string;// =  require("escape-string-regexp");

var organization : RegExp = new RegExp("\\/ORGANIZATION","i");
var person : RegExp = new RegExp("\\/PERSON","i");
var location : RegExp = new RegExp("\\/LOCATION","i");
var nothing : RegExp =  new RegExp("(\\/O)","i");
export var splitTokens : RegExp = new RegExp("(\\s)|(\\n)|( )","i");
export var learnedTags : Array<learnedNERTag> = new Array<learnedNERTag>();
var blackListedTags : Array<learnedNERTag> = new Array<learnedNERTag>();
function init()
{
    try
    {
        blackListedTags = jsonFile.readFileSync(blackListTagsPath);
        makeLearnedTagRegexs(blackListedTags);
    }
    catch(err)
    {
        console.log(err);
        blackListedTags = new Array<learnedNERTag>();
    }
    try
    {
        learnedTags = jsonFile.readFileSync(learnedTagsPath);
        for(let i : number = 0; i != learnedTags.length; ++i)
        {
            if(isOnBlackList(learnedTags[i].token))
            {
                learnedTags.splice(i,1);
                break;
            }
        }
        makeLearnedTagRegexs(learnedTags);
    }
    catch(err)
    {
        console.log(err);
        learnedTags = new Array<learnedNERTag>();
    }
}

function isOnBlackList(tag : string) : boolean
{
    for(let i : number = 0; i != blackListedTags.length; ++i)
    {
        if(blackListedTags[i].regex.test(tag))
        {
            return true;
        }
    }
    return false;
}
function addNewLearnedTag(tag : nerTaggedItem) : void
{
    if(isOnBlackList(tag.token))
        return;
    for(let i : number = 0; i != learnedTags.length; ++i)
    {
        if(learnedTags[i].token == tag.token)
            return;
    }
    learnedTags.push
    (
        {
            token : tag.token,
            entity : tag.entity,
            regex : makeLearnedTagRegex(tag.token)
        }

    );
}
export function testForLearnedTag(item : string) : nerTaggedItem
{
    var res : nerTaggedItem = undefined;
    for(let i : number = 0; i != learnedTags.length; ++i)
    {
        if(learnedTags[i].regex.test(item))
        {
            res = 
            {
                token : item,
                entity : learnedTags[i].entity,
            }
            return res;
        }
    }
    return undefined;
}
export function saveLearnedTags() : void
{
    try
    {
        jsonFile.writeFileSync(learnedTagsPath,learnedTags,{spaces:4});
    }
    catch(err){console.log(err);}
}
export function parseSlashTags(slashString : string) : Array<nerTaggedItem>
{
    var res : Array<nerTaggedItem> = new Array<nerTaggedItem>();
    var tmp : Array<string> = slashString.split(splitTokens);
    for(let i : number = 0; i != tmp.length; ++i)
    {
        var token : string = "";
        var tmpToken : string = "";
        if(organization.test(tmp[i]))
        {
            tmpToken = tmp[i].replace(organization,"");
            if(!isOnBlackList(tmpToken))
                res.push({token:tmpToken,entity:"organization"});
            continue;
        }
        if(person.test(tmp[i]))
        {
            tmpToken = tmp[i].replace(person,"");
            if(!isOnBlackList(tmpToken))
                res.push({token:tmpToken,entity:"person"});
            continue;
        }
        if(location.test(tmp[i]))
        {
            tmpToken = tmp[i].replace(location,"");
            if(!isOnBlackList(tmpToken))
                res.push({token:tmpToken,entity:"location"});
            continue;
        }
    }
    for(let i : number = 0; i != res.length; ++i)
    {
        addNewLearnedTag(res[i]);
    }
    for(let i : number = 0; i != tmp.length; ++i)
    {
        if(tmp[i] && nothing.test(tmp[i]))
        {
            var tmpToken : string = tmp[i].replace(nothing,"");
            var learnedTag : nerTaggedItem = testForLearnedTag(tmpToken);
            if(learnedTag)
                res.push(learnedTag);
        }
    }
    for(let i : number = 0; i != res.length; ++i)
    {
        if(isOnBlackList(res[i].token))
        {
            res.splice(i,1);
            i--;
        }
    }
    return res;
}
init();
