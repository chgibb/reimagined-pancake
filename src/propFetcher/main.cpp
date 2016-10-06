/*
    Usage:
        propFetcher fileName propName
        Writes matching values to stdout and prints total matches as "***TOTALPROPSFOUND*** $totalMatches"
        Each value will be wrapped in unescaped quotes
        All quotes internal to the value will be escaped
*/
#include <iostream>
#include <vector>
#include <fstream>
#include "inc/streamToArray.hpp"
using namespace std;

/*
    fileName is the file to read,
    propName is the property name to search for
    out is the stream to output results to
    returns total number of found properties
    format may either be "" to indicate quoted strings or JSON to indicate output as a JSON array

    Searches for patterns of "propName" "value"
    Will output value of "value" (without quotes) to out
    Not necessarily just for JSON
    Does not validate format of supplied file

*/
std::ofstream log("log",std::ios::out | std::ios::app);
template<class T>
int printValueOfPropertysInJSON(std::string fileName,std::string propName,T&out,std::string format = "")
{
    std::ifstream file(fileName.c_str(),std::ios::in);
    if(file.fail())
    {
        log<<"Could not open "<<fileName<<std::endl;
        return -1;
    }
    char byte;
    std::string str;
    bool endOfProp = false;
    bool foundProp = false;
    int res = 0;
    log<<"opened "<<fileName<<std::endl;
    while(file.get(byte))
    {
        switch(byte)
        {
            case '\"':
                for(;;)
                {
                    file.get(byte);
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
                        if(format == "")
                        {
                            //out<<"\""<<str<<"\"";
                            out<<"\""<<str<<"\"";
                        }
                        else if(format == "JSON" || format == "json")
                        {

                        }
                        foundProp = false;
                        res ++;
                    }
                    //found property we're lookinf for
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
    log<<"closed "<<fileName<<std::endl;
    return res;
}
int main(int argc,char*argv[])
{
    if(!argv[1] && ! argv[2])
        return 1;
    if(argv[3])
    {
        //output as JSON formatted text to stdout
        if(std::string(argv[3]) == "JSON" || std::string(argv[3]) == "json")
        {
            ::streamToArray<std::string> stream;
            int res = printValueOfPropertysInJSON<::streamToArray<std::string>>(argv[1],argv[2],stream);
            if(res == -1)
                return 1;
            if(stream.arr.size())
            {
                std::cout<<"{\n";
                std::cout<<"\"type\" : \""<<argv[2]<<"\",\n";
                std::cout<<"\"items\" : [\n";
                auto end = stream.arr.end();
                for(auto iter = stream.arr.begin(); iter != end; ++iter)
                {
                    if(*iter != "\"")
                    {
                        std::cout<<"\""<<*iter<<"\"";
                            if(iter + 2 != end)
                                std::cout<<",\n";
                            else
                                std::cout<<"\n";
                    }
                }
                std::cout<<"]\n";
                std::cout<<"}\n";
            }
        }

    }
    else
    {
        int res = printValueOfPropertysInJSON<decltype(std::cout)>(argv[1],argv[2],std::cout);
        if(res == -1)
            return 1;
        else
            std::cout<<res;
    }
    log<<"returned "<<std::endl;
    return 0;
}
