FROM --platform=linux/amd64 openjdk:21
EXPOSE 8080
ADD backend/target/foodelicious.jar foodelicious.jar
ENTRYPOINT ["java", "-jar", "foodelicious.jar"]