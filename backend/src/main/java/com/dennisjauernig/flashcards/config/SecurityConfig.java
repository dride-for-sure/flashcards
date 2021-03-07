package com.dennisjauernig.flashcards.config;

import com.dennisjauernig.flashcards.filter.JwtRequestFilter;
import com.dennisjauernig.flashcards.service.GameUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

 private final GameUserDetailsService gameUserDetailsService;
 private final JwtRequestFilter jwtRequestFilter;

 @Autowired
 public SecurityConfig (
         GameUserDetailsService gameUserDetailsService,
         JwtRequestFilter jwtRequestFilter ) {
  this.gameUserDetailsService = gameUserDetailsService;
  this.jwtRequestFilter = jwtRequestFilter;
 }

 @Override
 protected void configure ( AuthenticationManagerBuilder auth ) throws Exception {
  auth.userDetailsService( gameUserDetailsService );
 }

 @Override
 protected void configure ( HttpSecurity http ) throws Exception {
  http.csrf().disable()
      .authorizeRequests()
      .antMatchers( "/authenticate" ).permitAll()
      .antMatchers( "/api/questions/**", "/api/games/**" ).authenticated()
      .and()
      .sessionManagement().sessionCreationPolicy( SessionCreationPolicy.STATELESS )
      .and()
      .addFilterBefore( jwtRequestFilter, UsernamePasswordAuthenticationFilter.class );
 }

 @Bean
 public PasswordEncoder getPasswordEncoder () {
  return new BCryptPasswordEncoder();
 }

 @Override
 @Bean
 public AuthenticationManager authenticationManagerBean () throws Exception {
  return super.authenticationManagerBean();
 }

}
