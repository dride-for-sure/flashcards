import { useEffect, useState } from "react";
import { addSauce, calcResult, changeGameMode, checkThisSauce, getMessages, missedThisSauce, selectRandomSauce, updateCounter } from "../../common/helper";
import Cards from "../../components/Cards/Cards";
import Congratulations from "../../components/Congratulations/Congratulations";
import CardControls from "../../components/Controls/CardControls/CardControls";
import PlayControls from "../../components/Controls/PlayControls/PlayControls";
import Counter from "../../components/Counter/Counter";
import Header from "../../components/Header/Header";

export default function Home() {
  const [sauces, setSauces] = useState([]);
  const [counter, setCounter] = useState({ checked: 0, missed: 0 });
  const [gameMode, setGameMode] = useState(""); // empty, ready, play, finish
  const [messages, setMessages] = useState();

  useEffect(() => {
    setCounter(updateCounter(sauces))
    setGameMode(changeGameMode(sauces))
  }, [sauces])

  useEffect(() => {
    setMessages(getMessages(messages));
  }, [])

  return (
    <>
      <Header />
      {gameMode === "finish"
        ? <Congratulations
          result={calcResult(counter)}
          messages={messages}
          setSauces={sauces => setSauces(sauces)}
          counter={counter} />
        : null}
      <Cards
        sauces={sauces}
        onMissed={id => {
          setSauces(selectRandomSauce(missedThisSauce(id, sauces)));
        }}
        onChecked={id => {
          setSauces(selectRandomSauce(checkThisSauce(id, sauces)));
        }}
      />
      <Counter counter={counter} />
      <CardControls
        onAdd={sauce => setSauces(addSauce(sauces, sauce))}
        setSauces={sauces => setSauces(sauces)}
        sauces={sauces}
        gameMode={gameMode}
      />
      <PlayControls
        setSauces={sauces => setSauces(sauces)}
        sauces={sauces}
        gameMode={gameMode}
      />
    </>
  );
}