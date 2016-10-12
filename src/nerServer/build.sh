rm nerServer.class
rm nerServer.jar
printf "Building NER server\n"
javac src/inputQueue.java
javac nerServer.java
jar cvfe nerServer.jar nerServer *
