#include <iostream>
#include <fstream>
#include <string>
#include <assert.h>
#define private public
#include "../../inc/getTweetsFromBin.hpp"

::GetTweetsFromBin getTweets;
int main()
{
    getTweets.loadBin("testData/tweets.json");
    assert(getTweets.tweets.size() == 452);
    return 0;
}