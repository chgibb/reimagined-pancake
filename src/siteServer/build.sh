rm -rf dist
mkdir dist
printf "Building server\n"
./node_modules/.bin/tsc
printf "Bundling server\n"
./node_modules/.bin/browserify index.js --node -o dist/dist.js
rm *.js
rm req/*.js


