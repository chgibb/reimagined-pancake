#TODO: THIS PATH SHOULD NOT BE HARDCODED
rm -rf dist
mkdir dist
#g++ -Wall -fexceptions -O3 -fPIC -I /usr/lib/jvm/java-7-openjdk-amd64/include  -c main.cpp -o main.o
#g++ -shared  main.o  -o libtagStorageEngine.so -s  

g++ -shared -fPIC -I /usr/lib/jvm/java-7-openjdk-amd64/include main.cpp -o libtagStorageEngine.so
if [ $? != 0 ]; then
    exit 1
fi



cp libtagStorageEngine.so dist

