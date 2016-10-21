#pragma once
#include <vector>
#include <utility>
#include <string>
#include <fstream>
#include <locale>
#include <codecvt>
#include <regex>
#include <regex.h>

#include <cstring>

#include "../rapidjson/include/rapidjson/document.h"
#include "../rapidjson/include/rapidjson/istreamwrapper.h"
#include "../rapidjson/include/rapidjson/ostreamwrapper.h"
#include "../rapidjson/include/rapidjson/prettywriter.h"

#include "findTag.hpp"
template<class LogFile>
class Bin
{
    public:
        std::string binPath;
        rapidjson::GenericDocument<rapidjson::UTF8<>> json;
        LogFile* logFile;
        Bin(std::string binPath,LogFile* log)
        {
            this->binPath = binPath;
            this->logFile = log;
            this->load();
        }
        Bin(){}
        bool load()
        {
            *this->logFile<<"Loading "+this->binPath<<"\n";
            this->logFile->flush();
            std::ifstream binPathFile(this->binPath);
            rapidjson::IStreamWrapper jsonFileStream(binPathFile);
            this->json.ParseStream(jsonFileStream);
            if(this->json.HasParseError())
            {
                *this->logFile<<this->json.GetParseError()<<"\n";
                this->logFile->flush();
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
            char* res;
            char delims[] = " \n.,!?";
            res = ::strtok(&in[0],delims);
            tokens.push_back(std::string(res));
            while(res)
            {
                res = ::strtok(NULL,delims);
                if(res)
                {
                    tokens.push_back(std::string(res));
                }
            }
        }
        bool tagBin(std::vector<Tag>&tags)
        {
            rapidjson::Document::AllocatorType& allocator = this->json.GetAllocator();
            std::regex charsToRemove("\\uFFFD");
            for(auto it = this->json["items"].Begin(); it != this->json["items"].End(); ++it)
            {
                std::vector<std::string> tokens;
                (*it)["nerTags"].Clear();
                this->tokenizeText((*it)["text"].GetString(),tokens);

                auto tagsEnd = tags.end();
                auto tokensEnd = tokens.end();
                for(auto tagsIt = tags.begin(); tagsIt != tagsEnd; ++tagsIt)
                {
                    for(auto tokensIt = tokens.begin(); tokensIt != tokensEnd; ++tokensIt)
                    {

                        if(::regexec(&tagsIt->reg,tokensIt->c_str(),0,NULL,0) == 0)
                        {
                            *tokensIt = std::regex_replace(*tokensIt,charsToRemove,"");
                            rapidjson::Value obj;
                            obj.SetObject();
                            rapidjson::Value str;
                            str.SetString(rapidjson::StringRef(tokensIt->c_str()));
                            obj.AddMember("token",str,allocator);
                            str.SetString(rapidjson::StringRef(tagsIt->entity.c_str()));
                            obj.AddMember("entity",str,allocator);
                            (*it)["nerTags"].PushBack(obj,allocator);
                        }
                    }
                }
            }
            return true;
        }
        bool saveBin()
        {
            /*std::ofstream ofs(this->binPath);
            rapidjson::OStreamWrapper osw(ofs);
            rapidjson::PrettyWriter<rapidjson::OStreamWrapper> writer(osw);
            this->json.Accept(writer);*/
            std::locale loc (std::locale(), new std::codecvt_utf8<char>);
            std::wofstream wofs;
            wofs.open(this->binPath,std::ios::out);
//            std::locale utf8_locale(std::locale(),new utf8cvt<false>);
//            wofs.imbue(utf8_locale);
            rapidjson::WOStreamWrapper wosw(wofs);
            rapidjson::PrettyWriter<rapidjson::WOStreamWrapper> writer(wosw);
            this->json.Accept(writer);
            return true;
        }


};
