#!/bin/bash
second=$7
minute=$6
hour=$5
day=$4
month=$3
year=$2

if [ $# != 1 ]; then
    ./scripts/getBins.sh $1 | ./scripts/extractBinName.awk | ./scripts/filter.bash $2 $3 $4 $5 $6 $7
fi
if [ $# == 1 ]; then
    ./scripts/getBins.sh $1 | ./scripts/extractBinName.awk
fi

