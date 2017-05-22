#pragma once
#if defined(_WIN32) || defined(__CYGWIN__)
    //#error "Implement this"
    #include <windows.h>
    inline static int makeDir(const char*path,int mode = 0)
    {
        return ::CreateDirectory(path,NULL);
    }
#endif
#ifdef __linux__
    #include <sys/stat.h>
    inline static int makeDir(const char*path,::mode_t mode = S_IRWXU)
    {
        return ::mkdir(path,mode);
    }
#endif
#if defined(_WIN32) || defined(__CYGWIN__)
    #include <cstdio>
    inline static int makePath(char*file_path,int mode = 0)
    {
        char*split = ::strtok(file_path,"/");
        while(split != NULL)
        {
            ::makeDir(split);
        }
        /*// only create directories that don't exist
        if (::GetFileAttributes(p) == INVALID_FILE_ATTRIBUTES)
        {
            // check if our parent needs to be created, too...
            int i = p.ReverseFind('\\');
            if (i > 0)
            {
                // ...yes, create the parent (recursively)
                ::createPath(p.Left(i));
            }

            // finally, actually create the directory in p
            ::makeDir(p);
        }*/
    }
#endif
//Adapted from answer by Yaroslav Stavnichiy
//http://stackoverflow.com/questions/2336242/recursive-mkdir-system-call-on-unix
#ifdef __linux__
    inline static int makePath(char*file_path,::mode_t mode = S_IRWXU)
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