# nerLearner.jar
Used to extract words of interest(hashtags, mentions, people, places, organizations) from a given set of tweets.

Parameters:

The path to the trained classifier to use for Stanfor NER tagging.
See <http://nlp.stanford.edu/software/crf-faq.shtml> for more information about 
classifiers and how to make your own. Several classifiers come bundled by default under the
classifiers directory.

```
--trainedClassifier=
```

Directory to use as the root directory to write learned words into.

```
--learnedClassifierDirectory=
```

Bin listing file to use to extract tweets.
```
--binList=
```

```
java -jar nerLearner.jar --trainedClassifier=classifiers/ner-eng-ie.crf-3-all2008.ser.gz --learnedClassifierDirectory=classifiers/learned --binList=someTweetListing
```