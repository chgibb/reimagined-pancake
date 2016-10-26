#pragma once
#include "PathComponent.hpp"
#include <string>
class Hour : public PathComponent
{
    public:
        Hour() = default;
        void increment() override
        {
            this->numHour++;
            if(this->numHour >= 24)
            {
                this->numHour = 0;
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
            std::string res = std::to_string(this->numHour);
            if(res.length() == 1)
                return "0"+res;
            return res;
        }
    private:
        int numHour = 0;
};
