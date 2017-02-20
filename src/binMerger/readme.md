# binMerger
Merges two tweet databases together, filtering out duplicate tweets.

Parameters:  
src is the name of the source database.  
dest is the name of the destination database.  
srcListing is a listing file for the date range from src that will be merged into dest.  
Note: Even if you want to merge the entirety of src into dest, a listing file for src must be provided. Only what is specified in the listing file will be merged.

```
./binMerger src dest srcListing
``` 
Will output to stdout a listing of each bin in dest that was modified by the merging operation.

Note: that as tweet databases are just folders, src and dest can be given in terms of local or absolute paths.