package com.dennisjauernig.flashcards.controller.model;

import com.dennisjauernig.flashcards.controller.model.enums.DtoType;
import com.dennisjauernig.flashcards.model.TopicDetails;
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
 private List<TopicDetails> topicDetailsList;
 private List<GameDto> gameDtoList;
}
