package com.dennisjauernig.flashcards.controller.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QuestionDtoList {

 private final DtoType dtoType = DtoType.QUESTIONLIST;
 private List<QuestionDto> questionDtoList;
}
