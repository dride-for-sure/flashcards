package com.dennisjauernig.flashcards.config;

import lombok.Data;
import org.springframework.context.annotation.Configuration;

@Configuration
@Data
public class GameConfig {

 public final int getOpenGamesDeleteDelay = 10;
 private final int maxQuestions = 25;
 private final int maxOpenGames = 20;
}
