package com.dennisjauernig.flashcards.events;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpAttributesContextHolder;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

public class PresenceEventListener {

 private final List<String> sessions = new CopyOnWriteArrayList<>();

 @EventListener
 private void handleSessionConnected ( SessionConnectEvent session ) {
  sessions.add( SimpAttributesContextHolder.currentAttributes().getSessionId() );
 }

 @EventListener
 private void handleSessionDisconnect ( SessionDisconnectEvent session ) {
  sessions.remove( SimpAttributesContextHolder.currentAttributes().getSessionId() );
 }
}
