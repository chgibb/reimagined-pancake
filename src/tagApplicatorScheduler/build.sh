rm -rf dist
mkdir dist
printf "Building tag applicator scheduler\n"
./node_modules/.bin/tsc
printf "Bundling tag applicator scheduler\n"
./node_modules/.bin/browserify index.js --node -o dist/dist.js

rm *.js
rm req/*.js

