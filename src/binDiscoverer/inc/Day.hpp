#pragma once
#include "PathComponent.hpp"
#include <string>
class Day : public PathComponent
{
    public:
        Day(int newDay) : numDay(newDay){}
        void increment() override
        {
            this->numDay++;
            if(this->numDay >= 32)
            {
                this->overFlowed = true;
                this->numDay = 1;
            }
        }
        bool hasOverFlowed() override
        {
            if(this->overFlowed)
            {
                this->overFlowed = false;
                return true;
            }
            return false;
        }
        std::string get() override
        {
            std::string res = std::to_string(this->numDay);
            if(res.length() == 1)
                return "0"+res;
            return res;
        }
    private:
        int numDay = 1;
};
