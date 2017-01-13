#include "../../inc/getQuotedJSONProperty.hpp"
#include <iostream>
#include <fstream>
#include <string>
#include <assert.h>
#include "../inc/TagStorageEngine.hpp"
::TagStorageEngine tagStorageEngine;
int main()
{
    tagStorageEngine.setStorageDirectory("learned");
    assert(tagStorageEngine.storeTag("foo","PERSON"));
    assert(tagStorageEngine.storeTag("foo1","PERSON"));
    assert(tagStorageEngine.storeTag("foo2","ORGANIZATION"));
    assert(!tagStorageEngine.storeTag("foo","PERSON"));
    assert(tagStorageEngine.storeTag("[","LOCATION"));
    return 0;
}