#TODO: THIS PATH SHOULD NOT BE HARDCODED
rm -rf dist
mkdir dist
printf "Building libgetTweetsFromBin.so\n"

CXX="g++"
if [ "$TRAVIS" = true ]; then 
    CXX="/usr/bin/g++-5"
fi

$CXX -shared -fPIC -std=c++11 -I /usr/lib/jvm/java-9-openjdk-amd64/include main.cpp -o libgetTweetsFromBin.so
if [ $? != 0 ]; then
    $CXX -shared -fPIC -std=c++11 -I /usr/lib/jvm/java-8-openjdk-amd64/include main.cpp -o libgetTweetsFromBin.so
    if [ $? != 0 ]; then
        $CXX -shared -fPIC -std=c++11 -I /usr/lib/jvm/java-7-openjdk-amd64/include main.cpp -o libgetTweetsFromBin.so
        if [ $? != 0 ]; then
            exit 1
        fi
    fi
fi

cp libgetTweetsFromBin.so dist
rm *.so

