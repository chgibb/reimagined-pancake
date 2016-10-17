rm -rf dist
mkdir dist
printf "Building data averager\n"
./node_modules/.bin/tsc
printf "Bundling data averager\n"
./node_modules/.bin/browserify index.js --node -o dist/dist.js

rm *.js
rm req/*.js

