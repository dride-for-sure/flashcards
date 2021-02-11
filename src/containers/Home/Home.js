import { useEffect, useState } from "react";
import { calcResult, changeGameMode, checkThisQuestion, getMessages, missedThisQuestion, selectRandomQuestion, updateCounter } from "../../common/helper";
import Congratulations from "../../components/Congratulations/Congratulations";
import Grid from "./Grid/Grid";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [counter, setCounter] = useState({ checked: 0, missed: 0 });
  const [gameMode, setGameMode] = useState("");
  const [messages, setMessages] = useState();

  useEffect(() => {
    setCounter(updateCounter(questions))
    setGameMode(changeGameMode(questions))
  }, [questions])

  useEffect(() => {
    setMessages(getMessages());
  }, [])

  return (
    <>
      {gameMode === "finish"
        ? <Congratulations
          result={calcResult(counter)}
          messages={messages}
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
        setQuestions={questions => setQuestions(questions)}
        gameMode={gameMode}
      />
    </>
  );
}