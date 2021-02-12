
import GameTitle from '../../../components/Cards/GameTitle/GameTitle';
import Play from '../../../components/Cards/Play/Play';
import Questions from '../../../components/Cards/Questions/Questions';
import Shuffle from '../../../components/Cards/Shuffle/Shuffle';
import { Container } from './styles';

export default function Grid({ questions, setQuestions, shuffleQuestions, onMissed, onChecked, gameMode, setGameMode }) {

  return (
    <Container>
      <GameTitle />
      <Shuffle questions={questions} shuffleQuestions={shuffleQuestions} gameMode={gameMode} setGameMode={setGameMode} />
      <Play setQuestions={setQuestions} questions={questions} gameMode={gameMode} />
      <Questions questions={questions} onMissed={onMissed} onChecked={onChecked} />
    </Container >
  );
}
