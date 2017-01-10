#define CATCH_CONFIG_MAIN
#include "../../inc/catch.hpp"
#define private public
#include "../inc/TagStorageEngine.hpp"
::TagStorageEngine tagStorageEngine;
TEST_CASE("Storage directory was set")
{
    tagStorageEngine.setStorageDirectory("learned");
    REQUIRE(tagStorageEngine.storageDirectory == "learned");
}