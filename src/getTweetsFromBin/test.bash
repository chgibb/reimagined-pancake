printf "Building test\n"
g++ -Wall -fexceptions -fexpensive-optimizations -O3 -std=c++11  -c tests/test.cpp -o test.o
g++  -o test test.o  -s
if [ $? != 0 ]; then
    exit 1
fi  
rm *.o
printf "Running\n"
rm -rf learned
mkdir learned
./test
rm test
if [ $? != 0 ]; then
    exit 1
fi
printf "Done\n"
