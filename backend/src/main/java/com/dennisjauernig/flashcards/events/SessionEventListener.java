package com.dennisjauernig.flashcards.events;

import com.dennisjauernig.flashcards.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

public class SessionEventListener {

 private final SessionService sessionService;

 @Autowired
 public SessionEventListener (
         SessionService sessionService ) {
  this.sessionService = sessionService;
 }

 // √ Trigger on disconnect -> cleanup games
 @EventListener
 public void handleSessionDisconnect ( SessionDisconnectEvent event ) {
  sessionService.deregisterPlayer( event.getSessionId() );
 }
}
