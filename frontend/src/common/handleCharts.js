export const handleScoreColor = (score, maxPoints, setBarColor) => {
  const s = 80;
  const l = 70;
  const maxH = 130;
  const factor = maxPoints / score;
  const h = maxH / factor;
  const hsl = `hsl(${h},${s}%,${l}%)`;
  setBarColor(hsl);
};

export const addScoreWidthRandomness = (setBarRandomness) => {
  setBarRandomness(Math.floor(Math.random() * 20));
  const delay = Math.floor(Math.random() * 4000 + 1000);
  return setTimeout(() => addScoreWidthRandomness(setBarRandomness), delay);
};

export const handleScoreWidth = (width, setBarWidth) => {
  if (width > 100) {
    setBarWidth(100);
  } else if (width < 0) {
    setBarWidth(0);
  } else {
    setBarWidth(width);
  }
};
