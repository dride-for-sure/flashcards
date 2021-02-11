
import GameTitle from '../../../components/Cards/GameTitle/GameTitle';
import Play from '../../../components/Cards/Play/Play';
import Questions from '../../../components/Cards/Questions/Questions';
import Shuffle from '../../../components/Cards/Shuffle/Shuffle';
import { Container } from './styles';

export default function Grid({ questions, setQuestions, onMissed, onChecked, gameMode }) {

  return (
    <Container>
      <GameTitle />
      <Shuffle setQuestions={setQuestions} questions={questions} gameMode={gameMode} />
      <Play setQuestions={setQuestions} questions={questions} gameMode={gameMode} />
      <Questions questions={questions} onMissed={onMissed} onChecked={onChecked} />
    </Container >
  );
}
