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


    int res = ::makePath((char*)dest.c_str());
    if(res != 0)
        std::cerr<<::strerror(res)<<std::endl;

    std::ofstream destFile(dest);
    if(destFile.bad())
        return false;
    
    char byte;
    while(srcFile.get(byte))
        destFile<<byte;

    std::cout<<dest<<std::endl;
    return true;
}
bool loadBinAsJSON(std::string&path,rapidjson::GenericDocument<rapidjson::UTF8<>>&json)
{
    std::ifstream stream(path);
    rapidjson::IStreamWrapper jsonStream(stream);
    json.ParseStream(jsonStream);
    if(json.HasParseError())
        return false;
    return true;
}
bool saveBin(std::string&path,rapidjson::GenericDocument<rapidjson::UTF8<>>&json)
{
    json["file"].SetString(rapidjson::StringRef(path.c_str()));
    std::ofstream stream(path);
    rapidjson::OStreamWrapper osw(stream);
    //Pretty print by default
    rapidjson::PrettyWriter<rapidjson::OStreamWrapper> writer(osw);
    return json.Accept(writer);
}

using namespace std;
int main(int argc,char*argv[])
{
    if(argc < 4)
    {
        std::cerr<<"Invalid number of arguments!\n";
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
            std::cerr<<"Could not open "+srcBin<<std::endl;
            continue;
        }
        res = ::getHashes(destBin.c_str(),destBinHashes);
        if(res == -1 || res == 0)
        {
            if(!::copyFile(srcBin,destBin))
                std::cerr<<"Could not copy "<<srcBin<<" to "<<destBin<<std::endl;
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
        auto dupEnd = dupHashes.end();

        srcBinHashes.clear();
        destBinHashes.clear();

        rapidjson::GenericDocument<rapidjson::UTF8<>> srcJson;
        rapidjson::GenericDocument<rapidjson::UTF8<>> destJson;

        bool valid = loadBinAsJSON(srcBin,srcJson);
        if(!valid)
        {
            std::cerr<<srcBin<<" is not a valid JSON document\n";
            continue;
        }
        valid = loadBinAsJSON(destBin,destJson);
        if(!valid)
        {
            std::cerr<<destBin<<" is not a valid JSON document\n";
            continue;
        }

        {
            rapidjson::Document::AllocatorType&allocator = destJson.GetAllocator();
            bool isDup = false;
            for(auto srcIt = srcJson["items"].Begin(); srcIt != srcJson["items"].End(); ++srcIt)
            {
                isDup = false;
                for(auto dupIt = dupHashes.begin(); dupIt != dupEnd; ++dupIt)
                {
                    if((*srcIt)["textHash"].GetString() == *dupIt)
                    {
                        isDup = true;
                        break;
                    }
                }
                if(isDup)
                    continue;
                else
                {
                    destJson["items"].PushBack((*srcIt),allocator);
                }
            }
            bool res = saveBin(destBin,destJson);
            if(res)
                std::cout<<destBin<<std::endl;
            else
                std::cerr<<"Error: could not write "<<destBin<<std::endl;
        }
        
    }
    return 0;
}