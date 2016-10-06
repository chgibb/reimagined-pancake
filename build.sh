rm -rf dist
mkdir dist

rm dep/*.js
rm dep/*.jar

printf "Building twitter scrapper\n"

cd src
cd twitterScraper
sh build.sh

cd ../
cd ../

cp src/twitterScraper/dist/dist.js dist/twitterScraper.js
cp src/twitterScraper/dist/dist.js dep/twitterScraper.js

printf "Building twitter scrapper scheduler\n"

cd src
cd scrapeScheduler
sh build.sh

cd ../
cd ../

cp src/scrapeScheduler/dist/dist.js dist/scrapeScheduler.js
cp src/scrapeScheduler/dist/dist.js dep/scrapeScheduler.js

printf "Building bin tagger\n";

cd src
cd binTagger
sh build.sh

cd ../
cd ../

cp src/binTagger/dist/dist.js dist/binTagger.js
cp src/binTagger/dist/dist.js dep/binTagger.js

printf "Building bin tag scheduler\n";

cd src
cd binTagScheduler
sh build.sh

cd ../
cd ../

cp src/binTagScheduler/dist/dist.js dist/binTagScheduler.js
cp src/binTagScheduler/dist/dist.js dep/binTagScheduler.js

printf "Building bin querier\n";

cd src
cd queryBins
sh build.sh
cd ../
cd ../

cp src/queryBins/dist/dist.js dist/queryBins.js
cp src/queryBins/dist/dist.js dep/queryBins.js




printf "Building site server\n";

cd src
cd siteServer
sh build.sh
cd ../
cd ../

cp src/siteServer/dist/dist.js dist/siteServer.js
cp src/siteServer/dist/dist.js dep/siteServer.js


printf "Building site client\n";

cd src
cd siteClient
sh build.sh
cd ../
cd ../

cp src/siteClient/dist/dist.js dist/siteClient.js
cp src/siteClient/dist/dist.js dep/siteClient.js

printf "Building NER server\n";

cd src
cd nerServer
sh build.sh > /dev/null

cd ../
cd ../

cp src/nerServer/nerServer.jar dist/nerServer.jar
cp src/nerServer/nerServer.jar dep/nerServer.jar
cp -R res/* dep

rm src/req/*.js
