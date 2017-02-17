#include <string>
#include <fstream>
#include <vector>
#include <regex>
#include <iostream>

#include "../inc/getQuotedJSONProperty.hpp"

#include "rapidjson/include/rapidjson/document.h"
#include "rapidjson/include/rapidjson/istreamwrapper.h"
#include "rapidjson/include/rapidjson/ostreamwrapper.h"
#include "rapidjson/include/rapidjson/prettywriter.h"

void getHashes(const char*file,std::vector<std::string>&hashes)
{
    std::ifstream*bin = new std::ifstream(file,std::ios::in);
    ::getQuotedJSONProperty<decltype(bin)>
    (
        bin,
        "textHash",
        [&hashes](std::string&textHash) -> bool
        {
            hashes.push_back(textHash);
            return false;
        }
    );
    delete bin;
}

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

    std::regex srcDirRegex("("+srcDirName+")");

    std::ifstream srcBinListing(srcBinList.c_str(),std::ios::in);
    std::string bin = "";
    while(std::getline(srcBinListing,bin))
    {
        std::string srcBin = bin;
        std::string destBin = std::regex_replace(bin,srcDirRegex,destDirName);

        std::vector<std::string> srcBinHashes;
        std::vector<std::string> destBinHashes;
        std::vector<std::string> dupHashes;

        ::getHashes(srcBin.c_str(),srcBinHashes);
        ::getHashes(destBin.c_str(),destBinHashes);

        auto srcEnd = srcBinHashes.end();
        auto destEnd = destBinHashes.end();
        for(auto srcIt = srcBinHashes.begin(); srcIt != srcEnd; ++srcIt)
        {
            for(auto destIt = destBinHashes.begin(); destIt != destEnd; ++destIt)
            {
                if(*srcIt == *destIt)
                    dupHashes.push_back(*srcIt);
            }
        }
    }
    return 0;
}