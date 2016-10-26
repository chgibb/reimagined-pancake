printf "Building binDiscoverer\n"
g++ -Wall -fexceptions -fexpensive-optimizations -O3 -std=c++11  -c main.cpp -o main.o
g++  -o binDiscoverer main.o  -s  

