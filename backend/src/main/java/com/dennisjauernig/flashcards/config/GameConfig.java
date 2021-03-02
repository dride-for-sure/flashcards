package com.dennisjauernig.flashcards.config;

import lombok.Data;
import org.springframework.context.annotation.Configuration;

@Configuration
@Data
public class GameConfig {

 private final int maxQuestions = 25;

}