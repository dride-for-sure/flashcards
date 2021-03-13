const getColorByTopic = (topic) => {
  const colors = {
    HARD: 'var(--color-red-light)',
    MODERATE: 'var(--color-orange-dark)',
    EASY: 'var(--color-green-light)' };

  return colors[topic.toUpperCase()];
};

export default getColorByTopic;
