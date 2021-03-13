import { func } from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components/macro';
import getColorByTopic from '../../common/handleTopicColor';
import { questionListItemType } from '../../types/types';
import Button from '../Buttons/Button';
import Tiles from './Tiles';

export default function Question({ question, onSendAnswer }) {
  return (
    <Tiles
      bg={getColorByTopic(question.topic)}
      status={question.status}
      checked={question.points > 0}>
      <Container
        disabled={question.status !== 'SELECTED'}>
        <span>{question.icon}</span>
        <h1>{question.category}</h1>
        <span>{question.question}</span>
        <Button
          disabled={question.status !== 'SELECTED'}
          onClick={() => onSendAnswer(question.id, 'A')}>
          👉
          {question.answers[0]}
        </Button>
        <Button
          disabled={question.status !== 'SELECTED'}
          onClick={() => onSendAnswer(question.id, 'B')}>
          👉
          {question.answers[1]}
        </Button>
      </Container>
    </Tiles>
  );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;

    color: transparent;
    text-shadow: 0 0 10px #fff;
    user-select: none;
  
    ${(props) => !props.disabled && css`
      color: white;
      text-shadow: none;
    `}

  > span {
    &:first-of-type {
      position:absolute;
      top:-10px;
      right:-10px;
      font-size: 3rem;
    }

    &:nth-of-type(2) {
      font-style: italic;
      flex-grow: 2;
    }

    &:nth-of-type(3) {
      font-style: italic;
    }
  }

  > button {
    font-size: 1rem;
    color: transparent;
    text-shadow: 0 0 5px #fff;
    pointer-events: none;
    text-align:left;

    ${(props) => !props.disabled && css`
      color: white;
      text-shadow: none;
      pointer-events: all;
    `}
  }
`;

Question.propTypes = {
  question: questionListItemType.isRequired,
  onSendAnswer: func.isRequired,
};
