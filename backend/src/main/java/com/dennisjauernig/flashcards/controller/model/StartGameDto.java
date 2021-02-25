package com.dennisjauernig.flashcards.controller.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StartGameDto {

 private UUID uuid;
 private int level;
 private UUID gameMaster;

}
