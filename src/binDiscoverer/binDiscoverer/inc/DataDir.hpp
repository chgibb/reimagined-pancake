#pragma once
#include "PathComponent.hpp"
class DataDir : public PathComponent
{
    public:
        DataDir(std::string newDir) : dir(newDir){}
        void increment() override{}
        bool hasOverFlowed() override{return false;}
        std::string get() override
        {
            return this->dir;
        }

    private:
        std::string dir;
};
