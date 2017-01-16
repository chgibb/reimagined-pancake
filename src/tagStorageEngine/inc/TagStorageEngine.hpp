#pragma once
#include <string>
#include <fstream>
#include <functional>
#include <regex.h>
#include "../../inc/getQuotedJSONProperty.hpp"
#include "../../inc/escapeRegex.hpp"
#include "../../inc/utf8To.hpp"
class TagStorageEngine
{
    public:
        TagStorageEngine(){}
        ~TagStorageEngine(){}
        template<class Char>
        void setStorageDirectory(Char dir)
        {
            this->storageDirectory = dir;
        }
        bool storeTag(std::string token,std::string entity)
        {
            std::fstream* bucket = nullptr;
            std::string bucketHash = this->getBucketHash(token);
            bucket = this->getBucketByHash(bucketHash);
            if(bucket != nullptr)
            {
                if(!this->tagExists(token,bucket))
                {
                    bucket->clear();
                    bool res = this->writeTag(token,entity,bucket);
                    if(!res)
                    {
                        delete bucket;
                        return false;
                    }
                    delete bucket;
                    return true;
                }
            }
            return false;
        }
    private:
        std::string storageDirectory;
        UTF8To utf8Conv;
        std::string getBucketHash(std::string&token)
        {
            token = this->utf8Conv.toLower(token);
            std::string res = this->storageDirectory;
            res += "/";
            if(token.size() >= 3)
                return res + token[0] + token[1] + token[2] + ".nldjson";
            if(token.size() >= 2)
                return res + token[0] + token[1] + ".nldjson";
            if(token.size() >= 1)
                return res + token[0] + ".nldjson";
            return "";
        }
        std::fstream* getBucketByHash(std::string&bucketHash)
        {
            std::fstream* bucket = new std::fstream(bucketHash.c_str(),std::ios::in|std::ios::out|std::ios::app);
            return bucket;
        }
        EscapeRegex escapeRegex;
        bool tagExists(std::string&token,std::fstream*bucket)
        {
            ::regex_t reg;
            int res = ::regcomp(&reg,std::string("\\b"+this->escapeRegex.escape(token.c_str())+"\\b").c_str(),REG_ICASE);
            if(res)
                throw new std::runtime_error("Regex compilation error "+res);
            bool found = false;
            res = ::getQuotedJSONProperty<std::fstream*>
            (
                bucket,"token",
                [&reg,&found](std::string&prop) -> bool
                {
                    if(::regexec(&reg,prop.c_str(),0,NULL,0) == 0)
                    {
                        found = true;
                        return true;
                    }
                    return false;
                }
            );
            ::regfree(&reg);
            if(res == -1)
                throw new std::runtime_error("Failed to get JSON property from file");
            return found;
        }
        bool writeTag(std::string&token,std::string&entity,std::fstream*bucket)
        {
            if(!bucket->bad())
            {
                (*bucket)<<"{\"token\":\""<<token<<"\",\"entity\":\""<<entity<<"\"}"<<std::endl;
                bucket->close();
                return true;
            }
            return false;
        }

};