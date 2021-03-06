# reimagined-pancake  
## Note: this project is under active development. Contributors (especially to documentation) are welcome.
[![Build Status](https://travis-ci.org/chgibb/reimagined-pancake.svg?branch=master)](https://travis-ci.org/chgibb/reimagined-pancake)[![Dependency Status](https://gemnasium.com/badges/github.com/chgibb/reimagined-pancake.svg)](https://gemnasium.com/github.com/chgibb/reimagined-pancake)  
Author: Chris Gibb  
Twitter scraper and natural language processing platform.  

Command line interface (CLI) based platform for high volume Twitter analytics.

# Software Requirements:  
- Linux based Operating System (OS)
- [NodeJS](https://nodejs.org/en/download/)
- [Java](http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html) (Optional, only needed for built in text analytics)
- Familiarity with the CLI

# Minimum Recommended Hardware Requirements
- Intel Celeron 2x Core @ 1.4GhZ
- 2GB RAM
- 500GB - 1TB disk space (depends on length of use and intentions)

# Building From Source
From the directory where the source was cloned into:  

Install (local) dependencies
```
bash install.bash
```
Assumes that javac, g++ and node are installed globally.

Build everything
```
bash build.bash
```
# Usage

## Authorization
The platform requires Twitter developer credentials in order to make requests
to the Twitter API. It uses Twitter's application only authorization. See <https://dev.twitter.com/oauth/application-only>
for more details.

Once you have acquired credentials from Twitter, a file named keys.json must be created in the dep directory 
(or wherever you have placed the built application). It should look like this:
```
{
    "consumerKey" : "",
    "consumerSecret" : "",
    "requestToken" : "",
    "requestTokenSecret" : "",
    "accessToken" : "",
    "accessTokenSecret" : ""
}
```
## Acquiring Tweets
In order to run a round of mining:
```
node tweetScheduler --dataDir=data --threads=1 --iterations=1
```
See [tweetScheduler documentation](https://github.com/chgibb/reimagined-pancake/blob/master/src/tweetScheduler/readme.md)
for more information.

## Learning About Tweets
By default, the platform comes with a wrapper over Stanford Natural Language Processing Group's
Named Entity Recognizer (SNER) in the form of nerLearner.jar. See <http://nlp.stanford.edu/software/CRF-NER.shtml> for more information.
It builds a database of recognized words from SNER and allows other utilities to apply them to tweets in order
to filter out words of interest. Some defaults in running nerLearner.jar are provided in runNerLearner.sh.
nerLearner.sh takes a single argument, that is a path to a file containing a list of tweet bins to operate on.

In order to learn about words of interest (people, places, organizations ,mentions and hashtags) in tweets collected
between January 1 2017 12:00am and January 1 2017 11:59pm, first generate a bin listing for that range. Assuming tweets have been saved into 
a directory named data:

```
./genListing data 2017 Jan 01 > Jan012017Listing
sh runNerLearner.sh Jan012017Listing
rm Jan012017Listing
```

runNerLearner.sh by default will output the results to classifiers/learned. If its output directory does
not exist, it will produce no output.

## All Together Now
```
node tweetScheduler --dataDir=data --threads=1 --iterations=1
sh runNerLearner.sh modBinsdata
rm modBinsData
```
Will run a round of mining and learn about only new tweets that have been acquired by that round of mining.

## Tagging Tweets
In order to visualize and analyze tweets, they need to be tagged with the words of interest generated from nerLearner.  
You should always generate a fresh listing and run tagging before you generate visualization files in order to ensure that the freshest data is available (assuming you are acquiring tweets continuously).

```
./tagApplicator Jan2017Listing classifiers/learned
```
Assuming that words of interest are being written to classifiers/learned (the default).

## Generating Files for Visualization
Extract words of interest and sentiment information
```
node extract --listing=Jan2017Listing > Jan2017Dump
```

Average out word occurences and average sentiment
```
node average --file=Jan2017Dump --date=Jan2017 > Jan2017.json
```

```Jan2017.json``` can now be visualized and queried.
