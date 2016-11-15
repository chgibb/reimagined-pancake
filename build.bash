#!/bin/bash
sh clean.sh
cd src
for d in */ ; do
    cd $d
    if [ -f "build.sh" ]; then
        sh build.sh
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
cp -R dist/* dep
cp -R res/* dep
rm src/req/*.js
