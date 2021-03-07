package com.dennisjauernig.flashcards.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

 @Override
 protected void configure ( AuthenticationManagerBuilder auth ) throws Exception {
  auth.inMemoryAuthentication()
      .withUser( "test" )
      .password( "test" )
      .roles( "ADMIN" );
 }

 @Override
 protected void configure ( HttpSecurity http ) throws Exception {
  http.authorizeRequests()
      .antMatchers( "/api/lobby", "/api/game/**", "/api/user/**", "/topic/**" ).permitAll()
      .antMatchers( "/api/questions/**" ).hasRole( "ADMIN" )
      .antMatchers( "/api/games/**" ).hasRole( "ADMIN" )
      .and().formLogin();
 }

 @Bean
 public PasswordEncoder getPasswordEncoder () {
  return NoOpPasswordEncoder.getInstance(); // Clear Text Password Encoder for testing only
 }

}
