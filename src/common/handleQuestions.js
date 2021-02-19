// NOTE: Possibility to randomize the selection
export const selectNextQuestion = (questions) => {
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

export const deleteAllQuestions = () => [];

const changeQuestionStatus = (selectedQuestion, questions, status) => {
  const updatedQuestions = [...questions];
  return updatedQuestions.map((question) => (question.id === selectedQuestion.id
    ? {
      ...question,
      status,
    }
    : question));
};

export const handleQuestions = (question, questions, setQuestions, answerClicked) => (
  question.answer[answerClicked].correct === true
    ? setQuestions(
      selectNextQuestion(changeQuestionStatus(question, questions, 'missed')),
    )
    : setQuestions(
      selectNextQuestion(changeQuestionStatus(question, questions, 'checked')),
    )
);
