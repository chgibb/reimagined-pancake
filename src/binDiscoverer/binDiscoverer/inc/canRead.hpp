#pragma once
#include <sys/stat.h>
bool canRead(std::string path)
{
    struct stat buffer;
    return (stat(path.c_str(),&buffer) == 0);
}
