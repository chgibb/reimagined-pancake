#pragma once
#include <string>
#include <regex>
class EscapeRegex
{
    public:
        std::string escape(const char*str)
        {
            return std::regex_replace(str,this->operators,"\\$&");
        }
    private:
        std::string operators = "[|\\{}()[\]^$+*?.]";
};