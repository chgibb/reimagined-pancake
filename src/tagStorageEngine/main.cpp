#include <iostream>
#include <jni.h>
extern "C"
{
    JNIEXPORT void JNICALL Java_src_TagStorageEngine_storeTag(JNIEnv* env,jobject obj,jstring token,jstring entity)
    {
        std::string nToken(env->GetStringUTFChars(token,NULL));
        std::string nEntity(env->GetStringUTFChars(entity,NULL));
        //std::cout<<nToken<<"\n";
        //std::cout<<nEntity<<"\n";
        //env->ReleaseStringUTFChars(env,token);
        //env->ReleaseStringUTFChars(env,entity);
    }
    JNIEXPORT void JNICALL Java_src_TagStorageEngine_setStorageDirectory(JNIEnv* env,jobject obj,jstring dir)
    {
        std::cout<<dir;
    }
    
    // A function adding two integers and returning the result
    int SampleAddInt(int i1, int i2)
    {
        return i1 + i2;
    }



    // A function always returning zero
    int SampleFunction2()
    {
        // insert code here
        
        return 0;
    }
}
