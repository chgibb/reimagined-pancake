#pragma once
#include <vector>
#include <string>
#include "PathComponent.hpp"
std::string composePathString(std::vector<PathComponent*>&pathComponent)
{
    std::string res = "";
    auto end = pathComponent.end();
    for(auto iter = pathComponent.begin(); iter != end; ++iter)
    {
        res += (*iter)->get();
        res += "/";
    }
    return res;
}
