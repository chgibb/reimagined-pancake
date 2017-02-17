rm -rf dist
mkdir dist
printf "Building binMerger\n"
g++ -Wall -fexceptions -fexpensive-optimizations -O3 -std=c++11  -c main.cpp -o main.o

g++  -o dist/binMerger main.o  -s  

exit 0
