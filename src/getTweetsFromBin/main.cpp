#include <jni.h>
#include "../inc/getTweetsFromBin.hpp"
::GetTweetsFromBin getTweets;
extern "C"
{
    JNIEXPORT jboolean JNICALL Java_src_GetTweetsFromBin_loadBin(JNIEnv*env,jobject obj,jstring bin)
    {

    }
    JNIEXPORT void JNICALL Java_src_GetTweetsFromBin_clearBin(JNIEnv*env,jobject obj)
    {
        
    }
    JNIEXPORT jstring JNICALL Java_src_GetTweetsFromBin_getTweet(JNIEnv*env,jobject obj)
    {
        
    }
    JNIEXPORT void JNICALL Java_src_GetTweetsFromBin_pop(JNIEnv*env,jobject obj)
    {
        
    }
}