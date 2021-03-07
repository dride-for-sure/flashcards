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
  return "<html><body><div style=\"display:flex; flex-direction:column; " +
          "justify-content:center; height:100vh\"><div style=\"align-self:center\"><h1 " +
          "style=\"text-transform:uppercase; text-align:center\">Nice try.." +
          ".</h1><em>...lets move on!</em></div></div></body></html>";
 }

 @Override
 public String getErrorPath () {
  return "/error";
 }
}