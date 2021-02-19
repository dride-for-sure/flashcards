export const handlePlayerScoreColor = (player, questions, setBarColor) => {
  const s = 80;
  const l = 70;
  const maxH = 130;
  const count = questions.length;
  const factor = count / player.results.checked;
  const h = maxH / factor;
  const hsl = `hsl(${h},${s}%,${l}%)`;
  setBarColor(hsl);
};

const addWidthRandomness = (length, setBarWidth) => {
  const randomness = -10 + Math.floor(Math.random() * 20);
  const newLength = length - randomness;
  if (newLength >= 100) {
    setBarWidth('100%');
  } else if (newLength <= 0) {
    setBarWidth('0%');
  } else {
    setBarWidth(`${newLength}%`);
  }
  const delay = Math.floor(Math.random() * (10000 - 4000 + 1) + 4000);
  return setTimeout(() => addWidthRandomness(length, setBarWidth), delay);
};

export const handlePlayerScoreWidth = (player, questions, setBarWidth) => {
  const count = questions.length;
  const factor = count / player.results.checked;
  const length = 100 / factor;

  addWidthRandomness(length, setBarWidth);
};
