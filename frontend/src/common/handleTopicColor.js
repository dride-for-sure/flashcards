const getColorByTopic = (topic) => {
  const colors = {
    JAVA: 'var(--color-red-light)',
    JS: 'var(--color-orange-dark)',
    REACT: 'var(--color-green-light)' };

  return colors[topic.toUpperCase()];
};

export default getColorByTopic;
