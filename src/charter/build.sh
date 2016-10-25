rm -rf dist
mkdir dist
printf "Building charter\n"
./node_modules/.bin/tsc
printf "Bundling charter\n"
./node_modules/.bin/browserify index.js --node -o dist/index.js --ignore-missing
./node_modules/.bin/browserify main.js --node --debug -o dist/main.js --ignore-missing

cp index.html dist

cp *.json dist

cp jsreq/*.js dist

rm *.js
rm req/*.js

cp package.json dist
electron-packager ./dist/ --platform linux --arch x64 --overwrite --ignore=node_modules --ignore=.jsx --ignore=build.sh --ignore=src --ignore=vcs  --ignore=.sh

