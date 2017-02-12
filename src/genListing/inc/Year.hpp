#pragma once
#include <string>
#include "PathComponent.hpp"
class Year : public PathComponent
{
    public:
        Year(int newYear) : year(newYear){}
        void increment() override
        {
            this->overFlowed = true;
            this->year++;
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
            return std::to_string(this->year);
        }

    private:
        int year;
};
