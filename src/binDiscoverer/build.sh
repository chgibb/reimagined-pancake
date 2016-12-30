rm -rf dist
mkdir dist
printf "Building binDiscoverer\n"
g++ -Wall -fexceptions -fexpensive-optimizations -O3 -std=c++11  -c main.cpp -o main.o
g++  -o dist/binDiscoverer main.o  -s  

rm *.o

