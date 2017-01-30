# reimagined-pancake  
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

Once you have acquired credentials from Twitter, a file named key.json must be created in the dep directory 
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
node scrapeScheduler --dataDir=data --threads=1 --iterations=1
```


