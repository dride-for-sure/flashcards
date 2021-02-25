package com.dennisjauernig.flashcards.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Card {

 private UUID uuid;
 private int level;
 private String subject;
 private String question;
 private List<String> choices;
 private AnswerChosen solution;

}
