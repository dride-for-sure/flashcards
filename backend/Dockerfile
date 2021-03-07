FROM openjdk:15
LABEL maintainer="DENNIS JAUERNIG <dennis@jauernig.email>"
ADD backend/target/mortal-coding-combat.jar app.jar
CMD ["sh", "-c", "java -Dserver.port=$PORT -Dspring.data.mongodb.uri=$MONGODB_URI -Dsecurity.jwt.secret=$JWT_SECRET -jar /app.jar"]