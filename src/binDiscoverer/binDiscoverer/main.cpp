#include <iostream>
#include <vector>
#include "inc/DataDir.hpp"
#include "inc/Year.hpp"
#include "inc/Month.hpp"
#include "inc/Day.hpp"
#include "inc/Hour.hpp"
#include "inc/Minute.hpp"
#include "inc/ComposePathString.hpp"
#include "inc/canRead.hpp"
using namespace std;

int main(int argc,char*argv[])
{
    std::vector<PathComponent*> path;
    if(argv[1])
        path.push_back(new DataDir(argv[1]));
    else
        path.push_back(new DataDir("data"));
    if(argv[2])
        path.push_back(new Year(std::stoi(argv[2])));
    else
        return 1;
    if(argv[3])
        path.push_back(new Month(argv[3]));
    else
        return 1;
    if(argv[4])
        path.push_back(new Day(std::stoi(argv[4])));
    else
        path.push_back(new Day(1));
    path.push_back(new Hour());
    path.push_back(new Minute());
    path.push_back(new Minute());
    for(;;)
    {
        if(path[1]->hasOverFlowed())
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
        if(argv[3])
        {
            if(path[2]->get() != argv[3])
                return 0;
        }
        if(argv[4])
        {
            if(path[3]->get() != argv[4])
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
