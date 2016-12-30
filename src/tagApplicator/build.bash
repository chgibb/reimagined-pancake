rm -rf dist
mkdir dist
printf "Building tagApplicator\n"
g++ -Wall -fexceptions -fexpensive-optimizations -O3 -std=c++11  -c main.cpp -o main.o
if [ $? != 0 ]; then
    exit 1
fi
g++  -o dist/tagApplicator main.o  -s  
if [ $? != 0 ]; then
    exit 1
fi