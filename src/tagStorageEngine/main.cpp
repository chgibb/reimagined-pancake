#include <iostream>
#include <jni.h>
extern "C"
{
    JNIEXPORT void JNICALL Java_src_tagStorageEngine_SampleFunction1(JNIEnv* env,jobject obj)
    {
        std::cout<<"Hello world\n";
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
