# binDiscoverer

Engine for discovering bin files within a given date range. Unique from previous Typescript and bash implementations 
in that it enumerates all possible bins within the given range and tests for the existence of each. That is, as opposed to enumerating
the file system and discovering all bins within the directory through use of ls or similiar.

Tends to be slower than the bash version (res/scripts/getBinNames.bash) when discovering a relatively small number of bins.
Is not suitable when a date range is unknown. At the very least, a range in years must be specified. Most effective when range
an be narrowed down to a day.

(Not benchmarked properly against other implementations yet)

Usage:

./binDiscoverer dataDir year month day

Will print to stdout bins which exist in dataDir and whose dates are within the range Year-Month-Day 00:00:00 to Year-Month-Day 23:59:59.

month and day are optional. However, only specifiying a year will attempt to discover bins within the range Year-Jan-01 00:00:00 to Year-Dec-31 23:59:59.

Note: assumes all months have 31 days.
