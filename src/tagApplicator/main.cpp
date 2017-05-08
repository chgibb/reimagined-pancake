#include <iostream>
#include <fstream>
#include <string>

#include "inc/Bin.hpp"



int main(int argc,char*argv[])
{
    if(argc < 2)
    {
        std::cerr<<"Invalid number of arguments!\n";
        return 1;
    }
    std::string listingPath = argv[1];
    std::ifstream listing(listingPath.c_str(),std::ios::in);
    std::string binPath = "";
    while(std::getline(listing,binPath))
    {
        Bin bin;
        bin.tagEngine.setStorageDirectory(argv[2]);
        bool res = bin.load(binPath);
        if(res)
        {
            bin.tagBin();
            bin.saveBin();
        }
    }
}
