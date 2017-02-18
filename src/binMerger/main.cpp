#include <string>
#include <fstream>
#include <vector>
#include <regex>
#include <iostream>

#include "../inc/getQuotedJSONProperty.hpp"
#include "../inc/makeDir.hpp"

#include "rapidjson/include/rapidjson/document.h"
#include "rapidjson/include/rapidjson/istreamwrapper.h"
#include "rapidjson/include/rapidjson/ostreamwrapper.h"
#include "rapidjson/include/rapidjson/prettywriter.h"

int getHashes(const char*file,std::vector<std::string>&hashes)
{
    std::ifstream*bin = new std::ifstream(file,std::ios::in);
    int res = ::getQuotedJSONProperty<decltype(bin)>
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
    return res;
}
bool copyFile(const std::string&src,const std::string&dest)
{
    std::ifstream srcFile(src);
    if(srcFile.bad())
        return false;
    std::ofstream destFile(dest);
    if(destFile.bad())
        return false;

    int res = ::makePath((char*)dest.c_str());
    if(res != 0)
        std::cout<<::strerror(res)<<std::endl;

    destFile.close();
    destFile.clear();
    destFile.open(dest);

    
    char byte;
    while(srcFile.get(byte))
        destFile<<byte;
    return true;
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


        int res = ::getHashes(srcBin.c_str(),srcBinHashes);
        if(res == -1 || res == 0)
        {
            std::cout<<"Could not open "+srcBin<<std::endl;
            continue;
        }
        res = ::getHashes(destBin.c_str(),destBinHashes);
        if(res == -1 || res == 0)
        {
            if(!::copyFile(srcBin,destBin))
                std::cout<<"Could not copy "<<srcBin<<" to "<<destBin<<std::endl;
            continue;
        }

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