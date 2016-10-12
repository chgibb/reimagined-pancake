rm dist/*.js
printf "Building twitter scraper\n"
./node_modules/.bin/tsc
printf "Bundling twitter scraper\n"
./node_modules/.bin/browserify index.js --node -o dist/dist.js

rm *.js
rm req/*.js

