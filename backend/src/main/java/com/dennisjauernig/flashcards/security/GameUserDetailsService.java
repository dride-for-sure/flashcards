package com.dennisjauernig.flashcards.security;

import com.dennisjauernig.flashcards.repository.UserDb;
import com.dennisjauernig.flashcards.security.model.GameUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class GameUserDetailsService implements UserDetailsService {

 private final UserDb userDb;

 @Autowired
 public GameUserDetailsService ( UserDb userDb ) {
  this.userDb = userDb;
 }

 @Override
 public UserDetails loadUserByUsername ( String name ) throws UsernameNotFoundException {
  GameUser gameUser = userDb.findById( name )
                            .orElseThrow( () -> new UsernameNotFoundException( "This user: " + name + " does not exists" ) );
  return User.builder()
             .username( gameUser.getName() )
             .password( gameUser.getPassword() )
             .authorities( gameUser.getRoles()
                                   .stream()
                                   .map( gameUserRoles -> new SimpleGrantedAuthority( gameUserRoles.toString() ) )
                                   .collect( Collectors.toList() ) )
             .build();
 }
}