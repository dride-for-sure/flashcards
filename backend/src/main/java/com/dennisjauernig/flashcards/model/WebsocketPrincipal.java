package com.dennisjauernig.flashcards.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.security.Principal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WebsocketPrincipal implements Principal {

 private String name;
}
