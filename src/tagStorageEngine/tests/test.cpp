#include "../../inc/getQuotedJSONProperty.hpp"
#include <iostream>
#include <fstream>
#include <string>
#include <assert.h>
#include "../inc/TagStorageEngine.hpp"
#include "../../inc/escapeRegex.hpp"
#include "../../inc/getTweetsFromBin.hpp"
::TagStorageEngine tagStorageEngine;
::EscapeRegex escapeRegex;
int main()
{
    tagStorageEngine.setStorageDirectory("learned/super/deep/directory");
    assert(tagStorageEngine.storeTag("foo","PERSON"));
    assert(tagStorageEngine.storeTag("foo1","PERSON"));
    assert(tagStorageEngine.storeTag("foo2","ORGANIZATION"));
    assert(!tagStorageEngine.storeTag("foo","PERSON"));
    assert(::escapeRegex.escape("[|\\{}()[\\]^$+*?.]") == "\\[\\|\\\\{\\}\\(\\)\\[\\\\]\\^\\$\\+\\*\\?\\.\\]");
    return 0;
}