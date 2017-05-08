(set -o igncr) 2>/dev/null && set -o igncr;
rm -rf dist
mkdir dist

printf "Bundling tweet scheduler\n"
./../../node_modules/.bin/browserify index.js --node -o dist/dist.js
if [ $? != 0 ]; then
    exit 1
fi

