(set -o igncr) 2>/dev/null && set -o igncr; # For Cygwin on Windows compaibility

rm -rf dist
mkdir dist
printf "Building genListing\n"

CXX="g++"
if [ "$TRAVIS" = true ]; then 
    CXX="/usr/bin/g++-5"
fi

$CXX -Wall -fexceptions -fexpensive-optimizations -O3 -std=c++11 -c main.cpp -o main.o
if [ $? != 0 ]; then
    exit 1
fi
$CXX -o dist/genListing main.o  -s  
if [ $? != 0 ]; then
    exit 1
fi


