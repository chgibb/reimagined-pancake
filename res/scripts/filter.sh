#!/bin/bash
if [ $# == 0 ]; then
   echo $0
   exit
fi
if [ $# == 1 ]; then
    path=/$1/
fi
if [ $# == 2 ]; then
    path=/$1/$2/
fi
if [ $# == 3 ]; then
    path=/$1/$2/$3/
fi
if [ $# == 4 ]; then
    path=/$1/$2/$3/$4/
fi
if [ $# == 5 ]; then
    path=/$1/$2/$3/$4/$5/
fi
if [ $# == 6 ]; then
     path=/$1/$2/$3/$4/$5/$6/
fi
grep $path
