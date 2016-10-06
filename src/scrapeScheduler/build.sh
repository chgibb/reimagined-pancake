rm dist/*.js
./node_modules/.bin/tsc
./node_modules/.bin/browserify index.js --node -o dist/dist.js
#./node_modules/.bin/uglifyjs dist/dist.js -o dist/dist.js

rm *.js
rm req/*.js

#cp dist/dist.js ./



