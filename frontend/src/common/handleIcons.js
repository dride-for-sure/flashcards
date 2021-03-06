const getGameIconByDifficulty = (difficulty) => {
  const icon = {
    HARD: '🤯',
    MODERATE: '💪',
    EASY: '🥱' };

  return icon[difficulty.toUpperCase()];
};

export default getGameIconByDifficulty;
