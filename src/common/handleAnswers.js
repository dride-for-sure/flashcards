// NOTE: Possibility to randomize the selection
export const selectNextCard = (questions) => {
  const filteredQuestions = [...questions].filter(
    (question) => question.status === 'deactivated',
  );
  if (filteredQuestions.length === 0) {
    return questions;
  }
  const updatedQuestion = { ...filteredQuestions[0], status: 'selected' };
  return [...questions].map((question) => {
    if (question.id === updatedQuestion.id) {
      return updatedQuestion;
    }
    return question;
  });
};

export const deleteAllCards = () => [];

export const handleAnswers = (cards, setCards, cardId, choosenAnswer, sendAnswer) => {
  const updatedCards = ([...cards, { id: cardId, choosen: choosenAnswer, points: '' }]);
  sendAnswer(updatedCards).then((responseCards) => setCards(responseCards));
};
