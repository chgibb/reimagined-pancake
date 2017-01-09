#include <iostream>
#include <fstream>
#include <vector>

#include "inc/loadTags.hpp"
#include "inc/Bin.hpp"
#include "../inc/Tag.hpp"
/*
    CLI arguments should be of the form:
    tagApplicator logFile learnedTags.json pathToBinToApplyTo1.json pathToBinToApplyTo2.json etc

    Using NER tags identified in argv[1], will update the NERTags array of each Object in the
    items array for every bin given.
*/
int main(int argc,char*argv[])
{

    std::vector<Tag> tags;
    bool res = loadTags(argv[1],tags);
    if(!res)
    {
        std::cout<<"Could not load tags\n";
        return 1;
    }
    for(int i = 2; i != argc; ++i)
    {
        std::cout<<"Loading "<<argv[i]<<"\n";
        std::cout.flush();
        Bin bin;
        bool res = bin.load(argv[i]);
        if(res)
        {
            std::cout<<"Applying learned tags to "<<argv[i]<<"\n";
            std::cout.flush();
            bin.tagBin(tags);
            std::cout<<"Done"<<"\n";
            std::cout.flush();
            bin.saveBin();
        }
    }
}
