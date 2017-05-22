(set -o igncr) 2>/dev/null && set -o igncr; # For Cygwin on Windows compaibility

printf "Building test\n"

CXX="g++"
if [ "$TRAVIS" = true ]; then 
    CXX="/usr/bin/g++-5"
fi
$CXX -Wall -fexceptions -fexpensive-optimizations -O3 -std=c++11  -c tests/test.cpp -o test.o
$CXX  -o test test.o  -s
if [ $? != 0 ]; then
    exit 1
fi  
rm *.o
printf "Running\n"
rm -rf learned
mkdir learned
./test
if [ $? != 0 ]; then
    exit 1
fi
rm test

printf "Done\n"
