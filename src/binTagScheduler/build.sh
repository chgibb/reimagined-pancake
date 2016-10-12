rm dist/*.js
printf "Building bin tag scheduler\n"
./node_modules/.bin/tsc
printf "Bundling bin tag scheduler\n"
./node_modules/.bin/browserify index.js --node -o dist/dist.js

rm *.js
rm req/*.js

