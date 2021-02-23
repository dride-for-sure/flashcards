const getPlayerCardStyle = () => {
  const icons = ['🥷', '🎃', '👾', '🥴', '👨‍🎤', '👩‍🎤', '🦸‍♂️', '🦹‍♀️', '🧛‍♀️', '🐔', '🐫', '🐪', '🐑', '🐉', '🐲', '🧘‍♀️', '🎎'];
  const backgrounds = [
    'lightcoral',
    'sandybrown',
    'mediumseagreen',
  ];

  const randomIcon = icons[Math.floor(Math.random() * icons.length)];
  const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];

  return { icon: randomIcon, background: randomBackground };
};

export default getPlayerCardStyle;
