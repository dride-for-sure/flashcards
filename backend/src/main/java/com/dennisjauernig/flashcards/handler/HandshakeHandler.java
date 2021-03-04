package com.dennisjauernig.flashcards.handler;

import com.dennisjauernig.flashcards.model.WebsocketPrincipal;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.util.Map;
import java.util.UUID;

public class HandshakeHandler extends DefaultHandshakeHandler {
 @Override
 protected WebsocketPrincipal determineUser (
         ServerHttpRequest request,
         WebSocketHandler wsHandler,
         Map<String, Object> attributes ) {

  return new WebsocketPrincipal( UUID.randomUUID().toString() );
 }
}

