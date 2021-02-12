import { addRandomQuestion } from "../../../common/helper";
import { possibleQuestions } from "../../../store/store";
import { Difficulty, ShuffleCard } from "./styles";


export default function Shuffle({ gameMode, shuffleQuestions }) {

  return (
    <ShuffleCard disabled={gameMode !== "empty" && gameMode !== "ready"}>
      <span>Shuffle that deck</span>
      <span>
        <Difficulty onClick={() => shuffleQuestions(addRandomQuestion("easy", possibleQuestions))} for="difficultyEasy" title="Easy peasy">🥱</Difficulty>
        <Difficulty onClick={() => shuffleQuestions(addRandomQuestion("moderat", possibleQuestions))} for="difficultyModerat" title="For everyday">💪</Difficulty>
        <Difficulty onClick={() => shuffleQuestions(addRandomQuestion("hard", possibleQuestions))} for="difficultyHard" title="100% pain">🤯</Difficulty>
      </span>
    </ShuffleCard>
  )
}