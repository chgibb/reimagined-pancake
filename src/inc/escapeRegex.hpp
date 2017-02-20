#pragma once
#include <string>
#include <regex>
//Based on implementation by Sindre Sorhus 
//https://github.com/sindresorhus/escape-string-regexp
class EscapeRegex
{
    public:
        EscapeRegex()
        {
            this->operatorsToEscape.assign("[|\\{}()[\\]^$+*?.]");
        }
        std::string escape(const char*str)
        {
            return std::regex_replace(str,this->operatorsToEscape,"\\$0");
        }
        std::string remove(const char*str)
        {
            return std::regex_replace(str,this->operatorsToEscape,"");
        }
    private:
        std::regex operatorsToEscape;
};
