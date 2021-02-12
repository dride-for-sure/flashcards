import { addRandomQuestion } from "../../../common/helper";
import { possibleQuestions } from "../../../store/store";
import { Difficulty, ShuffleCard } from "./styles";


export default function Shuffle({ gameMode, shuffleQuestions }) {

  return (
    <ShuffleCard disabled={gameMode !== "empty" && gameMode !== "ready"}>
      <span>Shuffle that deck</span>
      <span>
        <Difficulty
          disabled={gameMode !== "empty" && gameMode !== "ready"}
          onClick={() => shuffleQuestions(addRandomQuestion("easy", possibleQuestions))}
          title="Easy peasy">
          🥱
        </Difficulty>
        <Difficulty
          disabled={gameMode !== "empty" && gameMode !== "ready"}
          onClick={() => shuffleQuestions(addRandomQuestion("moderat", possibleQuestions))}
          title="For everyday">
          💪
        </Difficulty>
        <Difficulty
          disabled={gameMode !== "empty" && gameMode !== "ready"}
          onClick={() => shuffleQuestions(addRandomQuestion("hard", possibleQuestions))}
          title="100% pain">
          🤯
        </Difficulty>
      </span>
    </ShuffleCard>
  )
}