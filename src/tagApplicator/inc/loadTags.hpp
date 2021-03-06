#pragma once
#include <vector>
#include <string>
#include <fstream>

#include "../rapidjson/include/rapidjson/document.h"
#include "../rapidjson/include/rapidjson/istreamwrapper.h"

#include "../../inc/Tag.hpp"
/*
    Assumes that the json file identified by tagsPath is output by binTagger.js
    i.e. of the form
    [
        {
            "token" : "",
            "entity" : "",
            "regex" : {}
        },
        //etc
    ]
*/
bool loadTags(std::string tagsPath,std::vector<Tag>&store)
{
    std::ifstream tagsFilePath(tagsPath);
    rapidjson::IStreamWrapper tagsFileStream(tagsFilePath);
    rapidjson::Document tags;
    tags.ParseStream(tagsFileStream);
    if(tags.HasParseError())
    {
        std::cout<<tags.GetParseError()<<"\n";
        return false;
    }
    for(auto it = tags.Begin(); it != tags.End(); ++it)
    {
        store.push_back
        (
            Tag
            (
                (*it)["token"].GetString(),
                (*it)["entity"].GetString()
            )
        );
    }
    return true;
}
