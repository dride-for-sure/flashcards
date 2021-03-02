package com.dennisjauernig.flashcards.controller.model;

import com.dennisjauernig.flashcards.model.SelectedAnswer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReceivedAnswerDto {

 private String id;
 private SelectedAnswer selected;

}
