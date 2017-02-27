rm -rf dist
mkdir dist

printf "Bundling twitter miner\n"
./../../node_modules/.bin/browserify index.js --node -o dist/dist.js
if [ $? != 0 ]; then
    exit 1
fi
