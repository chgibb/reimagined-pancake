#pragma once
#ifdef _WIN32
    #error "Implement this"
#endif
#ifdef __linux__
    #include <sys/stat.h>
    inline static int makeDir(const char*path,::mode_t mode)
    {
        return ::mkdir(path,mode);
    }
#endif
//Adapted from answer by Yaroslav Stavnichiy
//http://stackoverflow.com/questions/2336242/recursive-mkdir-system-call-on-unix
#ifdef __linux__
    inline static int makePath(char*file_path,::mode_t mode)
    {
        char* p;
        for(p = ::strchr(file_path + 1,'/'); p; p = ::strchr(p + 1,'/'))
        {
            *p='\0';
            int res = ::makeDir(file_path,mode);
            if(res != 0)
            {
                *p='/';
                if(errno != 17)
                    return errno; 
            }
            *p='/';
        }
        return 0;
    }
#endif