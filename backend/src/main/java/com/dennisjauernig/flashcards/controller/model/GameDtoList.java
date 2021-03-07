package com.dennisjauernig.flashcards.controller.model;

import com.dennisjauernig.flashcards.controller.model.enums.DtoType;
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

 private final DtoType type = DtoType.GAMELIST;
 private List<GameDto> gameDtoList;
}
