#pragma once
#include "PathComponent.hpp"
#include <string>
class Minute : public PathComponent
{
 public:
        Minute() = default;
        Minute(int newMinute) : numMinute(newMinute){}
        void increment() override
        {
            this->numMinute++;
            if(this->numMinute >= 60)
            {
                this->numMinute = 0;
                this->overFlowed = true;
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
            std::string res = std::to_string(this->numMinute);
            if(res.length() == 1)
                return "0"+res;
            return res;
        }
    private:
        int numMinute = 0;
};

