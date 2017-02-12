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
        return 1;
    if(argv[ARG_DAY] && argc >= ARG_DAY )
        path.push_back(new Day(std::stoi(argv[ARG_DAY])));
    else
        path.push_back(new Day(1));
    if(argv[ARG_HOUR] && argc >= ARG_HOUR )
        path.push_back(new Hour(std::stoi(argv[ARG_HOUR])));
    else
        path.push_back(new Hour());
    path.push_back(new Minute());
    path.push_back(new Minute());
    for(;;)
    {
        if(path[PATH_YEAR]->hasOverFlowed())
            return 0;
        if(path[6]->hasOverFlowed())
        {
            path[5]->increment();
        }
        if(path[5]->hasOverFlowed())
        {
            path[4]->increment();
        }
        if(path[4]->hasOverFlowed())
        {
            path[3]->increment();
        }
        if(path[3]->hasOverFlowed())
        {
            path[2]->increment();
        }
        if(path[2]->hasOverFlowed())
        {
            path[1]->increment();
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
        if(canRead(composePathString(path)))
        {
            std::cout<<composePathString(path)<<"\n";
            std::cout.flush();
        }
        path[6]->increment();
    }
    return 0;
}
