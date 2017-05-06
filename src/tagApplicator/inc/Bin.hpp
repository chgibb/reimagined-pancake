#pragma once
#include <vector>
#include <utility>
#include <string>
#include <fstream>
#include <locale>
#include <regex>
#include <regex.h>

#include <cstring>

#include "../rapidjson/include/rapidjson/document.h"
#include "../rapidjson/include/rapidjson/istreamwrapper.h"
#include "../rapidjson/include/rapidjson/ostreamwrapper.h"
#include "../rapidjson/include/rapidjson/prettywriter.h"

#include "../../tagStorageEngine/inc/TagStorageEngine.hpp"
class Bin
{
    public:
        std::string binPath;
        rapidjson::GenericDocument<rapidjson::UTF8<>> json;
        ::TagStorageEngine tagEngine;
        Bin(std::string binPath)
        {
            this->binPath = binPath;
            this->load();
        }
        Bin(){}
        bool load()
        {
            std::ifstream binPathFile(this->binPath);
            rapidjson::IStreamWrapper jsonFileStream(binPathFile);
            this->json.ParseStream(jsonFileStream);
            if(this->json.HasParseError())
            {
                return false;
            }
            return true;
        }
        bool load(std::string binPath)
        {
            this->binPath = binPath;
            return this->load();
        }
        void tokenizeText(std::string in,std::vector<std::string>&tokens)
        {
            std::regex charsToRemove("(\\n)|(\\.)|(,)|(\\t)");
            bool add = true;
            std::string str;
            size_t end = in.length();
            for(size_t it = 0; it != end; ++it)
            {
                add = true;
                if(in[it] == ' ')
                {
                    /*str.erase(std::remove(str.begin(),str.end(),'\n'),str.end());
                    str.erase(std::remove(str.begin(),str.end(),'.'),str.end());
                    str.erase(std::remove(str.begin(),str.end(),','),str.end());
                    str.erase(std::remove(str.begin(),str.end(),'\t'),str.end());*/
                    str = std::regex_replace(str.c_str(),charsToRemove,"");
                    if(str != "")
                        tokens.push_back(str);
                    str = "";
                    add = false;
                }
                if(in[it] == '\n')
                {
                    /*str.erase(std::remove(str.begin(),str.end(),'\n'),str.end());
                    str.erase(std::remove(str.begin(),str.end(),'.'),str.end());
                    str.erase(std::remove(str.begin(),str.end(),','),str.end());
                    str.erase(std::remove(str.begin(),str.end(),'\t'),str.end());*/
                    str = std::regex_replace(str.c_str(),charsToRemove,"");
                    if(str != "")
                        tokens.push_back(str);
                    str = "";
                    add = false;
                }
                if(add)
                    str += in[it];
            }
        }
        bool tagBin()
        {

            rapidjson::Document::AllocatorType& allocator = this->json.GetAllocator();
            std::regex charsToRemove("\\\\u0000");

            for(auto it = this->json["items"].Begin(); it != this->json["items"].End(); ++it)
            {
                (*it)["nerTags"].Clear();

                std::vector<std::string> tokens;
                this->tokenizeText((*it)["text"].GetString(),tokens);
                auto tokensEnd = tokens.end();
                for(auto tokensIt = tokens.begin(); tokensIt != tokensEnd; ++tokensIt)
                {
                    std::string bucketHash = this->tagEngine.getBucketHash(*tokensIt);
                    if(bucketHash != "")
                    {
                        std::fstream*bucket = nullptr;
                        bucket = this->tagEngine.getBucketByHash(bucketHash);
                        if(bucket != nullptr)
                        {
                            bool res = this->tagEngine.tagExists(*tokensIt,bucket);
                            if(res == 1)
                            {
                                rapidjson::Value obj;
                                obj.SetObject();
                                rapidjson::Value str;

                                char buff[tokensIt->size()-1];
                                ::strcpy(buff,tokensIt->c_str());

                                str.SetString(buff,strlen(buff),allocator);
                                obj.AddMember("token",str,allocator);
                                str.SetString(rapidjson::StringRef(""));
                                obj.AddMember("entity",str,allocator);
                                (*it)["nerTags"].PushBack(obj,allocator);
                            }
                            delete bucket;
                        }

                    }
                }
            }
            return true;
        }
        bool saveBin()
        {
            std::ofstream wofs(this->binPath);
            rapidjson::OStreamWrapper wosw(wofs);
            rapidjson::PrettyWriter<rapidjson::OStreamWrapper> writer(wosw);
            this->json.Accept(writer);
            return true;
        }


};
