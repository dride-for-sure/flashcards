import { useEffect, useState } from 'react';
import { calcResult } from '../common/helper';

export default function useGameState() {
  const [questions, setQuestions] = useState([]);
  const [gameMode, setGameMode] = useState('empty');
  const [results, setResults] = useState({});

  useEffect(() => {
    setResults(calcResult(questions));
  }, [questions]);

  useEffect(() => {
    if (questions.length > 0 && questions.length === results.total) {
      setGameMode('finish');
    }
  }, [results]);

  return [questions, setQuestions, gameMode, setGameMode, results];
}
