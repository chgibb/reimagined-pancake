#TODO: THIS PATH SHOULD NOT BE HARDCODED
rm -rf dist
mkdir dist

g++ -shared -fPIC -std=c++11 -I /usr/lib/jvm/java-9-openjdk-amd64/include main.cpp -o libtagStorageEngine.so
printf "Building tagStorageEnginge\n"
if [ $? != 0 ]; then
    exit 1
fi



cp libtagStorageEngine.so dist

