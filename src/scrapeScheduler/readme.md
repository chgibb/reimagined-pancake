# scrapeScheduler.js
Used to perform a batch of requests to Twitters GET/search API endpoint.
Manages one or more instances of twitterScraper.  
[Also see twitterScraper documentation](https://github.com/chgibb/reimagined-pancake/blob/master/src/scrapeScheduler/readme.md)

Parameters:

Where someDir is the directory to save the results from all twitterScraper instances to.

```
--dataDir=someDir
```

Where n is the total number of twitterScrapers to run at once.
```
--threads=n
```

Where x is the total number of times to run n twitterScrapers before commiting the results all at once
to someDir.
```
--iterations=x
```

Example:
```
node scrapeScheduler --dataDir=data --threads=2 --iterations=3
```
Will run 2 twitterScraper instances at once, restarting each, each time each has exited for a total of 2x3=6 twitterScrapers.
With a maximum of 2 running at any given time. Will save the results to the directory named data once complete, and delete temporary storage generated.
Will create data if it does not exist, if data is already a tweet database, then results will be merged in.

