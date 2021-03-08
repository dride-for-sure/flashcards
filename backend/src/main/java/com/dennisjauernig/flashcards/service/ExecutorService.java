package com.dennisjauernig.flashcards.service;

import org.springframework.stereotype.Service;

import java.util.concurrent.Callable;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class ExecutorService {

 public void scheduleTask ( Callable callable, int delayInSeconds ) {
  ScheduledExecutorService executorService = Executors.newSingleThreadScheduledExecutor();
  executorService.schedule( callable, delayInSeconds, TimeUnit.SECONDS );
 }
}
