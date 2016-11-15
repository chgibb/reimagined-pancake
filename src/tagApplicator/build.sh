rm -rf dist
mkdir dist
printf "Building tagApplicator\n"
g++ -Wall -fexceptions -fexpensive-optimizations -O3 -std=c++11  -c main.cpp -o main.o
g++  -o dist/tagApplicator main.o  -s  

