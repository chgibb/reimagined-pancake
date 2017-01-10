#define CATCH_CONFIG_MAIN
#include "../../inc/catch.hpp"
#define private public
#include "../inc/TagStorageEngine.hpp"
::TagStorageEngine tagStorageEngine;
TEST_CASE("Storage directory was set")
{
    tagStorageEngine.setStorageDirectory("learned");
    REQUIRE(tagStorageEngine.storageDirectory == "learned");
    std::string token = "foo";
    std::string entity = "PERSON";
    std::string bucketHash = tagStorageEngine.getBucketHash(token);
    std::fstream* bucket = tagStorageEngine.getBucketByHash(bucketHash);
    REQUIRE(tagStorageEngine.writeTag(token,entity,bucket) == true);
    REQUIRE(::getQuotedJSONProperty<std::fstream*>(bucket,"token") == 2);
}