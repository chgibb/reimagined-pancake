(set -o igncr) 2>/dev/null && set -o igncr; # For Cygwin on Windows compaibility

#TODO: THIS PATH SHOULD NOT BE HARDCODED
rm -rf dist
mkdir dist
printf "Building tagStorageEnginge\n"

CXX="g++"
if [ "$TRAVIS" = true ]; then 
    CXX="/usr/bin/g++-5"
fi

if [[ "$OSTYPE" == "linux-gnu" ]]; then
    $CXX -shared -fPIC -std=c++11 -O3 -I /usr/lib/jvm/java-9-openjdk-amd64/include main.cpp -o libtagStorageEngine.so
    if [ $? != 0 ]; then
        $CXX -shared -fPIC -std=c++11 -O3 -I /usr/lib/jvm/java-8-openjdk-amd64/include main.cpp -o libtagStorageEngine.so
        if [ $? != 0 ]; then
            $CXX -shared -fPIC -std=c++11 -O3 -I /usr/lib/jvm/java-7-openjdk-amd64/include main.cpp -o libtagStorageEngine.so
            if [ $? != 0 ]; then
                exit 1
            fi
        fi
    fi
    cp libtagStorageEngine.so dist
    rm *.so
fi

if [[ "$OSTYPE" == "cygwin" ]]; then
$CXX -shared -std=c++11 -O3 -D__int64=int64_t -I "$JAVA_HOME"\\include -I "$JAVA_HOME"\\include\\win32 main.cpp -o libtagStorageEngine.dll
    if [ $? != 0 ]; then
        exit 1
    fi
    cp libtagStorageEngine.dll dist
    rm *.dll
fi