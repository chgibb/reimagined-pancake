rm -rf dist
mkdir dist
printf "Building bin querier\n"
./node_modules/.bin/tsc
printf "Bundling bin querier\n"
./node_modules/.bin/browserify index.js --node -o dist/dist.js

rm *.js
rm req/*.js

