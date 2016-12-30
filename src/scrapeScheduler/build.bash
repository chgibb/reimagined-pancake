rm -rf dist
mkdir dist

printf "Bundling scrape scheduler\n"
./../../node_modules/.bin/browserify index.js --node -o dist/dist.js
if [ $? != 0 ]; then
    exit 1
fi
