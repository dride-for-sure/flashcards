import { deleteAllQuestions, selectRandomQuestion } from '../../../common/helper';
import { Button } from './styles';

export default function PlayControls({ setQuestions, questions, gameMode, setGameMode }) {

  const btn = gameMode === "play" ? "Give up!" : gameMode === "finish" ? "Restart" : gameMode === "prepared" ? "Punch it!" : "Shuffle first!";

  return (
    <Button
      disabled={gameMode !== "ready" && gameMode !== "play" && gameMode !== "finish" && gameMode !== "prepared"}
      gameMode={gameMode}
      onClick={() => {
        if (gameMode === "prepared") {
          setGameMode("play");
          setQuestions(selectRandomQuestion(questions));
        } else {
          setGameMode("empty");
          setQuestions(deleteAllQuestions());
        }
      }}>
      {btn}
    </Button>
  )
}