#include <functional>
template<class OpenedFileStreamPtr>
int getQuotedJSONProperty
(
    OpenedFileStreamPtr file,
    std::string propName,
    const std::function<bool(std::string&)>&func = []()->bool{return false;}
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
                        bool fRes = func(str);
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
                        res++;
                    }
                    str = "";
                }
            break;
        }
    }
    return res;
}