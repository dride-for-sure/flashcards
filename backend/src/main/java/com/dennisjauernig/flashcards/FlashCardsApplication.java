package com.dennisjauernig.flashcards;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties
public class FlashCardsApplication {

 public static void main (String[] args) {
	SpringApplication.run( FlashCardsApplication.class, args );
 }

}
