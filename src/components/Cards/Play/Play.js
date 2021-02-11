import { deleteAllQuestions, selectRandomQuestion } from '../../../common/helper';
import { Button } from './styles';

export default function PlayControls({ setQuestions, questions, gameMode }) {

  const btn = gameMode === "play" ? "Give up!" : gameMode === "finish" ? "Restart" : "Punch it!";

  return (
    <Button
      disabled={gameMode !== "ready" && gameMode !== "play" && gameMode !== "finish"}
      gameMode={gameMode}
      onClick={() => { gameMode === "ready" ? setQuestions(selectRandomQuestion(questions)) : setQuestions(deleteAllQuestions()); }
      }>
      {btn}
    </Button>
  )
}