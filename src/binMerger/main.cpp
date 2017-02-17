#include <string>
#include <fstream>
#include <vector>
#include <iostream>

#include "../inc/getQuotedJSONProperty.hpp"

#include "../rapidjson/include/rapidjson/document.h"
#include "../rapidjson/include/rapidjson/istreamwrapper.h"
#include "../rapidjson/include/rapidjson/ostreamwrapper.h"
#include "../rapidjson/include/rapidjson/prettywriter.h"
using namespace std;
int main(int argc,char*argv[])
{
    if(argc < 4)
    {
        std::cout<<"Invalid number of arguments!\n";
        return 1;
    }
    std::string srcDirName = argv[1];
    std::string destDirName = argv[2];
    std::string srcBinList = argv[3];

    std::ifstream srcBinListing(srcBinList.c_str(),std::ios::in);
    std::string bin = "";
    while(std::getline(srcBinListing,bin))
    {
        std::cout<<bin<<std::endl;
    }

    return 0;
}