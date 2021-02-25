package com.dennisjauernig.flashcards.controller.model;

import com.dennisjauernig.flashcards.model.AnswerChosen;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReceivedAnswerDto {

 private UUID uuid;
 private AnswerChosen answerChosen;

}
