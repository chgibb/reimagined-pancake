#pragma once
#include <vector>
#include <string>
#include <fstream>
#include <iostream>
#include "getQuotedJSONProperty.hpp"
class GetTweetsFromBin
{
    public:
        GetTweetsFromBin()=default;
        bool loadBin(const char*file)
        {
            this->clearBin();
            std::ifstream*bin = new std::ifstream(file,std::ios::in);
            if(bin->fail())
            {
                delete bin;
                return false;
            }
            int res = ::getQuotedJSONProperty<decltype(bin)>
            (
                bin,
                "text",
                [this](std::string&tweetText) -> bool
                {
                    this->tweets.push_back(tweetText);
                    return false;
                }
            );
            delete bin;
            if(res == -1)
                return false;
            return true;
        }
        void clearBin()
        {
            this->tweets.clear();
        }
        std::string getTweet()
        {
            if(!this->tweets.empty())
                return this->tweets.back();
            return "";
        }
        int size()
        {
            return this->tweets.size();
        }
        void pop()
        {
            if(!this->tweets.empty())
                this->tweets.pop_back();
        }
    private:
        std::vector<std::string> tweets;

};