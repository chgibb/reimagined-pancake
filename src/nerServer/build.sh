rm -rf dist
mkdir dist

printf "Building NER server\n"

find . -name "*.java" -type f | awk '{print substr($1,3);}' > srcs
javac -cp '.:jna.jar' @srcs

printf "Bundling NER server\n"

jar cvfe dist/nerServer.jar nerServer * >/dev/null

