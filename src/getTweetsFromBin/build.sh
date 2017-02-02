#TODO: THIS PATH SHOULD NOT BE HARDCODED
rm -rf dist
mkdir dist

g++ -shared -fPIC -std=c++11 -I /usr/lib/jvm/java-9-openjdk-amd64/include main.cpp -o libgetTweetsFromBin.so
printf "Building libgetTweetsFromBin.so\n"
if [ $? != 0 ]; then
    exit 1
fi



cp libgetTweetsFromBin.so dist
rm *.so

