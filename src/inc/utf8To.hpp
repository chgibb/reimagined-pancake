//adapted from answer by Gerhard Wesp
//http://stackoverflow.com/questions/12493496/c-c-utf-8-upper-lower-case-conversions
#pragma once
#include <codecvt>
#include <locale>
#include <string>
#include <sstream>
class UTF8To
{
    public:
        UTF8To()=default;
        std::wstring toWString(std::string const&str)
        {
            std::wstring_convert<std::codecvt_utf8<wchar_t>> conv;
            return conv.from_bytes(str);
        }
        std::string toString(std::wstring const&str)
        {
            std::wstring_convert<std::codecvt_utf8<wchar_t>> conv;
            return conv.to_bytes(str);
        }
        std::string toLower(std::string const&str)
        {
            auto ss = this->toWString(str);
            for(auto&c : ss)
            {
                c = std::tolower(c);
            }
            return this->toString(ss);
        }
        std::string toUpper(std::string const&str)
        {
            auto ss = this->toWString(str);
            for(auto&c : ss)
            {
                c = std::toupper(c);
            }
            return this->toString(ss);
        }
};