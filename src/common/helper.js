
export const addQuestion = (questions, question) => {
  let updatedQuestions = [...questions];
  updatedQuestions.push({
    id: uuid(),
    ...question
  });
  return updatedQuestions;
}

export const addRandomQuestion = (difficulty, possibleQuestions) => {
  let maxQuestions = 20;
  let filteredQuestions;
  if (difficulty === "easy") {
    filteredQuestions = possibleQuestions.filter(question => question.nerdfactor === "1");
  } else if (difficulty === "moderat") {
    filteredQuestions = possibleQuestions.filter(question => question.nerdfactor !== "3");
  } else {
    filteredQuestions = possibleQuestions;
  }
  let updatedQuestions = [];
  for (let i = 0; i < maxQuestions; i++) {
    updatedQuestions.push({
      id: uuid(),
      ...filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)]
    });
  }
  return updatedQuestions;
};

export const deleteAllQuestions = () => {
  return [];
}

export const checkThisQuestion = (id, questions) => {
  let updatedQuestions = [...questions];
  return updatedQuestions.map(question => question.id === id ? { status: "checked", id: question.id, topic: question.topic, nerdfactor: question.nerdfactor } : question);
}

export const missedThisQuestion = (id, questions) => {
  let updatedQuestions = [...questions];
  return updatedQuestions.map(question => question.id === id ? { status: "missed", id: question.id, topic: question.topic, nerdfactor: question.nerdfactor } : question);
}

export const updateCounter = (questions) => {
  let thisQuestions = [...questions];
  let updatedCounter = { checked: 0, missed: 0 };
  thisQuestions.forEach(question => {
    if (question.status === "checked") {
      updatedCounter.checked = parseFloat(updatedCounter.checked) + 1;
    } else if (question.status === "missed") {
      updatedCounter.missed = parseFloat(updatedCounter.missed) + 1;
    }
  });
  return updatedCounter;
}

export const selectRandomQuestion = (questions) => {
  const filteredQuestions = [...questions].filter(question => question.status === "deactivated");
  if (filteredQuestions.length === 0) {
    return questions;
  } else {
    let updatedQuestion = { ...filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)] };
    updatedQuestion.status = "selected";
    return [...questions].map(question => question.id === updatedQuestion.id ? updatedQuestion : question);
  }
};

export const timeOutLimesZero = (questions, setQuestions, setGameMode, maxDelay, iteration) => {
  const delay = Math.pow(1.3, iteration);
  console.log(delay);
  if (delay >= maxDelay) {
    setGameMode("prepared");
    return;
  }
  setQuestions(shuffleQuestions(questions));
  setTimeout(() => timeOutLimesZero(questions, setQuestions, setGameMode, maxDelay, iteration += 1), delay);
}

export const shuffleQuestions = (questions) => {
  let shuffled = [];
  let rest = [...questions];
  while (rest.length > 0) {
    const index = Math.floor(Math.random() * rest.length)
    shuffled.push((rest.splice(index, 1)).pop());
  }
  return shuffled;
}

export const changeGameMode = (questions) => {
  if (questions.length === 0) {
    return "empty";
  }

  if (questions.every(question => question.status === "deactivated")) {
    return "ready";
  }

  if (questions.some(question => question.status === "selected")) {
    return "play";
  }

  if ((questions.every(question => (question.status === "checked") || question.status === "missed"))) {
    return "finish";
  }
}

export const calcResult = (counter) => {
  if (counter.checked > counter.missed) {
    return "win";
  } else if (counter.checked === counter.missed) {
    return "draw";
  } else if (counter.checked <= counter.missed) {
    return "loose";
  } else {
    return "";
  }
}

const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};