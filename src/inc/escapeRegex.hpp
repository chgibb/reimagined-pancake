#include <string>
#include <regex>
class EscapeRegex
{
    std::string operators = "[|\\{}()[\]^$+*?.]";
    std::string escape(const char*str)
    {
        return std::regex_replace(str,this->operators,"\\$&");
    }
};