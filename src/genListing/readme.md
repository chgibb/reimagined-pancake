# genListing

Used to generate a bin listing within a given range. Is more performant than [genListingNoDate]() when a date range is desired
and when data is very dense and large.

Parameters:

Where DataDir is the directory where the tweet bins have been saved to.  
Year is the year (4 digits).  
Month is the 3 letter month.  
Day is the 2 digit day.  
Hour is the 2 digit hour (24 hour format).  
Minute is the 2 digit minute.  
Second is the 2 digit Second.
```
./geListing DataDir Year Month Day Hour Minute Second
```

Range to list will be inferred based on the parameters passed.
For example:
```
./getListing DataDir 2017 Feb 01 01 01 > 2017Feb010101Listing
```
Will generate a listing between 2017 Feb 01 01:01:00 and 2017 Feb 01 01:01:59 (inclusive) and save it
to the file named 2017Feb010101Listing.

```
./getListing DataDir 2017 > 2017Listing
```
Will generate a listing between 2017 Jan 01 01:01:00 to 2017 Dec 31 23:59:59 (inclusive) and save it to the file
named 2017Listing.

```
./getListing DataDir 2017 Feb 01 01 01 01 > 2017Feb01010101Listing
```
Will generate a listing for 2017 Feb 01 01:01:01 and save it to the file named 2017Feb01010101Listing
