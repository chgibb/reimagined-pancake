#include <iostream>
#include <vector>
#include <fstream>
#ifdef __WIN32
//Adapted from answer by cMinor
//http://stackoverflow.com/questions/12975341/to-string-is-not-a-member-of-std-says-g-mingw
    #include <cstdlib>
    #include <string>
    #include <sstream>
    namespace std
    {
        template<class T>
        std::string to_string(const T&n)
        {
            std::ostringstream ostrstrm;
            ostrstrm<<n;
            return ostrstrm.str();
        }
        int stoi(std::string str)
        {
            return std::atoi(str.c_str());
        }
    }
#endif
#include "inc/DataDir.hpp"
#include "inc/Year.hpp"
#include "inc/Month.hpp"
#include "inc/Day.hpp"
#include "inc/Hour.hpp"
#include "inc/Minute.hpp"
#include "inc/ComposePathString.hpp"
#include "inc/canRead.hpp"

#define ARG_DATADIR 1
#define ARG_YEAR 2
#define ARG_MONTH 3
#define ARG_DAY 4
#define ARG_HOUR 5
#define ARG_MINUTE 6
#define ARG_SECOND 7

#define PATH_DATADIR 0
#define PATH_YEAR 1
#define PATH_MONTH 2
#define PATH_DAY 3
#define PATH_HOUR 4
#define PATH_MINUTE 5
#define PATH_SECOND 6
using namespace std;

int main(int argc,char*argv[])
{
    const char hexDigits[] = {
        '0','1','2','3','4','5','6','7','8','9',
        'a','b','c','d','e','f'
        };
    std::vector<PathComponent*> path;
    if(argv[ARG_DATADIR] && argc >= ARG_DATADIR )
        path.push_back(new DataDir(argv[ARG_DATADIR]));
    else
        path.push_back(new DataDir("data"));
    if(argv[ARG_YEAR] && argc >= ARG_YEAR )
        path.push_back(new Year(std::stoi(argv[ARG_YEAR])));
    else
        return 1;
    if(argv[ARG_MONTH] && argc >= ARG_MONTH )
        path.push_back(new Month(argv[ARG_MONTH]));
    else
        path.push_back(new Month(1));
    if(argv[ARG_DAY] && argc >= ARG_DAY )
        path.push_back(new Day(std::stoi(argv[ARG_DAY])));
    else
        path.push_back(new Day(1));
    if(argv[ARG_HOUR] && argc >= ARG_HOUR )
        path.push_back(new Hour(std::stoi(argv[ARG_HOUR])));
    else
        path.push_back(new Hour());
    if(argv[ARG_MINUTE] && argc >= ARG_MINUTE)
        path.push_back(new Minute(std::stoi(argv[ARG_MINUTE])));
    else
        path.push_back(new Minute());
    if(argv[ARG_SECOND] && argc >= ARG_SECOND)
        path.push_back(new Minute(std::stoi(argv[ARG_SECOND])));
    else
        path.push_back(new Minute());

    std::string composedPathString = "";
    for(;;)
    {
        if(path[PATH_YEAR]->hasOverFlowed())
            return 0;
        if(path[PATH_SECOND]->hasOverFlowed())
        {
            path[PATH_MINUTE]->increment();
        }
        if(path[PATH_MINUTE]->hasOverFlowed())
        {
            path[PATH_HOUR]->increment();
        }
        if(path[PATH_HOUR]->hasOverFlowed())
        {
            path[PATH_DAY]->increment();
        }
        if(path[PATH_DAY]->hasOverFlowed())
        {
            path[PATH_MONTH]->increment();
        }
        if(path[PATH_MONTH]->hasOverFlowed())
        {
            path[PATH_YEAR]->increment();
        }
        if(argv[ARG_MONTH] && argc >= ARG_MONTH)
        {
            if(path[PATH_MONTH]->get() != argv[ARG_MONTH])
                return 0;
        }
        if(argv[ARG_DAY] && argc >= ARG_DAY)
        {
            if(path[PATH_DAY]->get() != argv[ARG_DAY])
                return 0;
        }
        if(argv[ARG_HOUR] && argc >= ARG_HOUR)
        {
            if(path[PATH_HOUR]->get() != argv[ARG_HOUR])
                return 0;
        }
        if(argv[ARG_MINUTE] && argc >= ARG_MINUTE)
        {
            if(path[PATH_MINUTE]->get() != argv[ARG_MINUTE])
                return 0;
        }
        if(argv[ARG_SECOND] && argc >= ARG_SECOND)
        {
            if(path[PATH_SECOND]->get() != argv[ARG_SECOND])
                return 0;
        }
        composedPathString = ::composePathString(path);
        std::string modPathString = "";
        for(int i = 0; i != 16; ++i)
        {
            modPathString = composedPathString;
            modPathString += hexDigits[i];
            if(canRead(modPathString))
                std::cout<<modPathString<<std::endl;
        }
        //keep backwards compatibility with old binning method
        modPathString = composedPathString;
        modPathString += "tweets.json";
        if(canRead(modPathString))
            std::cout<<modPathString<<std::endl;
        path[6]->increment();
    }
    return 0;
}
