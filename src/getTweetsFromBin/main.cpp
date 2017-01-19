#include <jni.h>
#include "../inc/getTweetsFromBin.hpp"
::GetTweetsFromBin getTweets;
extern "C"
{
    JNIEXPORT jboolean JNICALL Java_src_GetTweetsFromBin_loadBin(JNIEnv*env,jobject obj,jstring bin)
    {
        env->PushLocalFrame(1);
        bool res = getTweets.loadBin(env->GetStringUTFChars(bin,NULL));
        if(res)
        {
            env->PopLocalFrame(NULL);
            return JNI_TRUE;
        }
        else
        {
            env->PopLocalFrame(NULL);
            return JNI_FALSE;
        }
    }
    JNIEXPORT void JNICALL Java_src_GetTweetsFromBin_clearBin(JNIEnv*env,jobject obj)
    {
        getTweets.clearBin();
    }
    JNIEXPORT jstring JNICALL Java_src_GetTweetsFromBin_getTweet(JNIEnv*env,jobject obj)
    {
        return env->NewStringUTF(getTweets.getTweet().c_str());
    }
    JNIEXPORT void JNICALL Java_src_GetTweetsFromBin_pop(JNIEnv*env,jobject obj)
    {
        getTweets.pop();
    }
}