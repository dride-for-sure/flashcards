import { func } from 'prop-types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { topicList } from '../../types/types';
import Button from '../Buttons/Button';
import Tiles from './Tiles';

export default function NewGame({ onGameOpen, topics }) {
  const [chosenTopic, setChosenTopic] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (chosenTopic) {
      onGameOpen(chosenTopic);
    }
  };

  const handleChange = (event) => {
    setChosenTopic(event.target.value);
  };

  useEffect(() => {
<<<<<<< HEAD
    if (topics) {
      setChosenTopic(topics[0].name);
    }
=======
    setChosenTopic(topics[0].name);
>>>>>>> main
  }, []);

  return (
    <Tiles bg="var(--color-blue-medium)">
      <h1>Start a new game...</h1>
      <Subtitle>...choose a topic:</Subtitle>
      <Form onSubmit={handleSubmit}>
        <select onChange={handleChange} value={chosenTopic}>
          {topics && topics.map((topic) => (
            <option key={topic.name} value={topic.name}>
              {topic.name}
              {' '}
              (
              {topic.questionCount}
              {' '}
              {topic.questionCount > 1 ? 'Questions' : 'Question'}
              )
            </option>
          ))}
        </select>
        <Button fontsize="2rem" onClick={handleSubmit}>🤘</Button>
      </Form>
      {onGameOpen}
    </Tiles>
  );
}

const Subtitle = styled.div`
  margin: 10px 0 5px;
  font-style: italic;
  display:block;
`;

const Form = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
  
  > select {
    width: 100%;
    outline: none;
    padding: 8px;
    border: 4px solid white;
    color: white;
    background-color: transparent;
    box-sizing: border-box;
    font-style: italic;
  }

  > button {
    padding: 5px;
    margin-left: 10px;
  } 
`;

NewGame.propTypes = {
  onGameOpen: func.isRequired,
  topics: topicList.isRequired,
};
