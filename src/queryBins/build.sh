rm dist/*.js

./node_modules/.bin/tsc
./node_modules/.bin/browserify index.js --node -o dist/dist.js

rm *.js
rm req/*.js

