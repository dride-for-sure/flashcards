import { addRandomQuestion } from "../../../common/helper";
import { possibleQuestions } from "../../../store/store";
import { Difficulty, ShuffleCard } from "./styles";


export default function Shuffle({ shuffleQuestions, gameMode, setGameMode }) {

  const disabled = gameMode !== "empty" && gameMode !== "ready" && gameMode !== "prepared";

  return (
    <ShuffleCard disabled={disabled} gameMode={gameMode}>
      <span>Shuffle that deck</span>
      <span>
        <Difficulty
          disabled={disabled}
          onClick={() => {
            setGameMode("shuffle");
            shuffleQuestions(addRandomQuestion("easy", possibleQuestions));
          }}
          title="Easy peasy">
          🥱
        </Difficulty>
        <Difficulty
          disabled={disabled}
          onClick={() => {
            setGameMode("shuffle");
            shuffleQuestions(addRandomQuestion("moderat", possibleQuestions));
          }}
          title="For everyday">
          💪
        </Difficulty>
        <Difficulty
          disabled={disabled}
          onClick={() => {
            setGameMode("shuffle");
            shuffleQuestions(addRandomQuestion("hard", possibleQuestions));
          }}
          title="100% pain">
          🤯
        </Difficulty>
      </span>
    </ShuffleCard>
  )
}