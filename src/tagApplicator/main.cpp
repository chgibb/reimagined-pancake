#include <iostream>
#include <fstream>
#include <vector>

#include "inc/loadTags.hpp"
#include "inc/Bin.hpp"
#include "inc/Tag.hpp"
/*
    CLI arguments should be of the form:
    tagApplicator logFile learnedTags.json pathToBinToApplyTo1.json pathToBinToApplyTo2.json etc

    Using NER tags identified in argv[1], will update the NERTags array of each Object in the
    items array for every bin given.
*/
int main(int argc,char*argv[])
{
    if(!argv[2])
        return 1;

    std::ofstream log("tagApplicatorLog",std::ios::out | std::ios::app);

    std::vector<Tag> tags;
    bool res = loadTags<decltype(log)>(argv[2],tags,log);
    if(!res)
        return 1;
    for(int i = 3; i != argc; ++i)
    {
        Bin<decltype(log)> bin(argv[i],&log);
        bin.tagBin(tags);
        bin.saveBin();
    }
}
