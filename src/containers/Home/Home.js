import { useEffect, useState } from "react";
import { calcResult, changeGameMode, checkThisQuestion, missedThisQuestion, selectRandomQuestion, timeOutLimesZero, updateCounter } from "../../common/helper";
import Congratulations from "../../components/Congratulations/Congratulations";
import Grid from "./Grid/Grid";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [counter, setCounter] = useState({ checked: 0, missed: 0 });
  const [gameMode, setGameMode] = useState("");

  useEffect(() => {
    setCounter(updateCounter(questions))
    setGameMode(changeGameMode(questions))
  }, [questions])

  return (
    <>
      {gameMode === "finish"
        ? <Congratulations
          result={calcResult(counter)}
          setQuestions={questions => setQuestions(questions)}
          counter={counter} />
        : null}
      <Grid
        questions={questions}
        onMissed={id => {
          setQuestions(selectRandomQuestion(missedThisQuestion(id, questions)));
        }}
        onChecked={id => {
          setQuestions(selectRandomQuestion(checkThisQuestion(id, questions)));
        }}
        shuffleQuestions={questions => timeOutLimesZero(questions, setQuestions, 1000, 0)}
        setQuestions={questions => setQuestions(questions)}
        gameMode={gameMode}
      />
    </>
  );
}