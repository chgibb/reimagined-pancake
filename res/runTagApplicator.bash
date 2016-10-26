#!/bin/bash
if [ $# == 0 ]; then
    printf "Insucfficient arguments\n";
    exit
fi
if [ $# == 1 ]; then
    nohup node --max_old_space_size=11000 tagApplicator --dataDir=$1 &
fi
if [ $# == 2 ]; then
    nohup node --max_old_space_size=11000 tagApplicator --dataDir=$1 --year=$2 &
fi
if [ $# == 3 ]; then
    nohup node --max_old_space_size=11000 tagApplicator --dataDir=$1 --year=$2 --month=$3 &
fi
if [ $# == 4 ]; then
    nohup node --max_old_space_size=11000 tagApplicator --dataDir=$1 --year=$2 --month=$3 --day=$4 &
fi
if [ $# == 5 ]; then
    nohup node --max_old_space_size=11000 tagApplicator --dataDir=$1 --year=$2 --month=$3 --day=$4 --hour=$5 &
fi

