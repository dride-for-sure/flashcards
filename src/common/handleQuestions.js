const checkThisQuestion = (selectedQuestion, questions) => {
  const updatedQuestions = [...questions];
  return updatedQuestions.map((question) => (question.id === selectedQuestion.id
    ? {
      ...question,
      status: 'checked',
    }
    : question));
};

const missedThisQuestion = (selectedQuestion, questions) => {
  const updatedQuestions = [...questions];
  return updatedQuestions.map((question) => (question.id === selectedQuestion.id
    ? {
      ...question,
      status: 'missed',
    }
    : question));
};

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

export const handleQuestions = (question, questions, setQuestions, answerClicked) => (
  question.answer[answerClicked].correct === true
    ? setQuestions(
      selectNextQuestion(missedThisQuestion(question, questions)),
    )
    : setQuestions(
      selectNextQuestion(checkThisQuestion(question, questions)),
    )
);
