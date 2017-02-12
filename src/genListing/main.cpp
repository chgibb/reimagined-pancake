#include <iostream>
#include <vector>
#include <fstream>
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
    path.push_back(new Minute());
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
        if(argv[3] && argc >= 3)
        {
            if(path[2]->get() != argv[3])
                return 0;
        }
        if(argv[4] && argc >= 4)
        {
            if(path[3]->get() != argv[4])
                return 0;
        }
        if(argv[5] && argc >= 5)
        {
            if(path[4]->get() != argv[5])
                return 0;
        }
        if(argv[6] && argc >= 6)
        {
            if(path[PATH_MINUTE]->get() != argv[6])
                return 0;
        }
        if(canRead(composePathString(path)))
        {
            std::cout<<composePathString(path)<<"\n";
            std::cout.flush();
        }
        path[6]->increment();
    }
    return 0;
}
