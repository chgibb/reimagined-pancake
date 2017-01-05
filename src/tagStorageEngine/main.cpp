#include <iostream>
#include <jni.h>
extern "C"
{
    JNIEXPORT void JNICALL Java_src_TagStorageEngine_storeTag(JNIEnv* env,jobject obj,jstring token,jstring entity)
    {
        env->PushLocalFrame(2);
        std::string nToken(env->GetStringUTFChars(token,NULL));
        std::string nEntity(env->GetStringUTFChars(entity,NULL));
        env->PopLocalFrame(NULL);
    }
    JNIEXPORT void JNICALL Java_src_TagStorageEngine_setStorageDirectory(JNIEnv* env,jobject obj,jstring dir)
    {
        std::cout<<dir;
    }
}
