const getGameIconByTopic = (topic) => {
  const icon = {
    HARD: '🤯',
    MODERATE: '💪',
    EASY: '🥱' };

  return icon[topic.toUpperCase()];
};

export default getGameIconByTopic;
