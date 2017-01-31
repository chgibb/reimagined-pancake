# twitterScraper
Used to perform requests to Twitters GET/search API endpoint.  
Note: Always requests results from Twitter in mixed mode. See <https://dev.twitter.com/rest/reference/get/search/tweets>
for more information. Also always makes request for English language(en) tweets. See the same link
for more information.

Optional:
A file named defaultQueries.json in the same working directory. 
Of the form:
```
[
    "aWord"
]
```
Will submit the query "aWord" to Twitter. In the default distribution, a defaultQueries.json
file containing the 11 most common English language words is provided.

Parameters:

Where someDir is the directory to save results to.
```
--dataDir=someDir
```

Also supports variadic arguments off the command line. i.e.:
```
node twitterScraper --dataDir=data cat dog house
```
Will submit the querys cat, dog and house to Twitter as well as the array contents of defaultQueries.json, saving the results
to the directory data.
