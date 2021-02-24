package com.dennisjauernig.flashcards.services;

import com.dennisjauernig.flashcards.model.Answer;
import com.dennisjauernig.flashcards.model.ReceivedAnswerDto;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class AnswersService {
 public Optional<Answer> receivedAnswer (UUID gameId, UUID playerId, ReceivedAnswerDto dto) {
	return null;
 }
}
