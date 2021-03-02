package com.dennisjauernig.flashcards.model;

import com.dennisjauernig.flashcards.controller.model.QuestionDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Player {

 private String id;
 private String name;
 private List<QuestionDto> questionList;

}
