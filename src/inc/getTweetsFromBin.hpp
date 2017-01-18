#pragma once
#include <vector>
#include <string>
#include <fstream>
#include "getQuotedJSONProperty.hpp"
class GetTweetsFromBin
{
    public:
        GetTweetsFromBin()=default;

        void loadBin(const char*file)
        {
            std::ifstream*bin = new std::ifstream(file,std::ios::in);
            ::getQuotedJSONProperty<decltype(bin)>
            (
                bin,
                "text",
                [this](std::string&tweetText) -> bool
                {
                    this->tweets.push_back(tweetText);
                    return false;
                }
            );
        }
        void clearBin()
        {
            this->tweets.clear();
        }
        std::string getNextTweet()
        {

        }
    private:
        std::vector<std::string> tweets;

};