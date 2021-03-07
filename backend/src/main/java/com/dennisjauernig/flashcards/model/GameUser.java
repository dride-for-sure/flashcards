package com.dennisjauernig.flashcards.model;

import com.dennisjauernig.flashcards.model.enums.GameUserRoles;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document ( collection = "gameUsers" )
public class GameUser {

 @Id
 private String name;
 private String password;
 private List<GameUserRoles> rolesList;
}
