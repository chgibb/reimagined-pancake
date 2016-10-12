rm dist/*.js
printf "Building scrape scheduler\n"
./node_modules/.bin/tsc
printf "Bundling scrape scheduler\n"
./node_modules/.bin/browserify index.js --node -o dist/dist.js

rm *.js
rm req/*.js




