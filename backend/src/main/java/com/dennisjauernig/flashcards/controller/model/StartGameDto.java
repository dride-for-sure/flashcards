package com.dennisjauernig.flashcards.controller.model;

import com.dennisjauernig.flashcards.model.GameMaster;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StartGameDto {

 private GameMaster master;
 private Boolean start;

}
