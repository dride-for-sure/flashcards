package com.dennisjauernig.flashcards.model;

import com.dennisjauernig.flashcards.controller.model.QuestionDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder ( toBuilder = true )
public class Player {

 private UUID id;
 private String name;
 private List<QuestionDto> questionDtoList;
}
