rm nerServer.class
rm nerServer.jar
javac src/inputQueue.java
javac nerServer.java
jar cvfe nerServer.jar nerServer *
