(set -o igncr) 2>/dev/null && set -o igncr; # For Cygwin on Windows compaibility

rm -rf dist
mkdir dist
printf "Building binMerger\n"
if [[ "$OSTYPE" == "cygwin" ]]; then
    ./build.bat
    exit "$?"
fi
CXX="g++"
if [ "$TRAVIS" = true ]; then 
    CXX="/usr/bin/g++-5"
fi
$CXX -Wall -fexceptions -fexpensive-optimizations -O3 -std=c++11  -c main.cpp -o main.o
if [ $? != 0 ]; then
    exit 1
fi

$CXX -static -static-libgcc -static-libstdc++ -o dist/binMerger main.o  -s
if [ $? != 0 ]; then
    exit 1
fi

exit 0
