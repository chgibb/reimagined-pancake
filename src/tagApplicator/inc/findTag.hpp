#pragma once
#include <vector>
#include <utility>
#include <string>

#include <regex.h>

#include "../rapidjson/include/rapidjson/document.h"

#include "../../inc/Tag.hpp"
template<class Alloc>
void getTagsForTokens
(
    std::vector<Tag>&tags,
    std::vector<std::string>&tokens,
    std::vector<rapidjson::Value>&res,
    Alloc allocator
)
{
    auto tagsEnd = tags.end();
    auto tokensEnd = tokens.end();
    for(auto tagsIt = tags.begin(); tagsIt != tagsEnd; ++tagsIt)
    {
        for(auto tokensIt = tokens.begin(); tokensIt != tokensEnd; ++tokensIt)
        {
            if(::regexec(&tagsIt->reg,tokensIt->c_str(),0,NULL,0) == 0)
            {
                std::cout<<"Matched "<<tagsIt->token<<" to "<<*tokensIt<<"\n";
                rapidjson::Value obj;
                obj.SetObject();
                rapidjson::Value str;
                str.SetString(rapidjson::StringRef(tokensIt->c_str()));
                obj.AddMember("token",str,allocator);
                str.SetString(rapidjson::StringRef(tagsIt->entity.c_str()));
                obj.AddMember("entity",str,allocator);
                res.push_back(obj);
            }
        }
    }
}
