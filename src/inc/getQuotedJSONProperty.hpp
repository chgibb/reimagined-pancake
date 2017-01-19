#pragma once
#include <functional>
/*
 This function is NOT a spec conformant JSON parser.
 Given an open file stream pointed to by file, it will look for occurences of the pattern
 "propName" "val" and pass the value of val to func.
 Returns the total number of occurences of "propName" on success. -1 on failure.
 Completely ignores just about every piece of structure that JSON provides. This makes it extremely fast but prone to odd
 output if used improperly.
*/
template<class OpenedFileStreamPtr>
int getQuotedJSONProperty
(
    OpenedFileStreamPtr file,
    std::string propName,
    const std::function<bool(std::string&)>&func = nullptr
)
{
    if(file->bad())
    {
        return -1;
    }
    char byte;
    std::string str;
    bool endOfProp = false;
    bool foundProp = false;
    int res = 0;
    while(file->get(byte))
    {
        switch(byte)
        {
            case '\"':
                for(;;)
                {
                    file->get(byte);
                    if(byte == '\"')
                    {
                        //escaped quote
                        if(str[str.length() - 1] == '\\')
                        {
                            str += byte;
                            continue;
                        }
                        else
                        {
                            endOfProp = true;
                            break;
                        }
                    }
                    str += byte;

                }
                //end of property
                if(endOfProp )
                {
                    //previous property found was the one that we're looking for
                    if(foundProp)
                    {
                        endOfProp = false;
                        bool fRes = false;
                        if(func)
                            fRes = func(str);
                        foundProp = false;
                        res++;
                        if(fRes)
                            return res;
                    }
                    //found property we're looking for
                    if(str == propName)
                    {
                        endOfProp = false;
                        foundProp = true;
                    }
                    str = "";
                }
            break;
        }
    }
    return res;
}