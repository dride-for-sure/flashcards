const getGameIconByTopic = (topic) => {
  const icon = {
    JAVA: '🤯',
    JS: '💪',
    REACT: '🔥' };

  return icon[topic.toUpperCase()];
};

export default getGameIconByTopic;
