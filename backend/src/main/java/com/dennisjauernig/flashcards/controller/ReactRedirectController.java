package com.dennisjauernig.flashcards.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping ( value = {
        "/",
        "/{x:[\\w\\-]+}",
        "/{x:^(?!api?\\$).*$}/**/{y:[\\w\\-]+}",
        "/{x:^(?!user?\\$).*$}/**/{y:[\\w\\-]+}",
        "/{x:^(?!topic?\\$).*$}/**/{y:[\\w\\-]+}"} )
public class ReactRedirectController {

 public String getIndex ( HttpServletRequest request ) {
  return "/index.html";
 }
}
