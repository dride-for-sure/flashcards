package com.dennisjauernig.flashcards.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder ( toBuilder = true )
@Document ( collection = "player" )
public class Player {

 private UUID uuid;
 private String name;
 private int points;
 private int cardsSolved;

}
