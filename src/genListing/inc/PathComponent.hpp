#pragma once
class PathComponent
{
    public:
        virtual void increment() = 0;
        virtual bool hasOverFlowed() = 0;
        virtual std::string get() = 0;
        bool overFlowed = false;
};
