(set -o igncr) 2>/dev/null && set -o igncr; # For Cygwin on Windows compaibility

rm -rf forDist
mkdir forDist
printf "Bundling charter\n"
./../../node_modules/.bin/browserify index.js --node -o forDist/index.js --ignore-missing
if [ $? != 0 ]; then
    exit 1
fi
./../../node_modules/.bin/browserify main.js --node --debug -o forDist/main.js --ignore-missing
if [ $? != 0 ]; then
    exit 1
fi
cp index.html forDist

cp *.json forDist

cp jsreq/*.js forDist


cp package.json forDist
electron-packager ./forDist/ --platform linux --arch x64 --overwrite --ignore=node_modules --ignore=.jsx --ignore=build.sh --ignore=src --ignore=vcs  --ignore=.sh
if [ $? != 0 ]; then
    exit 1
fi
