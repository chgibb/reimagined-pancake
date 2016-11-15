rm -rf forDist
mkdir forDist
printf "Building charter\n"
./node_modules/.bin/tsc
printf "Bundling charter\n"
./node_modules/.bin/browserify index.js --node -o forDist/index.js --ignore-missing
./node_modules/.bin/browserify main.js --node --debug -o forDist/main.js --ignore-missing

cp index.html forDist

cp *.json forDist

cp jsreq/*.js forDist

rm *.js
rm req/*.js

cp package.json forDist
electron-packager ./forDist/ --platform linux --arch x64 --overwrite --ignore=node_modules --ignore=.jsx --ignore=build.sh --ignore=src --ignore=vcs  --ignore=.sh

