rm -rf dist
mkdir dist

printf "Bundling tag applicator\n"
./../../node_modules/.bin/browserify index.js --node -o dist/dist.js --ignore-missing
if [ $? != 0 ]; then
    exit 1
fi
