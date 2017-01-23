#pragma once
#include <string>
#include <regex>
class EscapeRegex
{
    public:
        EscapeRegex()
        {
            this->operatorsToEscape.assign("[|\\{}()[\\]^$+*?.]");
        }
        std::string escape(const char*str)
        {
            return std::regex_replace(str,this->operatorsToEscape,"\\$&");
        }
    private:
        std::regex operatorsToEscape;
};