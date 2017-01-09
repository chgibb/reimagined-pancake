#pragma once
#include <regex.h>
class Tag
{
    public:
        std::string token;
        std::string entity;
        ::regex_t reg;
        Tag(std::string token,std::string entity) : token(token),entity(entity)
        {
            int res = ::regcomp(&this->reg,std::string("\\b"+this->token+"\\b").c_str(),REG_ICASE);
            if(res)
                std::cout<<"Regex compilation error: "<<res<<"\n";
        }
};
