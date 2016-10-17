#!/bin/sh
day=$3
month=$2
year=$1


node queryBins --dataDir=data --dataPoint=nerTags --year=$year --month=$month --day=$day > $1$2$3

node averageData --file=$1$2$3 --Date="$year $month $day" > $year$month$day.json

rm $1$2$3
