const getColorByDifficulty = (difficulty) => {
  const colors = {
    HARD: 'lightcoral',
    MODERATE: 'sandybrown',
    EASY: 'mediumseagreen' };

  return colors[difficulty.toUpperCase()];
};

export default getColorByDifficulty;
