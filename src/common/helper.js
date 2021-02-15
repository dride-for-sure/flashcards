const uuid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
  // eslint-disable-next-line no-bitwise
  const r = (Math.random() * 16) | 0;
  // eslint-disable-next-line no-bitwise, eqeqeq
  const v = c == 'x' ? r : (r & 0x3) | 0x8;
  return v.toString(16);
});

export const addQuestion = (questions, question) => {
  const updatedQuestions = [...questions];
  updatedQuestions.push({
    id: uuid(),
    ...question,
  });
  return updatedQuestions;
};

export const addRandomQuestion = (difficulty, possibleQuestions, total) => {
  let filteredQuestions;
  if (difficulty === 'easy') {
    filteredQuestions = possibleQuestions.filter(
      (question) => question.nerdfactor === '1',
    );
  } else if (difficulty === 'moderat') {
    filteredQuestions = possibleQuestions.filter(
      (question) => question.nerdfactor !== '3',
    );
  } else {
    filteredQuestions = possibleQuestions;
  }
  const updatedQuestions = [];
  for (let i = 0; i < total; i += 1) {
    updatedQuestions.push({
      id: uuid(),
      ...filteredQuestions[
        Math.floor(Math.random() * filteredQuestions.length)
      ],
    });
  }
  return updatedQuestions;
};

export const deleteAllQuestions = () => [];

export const checkThisQuestion = (selectedQuestion, questions) => {
  const updatedQuestions = [...questions];
  return updatedQuestions.map((question) => (question.id === selectedQuestion.id
    ? {
      ...question,
      status: 'checked',
    }
    : question));
};

export const missedThisQuestion = (selectedQuestion, questions) => {
  const updatedQuestions = [...questions];
  return updatedQuestions.map((question) => (question.id === selectedQuestion.id
    ? {
      ...question,
      status: 'missed',
    }
    : question));
};

export const updateCounter = (questions) => {
  const thisQuestions = [...questions];
  const updatedCounter = { checked: 0, missed: 0 };
  thisQuestions.forEach((question) => {
    if (question.status === 'checked') {
      updatedCounter.checked = parseFloat(updatedCounter.checked) + 1;
    } else if (question.status === 'missed') {
      updatedCounter.missed = parseFloat(updatedCounter.missed) + 1;
    }
  });
  return updatedCounter;
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

export const shuffleQuestions = (questions) => {
  const shuffled = [];
  const rest = [...questions];
  while (rest.length > 0) {
    const index = Math.floor(Math.random() * rest.length);
    shuffled.push(rest.splice(index, 1).pop());
  }
  return shuffled;
};

export const timeOutLimesZero = (
  questions,
  setQuestions,
  setGameMode,
  maxDelay,
  iteration,
) => {
  const delay = 1.3 ** iteration;
  if (delay >= maxDelay) {
    setGameMode('prepared');
    return;
  }
  const updatedIteration = iteration + 1;
  setQuestions(shuffleQuestions(questions));
  setTimeout(() => timeOutLimesZero(
    questions,
    setQuestions,
    setGameMode,
    maxDelay,
    updatedIteration,
  ),
  delay);
};

export const calcResult = (questions) => {
  const missed = questions.reduce((acc, value) => (value.status === 'missed' ? acc + 1 : acc), 0);
  const checked = questions.reduce((acc, value) => (value.status === 'checked' ? acc + 1 : acc), 0);

  return {
    missed,
    checked,
    total: missed + checked,
  };
};

export const nerdfactorIcon = (question) => {
  if (question.nerdfactor === '3') {
    return '🤯';
  } if (question.nerdfactor === '2') {
    return '💪';
  }
  return '🥱';
};
