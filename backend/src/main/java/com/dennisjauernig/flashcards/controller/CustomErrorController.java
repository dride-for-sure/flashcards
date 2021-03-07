package com.dennisjauernig.flashcards.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@Controller
public class CustomErrorController implements ErrorController {

 @RequestMapping ( "/error" )
 @ResponseBody
 public String handleError ( HttpServletRequest request ) {
  Integer status = ( Integer ) request.getAttribute( "javax.servlet.error.status_code" );
  Exception exception = ( Exception ) request.getAttribute( "javax.servlet.error.exception" );
  return "<html><body><h2>Nice try...</h2><div><b>Status Code: " + status + "</div>" +
          "<div><div><img src=\"https://media.giphy.com/media/xlLerrsdqYdWw/giphy.gif\"/></body></html>";
 }

 @Override
 public String getErrorPath () {
  return "/error";
 }
}
