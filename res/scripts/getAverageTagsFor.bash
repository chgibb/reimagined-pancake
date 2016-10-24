#!/bin/bash
day=$3
month=$2
year=$1
monthNum="00"
if [ $month == "Jan" ]; then
   monthNum="01"
fi
if [ $month == "Feb" ]; then
   monthNum="02"
fi
if [ $month == "Mar" ]; then
   monthNum="03"
fi
if [ $month == "Apr" ]; then
   monthNum="04"
fi
if [ $month == "May" ]; then
   monthNum="05"
fi
if [ $month == "Jun" ]; then
   monthNum="06"
fi
if [ $month == "Jul" ]; then
   monthNum="07"
fi
if [ $month == "Aug" ]; then
   monthNum="08"
fi
if [ $month == "Sep" ]; then
   monthNum="09"
fi
if [ $month == "Oct" ]; then
   monthNum="10"
fi
if [ $month == "Nov" ]; then
   monthNum="11"
fi
if [ $month == "Dec" ]; then
   monthNum="12"
fi

node queryBins --dataDir=data --dataPoint=nerTags --year=$year --month=$month --day=$day > $1$2$3

node averageData --file=$1$2$3 --date="$year-$month-$day" > $year$month$day.json

rm $1$2$3
