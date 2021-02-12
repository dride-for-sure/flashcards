import { useState } from "react";
import { checkThisQuestion, missedThisQuestion, selectRandomQuestion, timeOutLimesZero } from "../../common/helper";
import Congratulations from "./Congratulations/Congratulations";
import Grid from "./Grid/Grid";


export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [gameMode, setGameMode] = useState("empty"); // empty, shuffle, prepared, play, finish

  return (
    <>
      <Congratulations
        setQuestions={questions => setQuestions(questions)}
        setGameMode={setGameMode} />
      <Grid
        questions={questions}
        onMissed={id => { setQuestions(selectRandomQuestion(missedThisQuestion(id, questions))); }}
        onChecked={id => { setQuestions(selectRandomQuestion(checkThisQuestion(id, questions))); }}
        shuffleQuestions={questions => {
          timeOutLimesZero(questions, setQuestions, setGameMode, 1000, 0);
        }}
        shuffleQuestions={questions => timeOutLimesZero(questions, setQuestions, 1000, 0)}
        setQuestions={questions => setQuestions(questions)}
        gameMode={gameMode}
        setGameMode={gameMode => setGameMode(gameMode)}
      />
    </>
  );
}