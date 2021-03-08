package com.dennisjauernig.flashcards.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class ReactRedirectController {

 @RequestMapping ( value = {
         "/",
         "/{x:[\\w\\-]+}",
         "/{x:^(?!ws$).*$}/{y:(.*)}",
         "/{x:^(?!topic$).*$}/**/{y:[\\w\\-]+}",
         "/{x:^(?!api$).*$}/**/{y:[\\w\\-]+}"} )
 public String getIndex ( HttpServletRequest request ) {
  return "/index.html";
 }
}
