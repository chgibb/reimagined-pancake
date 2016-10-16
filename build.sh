rm -rf dist
mkdir dist

rm dep/*.js
rm dep/*.jar



cd src
cd twitterScraper
sh build.sh

cd ../
cd ../

cp src/twitterScraper/dist/dist.js dist/twitterScraper.js
cp src/twitterScraper/dist/dist.js dep/twitterScraper.js



cd src
cd scrapeScheduler
sh build.sh

cd ../
cd ../

cp src/scrapeScheduler/dist/dist.js dist/scrapeScheduler.js
cp src/scrapeScheduler/dist/dist.js dep/scrapeScheduler.js



cd src
cd binTagger
sh build.sh

cd ../
cd ../

cp src/binTagger/dist/dist.js dist/binTagger.js
cp src/binTagger/dist/dist.js dep/binTagger.js



cd src
cd binTagScheduler
sh build.sh

cd ../
cd ../

cp src/binTagScheduler/dist/dist.js dist/binTagScheduler.js
cp src/binTagScheduler/dist/dist.js dep/binTagScheduler.js



cd src
cd queryBins
sh build.sh
cd ../
cd ../

cp src/queryBins/dist/dist.js dist/queryBins.js
cp src/queryBins/dist/dist.js dep/queryBins.js






cd src
cd siteServer
sh build.sh
cd ../
cd ../

cp src/siteServer/dist/dist.js dist/siteServer.js
cp src/siteServer/dist/dist.js dep/siteServer.js




cd src
cd siteClient
sh build.sh
cd ../
cd ../
rm -rf dep/public
mkdir dep/public
cp src/siteClient/dist/dist.js dist/siteClient.js
cp src/siteClient/dist/dist.js dep/public/siteClient.js
cp src/siteClient/index.html dep/index.html



cd src
cd nerServer
printf "Building NER Server\n"
sh build.sh > /dev/null
printf "Bundling NER Server\n"

cd ../
cd ../

cp src/nerServer/nerServer.jar dist/nerServer.jar
cp src/nerServer/nerServer.jar dep/nerServer.jar
cp -R res/* dep

rm src/req/*.js
