#TODO: THIS PATH SHOULD NOT BE HARDCODED
rm -rf dist
mkdir dist
printf "Building tagStorageEnginge\n"

CXX="g++"
if [ "$TRAVIS" = true ]; then 
    CXX="/usr/bin/g++-5"
fi

$CXX -shared -fPIC -std=c++11 -I /usr/lib/jvm/java-9-openjdk-amd64/include main.cpp -o libtagStorageEngine.so
if [ $? != 0 ]; then
    exit 1
fi

cp libtagStorageEngine.so dist
