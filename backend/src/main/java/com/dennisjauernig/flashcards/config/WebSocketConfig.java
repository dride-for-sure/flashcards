package com.dennisjauernig.flashcards.config;

import com.dennisjauernig.flashcards.events.SessionEventListener;
import com.dennisjauernig.flashcards.service.SessionService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Description;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

 @Bean
 @Description ( "Register new player sessions" )
 public SessionEventListener sessionEventListener ( SessionService sessionService ) {
  return new SessionEventListener( sessionService );
 }

 @Override
 public void configureMessageBroker ( MessageBrokerRegistry registry ) {
  registry.enableSimpleBroker( "/topic" );
  registry.setApplicationDestinationPrefixes( "/api" );
 }

 @Override
 public void registerStompEndpoints ( StompEndpointRegistry registry ) {
  registry.addEndpoint( "/ws" );
  registry.addEndpoint( "/ws" ).withSockJS();
 }
}
