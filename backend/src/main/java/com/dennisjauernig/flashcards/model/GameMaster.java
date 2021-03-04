package com.dennisjauernig.flashcards.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.security.Principal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GameMaster {

 private Principal id;
 private String name;
}
