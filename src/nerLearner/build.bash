rm -rf dist
mkdir dist

printf "Building NER Learner\n"

find . -name "*.java" -type f | awk '{print substr($1,3);}' > srcs
javac @srcs
if [ $? != 0 ]; then
    exit 1
fi

printf "Bundling NER Learner\n"

jar cvfe dist/nerLearner.jar nerLearner * >/dev/null
if [ $? != 0 ]; then
    exit 1
fi

sh clean.sh

