rm -rf dist
mkdir dist

printf "Building NER server\n"

find . -name "*.java" -type f | awk '{print substr($1,3);}' > srcs
javac -cp '.:jna.jar' @srcs
if [ $? != 0 ]; then
    exit 1
fi

printf "Bundling NER server\n"

jar cvfe dist/nerServer.jar nerServer * >/dev/null
if [ $? != 0 ]; then
    exit 1
fi

sh clean.sh

