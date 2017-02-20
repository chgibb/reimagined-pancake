#include <iostream>
#include <jni.h>
#include "inc/TagStorageEngine.hpp"
::TagStorageEngine tagStorageEngine;
extern "C"
{
    JNIEXPORT void JNICALL Java_src_TagStorageEngine_storeTag(JNIEnv* env,jobject obj,jstring token,jstring entity)
    {
        try
        {
            env->PushLocalFrame(2);
            std::string nToken(env->GetStringUTFChars(token,NULL));
            std::string nEntity(env->GetStringUTFChars(entity,NULL));
            bool res = tagStorageEngine.storeTag(nToken,nEntity);
            env->PopLocalFrame(NULL);
        }
        catch(std::exception*e)
        {
            std::cout<<"Exception in src.TagStorageEngine.storeTag\n";
            std::cout<<e->what();
        }
    }
    JNIEXPORT void JNICALL Java_src_TagStorageEngine_setStorageDirectory(JNIEnv* env,jobject obj,jstring dir)
    {
        try
        {
            env->PushLocalFrame(1);
            ::tagStorageEngine.setStorageDirectory(env->GetStringUTFChars(dir,NULL));
            env->PopLocalFrame(NULL);
        }
        catch(std::exception*e)
        {
            std::cout<<"Exception in src.TagStorageEngine.setStorageDirectory\n";
            std::cout<<e->what()<<std::endl;
        }
    }
}
