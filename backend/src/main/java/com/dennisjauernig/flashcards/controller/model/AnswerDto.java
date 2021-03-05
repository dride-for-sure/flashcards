package com.dennisjauernig.flashcards.controller.model;

import com.dennisjauernig.flashcards.model.enums.Solution;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnswerDto {

 private UUID id;
 private Solution selectedSolution;
}
