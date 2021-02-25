package com.dennisjauernig.flashcards.service;

import com.dennisjauernig.flashcards.model.Game;
import com.dennisjauernig.flashcards.repository.ArchiveDb;
import org.springframework.stereotype.Service;


@Service
public class ArchiveService {

 private final ArchiveDb archiveDb;

 public ArchiveService (ArchiveDb archiveDb) {
	this.archiveDb = archiveDb;
 }

 public void addToArchive (Game updatedGame) {
	updatedGame.getPlayerList().stream().map( this.archiveDb::save );
 }
}
