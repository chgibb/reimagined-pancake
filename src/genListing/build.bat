IF DEFINED APPVEYOR (
    @set path="%path%;C:\mingw\bin"
)
g++ -Wall -fexceptions -fexpensive-optimizations -O3 -std=c++11 -c main.cpp -o main.o
g++ -static -static-libgcc -static-libstdc++ -o dist/genListing main.o  -s  
@EXIT /b %ERRORLEVEL%
