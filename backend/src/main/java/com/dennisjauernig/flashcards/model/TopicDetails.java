package com.dennisjauernig.flashcards.model;

import com.dennisjauernig.flashcards.model.enums.Topic;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder ( toBuilder = true )
public class TopicDetails {

 private Topic name;
 private int questionCount;
}
