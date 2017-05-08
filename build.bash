#!/bin/bash
(set -o igncr) 2>/dev/null && set -o igncr;
bash clean.bash
./node_modules/.bin/tsc
if [ $? != 0 ]; then
    bash clean.bash
    exit 1
fi
mkdir dist
cd src
for d in */ ; do
    cd $d
    if [ -f "build.sh" ]; then
        sh build.sh
    fi
    if [ -f "build.bash" ]; then
        bash build.bash
    fi
    if [ $? != 0 ]; then
        cd ../
        cd ../
        bash clean.bash
        exit 1
    fi
    cd ../
done

for d in */ ; do
    cd $d
    if [ -d "dist" ]; then
        cd dist
        for f in *; do
            resFileName=$(echo $d $f | awk '{gsub("dist",$1,$2);gsub("/","",$2);print $2;}')
            cp * ../../../dist/$resFileName
        done
        cd ../
    fi
    cd ../
done
cd ../
rsync -vr --exclude '*.md' dist/* dep/
rsync -vr res/* dep/

for f in $(find src -name '*.ts'); 
do
    artifact=$(echo $f | awk '{gsub("\\.ts",".js");print}')
	rm $artifact
done