#include <iostream>
#include <fstream>
#include <string>
#include <assert.h>
#define private public
#include "../../inc/getTweetsFromBin.hpp"

::GetTweetsFromBin getTweets;
int main()
{
    assert(getTweets.loadBin("testData/tweets2.json") == true);
    while(getTweets.tweets.size() != 0)
    {
        assert(getTweets.getTweet() != "");
        std::cout<<getTweets.getTweet()<<std::endl;
        getTweets.pop();
    }
    
    getTweets.clearBin();
    assert(getTweets.tweets.size() == 0);

    assert(getTweets.loadBin("this/does/not/exist") == false);
    assert(getTweets.tweets.size() == 0);

    assert(getTweets.loadBin("testData/tweets.json") == true);
    assert(getTweets.tweets.size() == 452);
    getTweets.clearBin();
    assert(getTweets.tweets.size() == 0);
    return 0;
}