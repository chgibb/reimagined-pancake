#!/bin/sh
second=$7
minute=$6
hour=$5
day=$4
month=$3
year=$2

./getBins.sh $1 | ./extractBinName.awk | ./filter.sh $2 $3 $4 $5 $6 $7
