const getColorByDifficulty = (difficulty) => {
  const colors = {
    HARD: 'var(--color-red-light)',
    MODERATE: 'var(--color-orange-dark)',
    EASY: 'var(--color-green-light)' };

  return colors[difficulty.toUpperCase()];
};

export default getColorByDifficulty;
