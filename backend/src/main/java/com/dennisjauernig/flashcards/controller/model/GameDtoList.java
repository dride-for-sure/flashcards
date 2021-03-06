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
public class GameDtoList {

 private final DtoType dtoType = DtoType.GAMELIST;
 private List<GameDto> gameDtoList;
}
