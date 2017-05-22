(set -o igncr) 2>/dev/null && set -o igncr; # For Cygwin on Windows compaibility

rm -rf dist
mkdir dist

printf "Bundling bin querier\n"
./../../node_modules/.bin/browserify index.js --node -o dist/dist.js
if [ $? != 0 ]; then
    exit 1
fi

