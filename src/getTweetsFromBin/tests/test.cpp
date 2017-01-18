#include <iostream>
#include <fstream>
#include <string>
#include <assert.h>
#include "../../inc/getTweetsFromBin.hpp"

::GetTweetsFromBin getTweets;
int main()
{
    getTweets.loadBin("tweets.json");
    std::string tweet = getTweets.getTweet();
    while(tweet != "")
    {
        std::cout<<tweet<<std::endl;
        getTweets.pop();
    }
    return 0;
}