# genListingNoDate.js

Used to generate a bin listing for a specified folder. Is more performant than [genListing](https://github.com/chgibb/reimagined-pancake/blob/master/src/genListing/readme.md)
when a folder is small or has data with spread out dates or dates which may be unknown.

Example:
```
node genListingNoDate data > dataListing
```
Will generate a listing for the data folder and save it to the file named dataListing.

Note: Unlike [genListing](https://github.com/chgibb/reimagined-pancake/blob/master/src/genListing/readme.md),
this utility will list EVERYTHING in the specified folder. If you accidentally point it at a folder that has not been generated
by other utilities to be a tweet database, or a tweet database that has been manually edited, then passing that listing into other tools may cause errors.