rm dist/*.js
printf "Building site client\n"
./node_modules/.bin/tsc
printf "Bundling site client\n"
./node_modules/.bin/browserify index.js --debug -o  dist/dist.js

rm *.js
rm req/*.js
