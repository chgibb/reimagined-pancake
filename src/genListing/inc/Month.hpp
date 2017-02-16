#pragma once
#include "PathComponent.hpp"
std::string months[] =
{
    "dummy",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
};
class Month : public PathComponent
{
    public:
        Month(int newMonth) : numMonth(newMonth){}
        Month(std::string newMonth)
        {
            for(int i = 0; i < 13; i++)
            {
                if(months[i] == newMonth)
                {
                    this->numMonth = i;
                    break;
                }
            }
        }

        void increment() override
        {
            this->numMonth++;
            if(this->numMonth >= 13)
            {
                this->overFlowed = true;
                this->numMonth = 1;
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
            return months[this->numMonth];
        }
    private:
        int numMonth = 1;
};
