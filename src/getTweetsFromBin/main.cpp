#include <jni.h>
#include "../inc/getTweetsFromBin.hpp"
::GetTweetsFromBin getTweets;
extern "C"
{
    JNIEXPORT jboolean JNICALL Java_src_GetTweetsFromBin_loadBin(JNIEnv*env,jobject obj,jstring bin)
    {
        try
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
        catch(std::exception*e)
        {
            std::cout<<"Exception in src.GetTweetsFromBin.loadBin\n";
            std::cout<<e->what()<<std::endl;
            env->PopLocalFrame(NULL);
            return JNI_FALSE;
        }
    }
    JNIEXPORT void JNICALL Java_src_GetTweetsFromBin_clearBin(JNIEnv*env,jobject obj)
    {
        try
        {
            getTweets.clearBin();
        }
        catch(std::exception*e)
        {
            std::cout<<"Exception in src.GetTweetsFromBin.clearBin\n";
            std::cout<<e->what()<<std::endl;
        }
    }
    JNIEXPORT jstring JNICALL Java_src_GetTweetsFromBin_getTweet(JNIEnv*env,jobject obj)
    {
        try
        {
            return env->NewStringUTF(getTweets.getTweet().c_str());
        }
        catch(std::exception*e)
        {
            std::cout<<"Exception in src.GetTweetsFromBin.getTweet\n";
            std::cout<<e->what()<<std::endl;
        }
    }
    JNIEXPORT jint JNICALL Java_src_GetTweetsFromBin_size(JNIEnv*env,jobject obj)
    {
        try
        {
            return getTweets.size();
        }
        catch(std::exception*e)
        {
            std::cout<<"Exception in src.GetTweetsFromBin.size\n";
            std::cout<<e->what()<<std::endl;
            return 0;
        }
    }
    JNIEXPORT void JNICALL Java_src_GetTweetsFromBin_pop(JNIEnv*env,jobject obj)
    {
        try
        {
            getTweets.pop();
        }
        catch(std::exception*e)
        {
            std::cout<<"Exception in src.GetTweetsFromBin.pop\n";
            std::cout<<e->what()<<std::endl;
        }
    }
}