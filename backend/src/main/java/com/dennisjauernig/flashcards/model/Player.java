package com.dennisjauernig.flashcards.model;

import com.dennisjauernig.flashcards.controller.model.QuestionDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.security.Principal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder ( toBuilder = true )
public class Player {

 private Principal id;
 private String name;
 private List<QuestionDto> questionDtoList;
}
