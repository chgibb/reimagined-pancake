rm -rf dist
mkdir dist

rm dep/*.js
rm dep/*.jar

sh clean.sh



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
cd tagApplicatorScheduler
sh build.sh

cd ../
cd ../

cp src/tagApplicatorScheduler/dist/dist.js dist/tagApplicatorScheduler.js
cp src/tagApplicatorScheduler/dist/dist.js dep/tagApplicatorScheduler.js




cd src
cd queryBins
sh build.sh
cd ../
cd ../

cp src/queryBins/dist/dist.js dist/queryBins.js
cp src/queryBins/dist/dist.js dep/queryBins.js




cd src
cd averageData
sh build.sh
cd ../
cd ../
cp src/averageData/dist/dist.js dist/averageData.js
cp src/averageData/dist/dist.js dep/averageData.js

cd src
cd tagApplicatorTS
sh build.sh
cd ../
cd ../
cp src/tagApplicatorTS/dist/dist.js dist/tagApplicator.js
cp src/tagApplicatorTS/dist/dist.js dep/tagApplicator.js

cd src
cd binDiscoverer
cd binDiscoverer
sh build.sh
cd ../
cd ../
cd ../
cp src/binDiscoverer/binDiscoverer/binDiscoverer dist/binDiscoverer
cp src/binDiscoverer/binDiscoverer/binDiscoverer dep/binDiscoverer

cd src
cd tagApplicator
sh build.sh
cd ../
cd ../
cp src/tagApplicator/tagApplicator dist/tagApplicator
cp src/tagApplicator/tagApplicator dep/tagApplicator



cd src
cd nerServer
sh build.sh
cd ../
cd ../
cp src/nerServer/nerServer.jar dist/nerServer.jar
cp src/nerServer/nerServer.jar dep/nerServer.jar
cp -R res/* dep

rm src/req/*.js
