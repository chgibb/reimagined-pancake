rm -rf dist
mkdir dist

printf "Bundling scrape scheduler\n"
./../../node_modules/.bin/browserify index.js --node -o dist/dist.js

rm *.js
rm req/*.js




