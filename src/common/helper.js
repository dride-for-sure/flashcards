import axios from "axios";


export const addSauce = (sauces, sauce) => {
  let updatedSauces = [...sauces];
  updatedSauces.push({
    id: uuid(),
    ...sauce
  });
  return updatedSauces;
}

export const addRandomSauce = (sauces, possibleSauces) => {
  let updatedSauces = [...sauces];
  updatedSauces.push({
    id: uuid(),
    ...possibleSauces[Math.floor(Math.random() * possibleSauces.length)]
  });
  return updatedSauces;
};

export const deleteAllSauces = () => {
  return [];
}

export const checkThisSauce = (id, sauces) => {
  let updatedSauces = [...sauces];
  return updatedSauces.map(sauce => sauce.id === id ? { status: "checked", title: sauce.title, hotness: sauce.hotness } : sauce);
}

export const missedThisSauce = (id, sauces) => {
  let updatedSauces = [...sauces];
  return updatedSauces.map(sauce => sauce.id === id ? { status: "missed", title: sauce.title, hotness: sauce.hotness } : sauce);
}

export const updateCounter = (sauces) => {
  let thisSauces = [...sauces];
  let updatedCounter = { checked: 0, missed: 0 };
  thisSauces.forEach(sauce => {
    if (sauce.status === "checked") {
      updatedCounter.checked = parseFloat(updatedCounter.checked) + 1;
    } else if (sauce.status === "missed") {
      updatedCounter.missed = parseFloat(updatedCounter.missed) + 1;
    }
  });
  return updatedCounter;
}

export const selectRandomSauce = (sauces) => {
  console.log(sauces);
  const filteredSauces = [...sauces].filter(sauce => sauce.status === "deactivated");
  if (filteredSauces.length === 0) {
    return sauces;
  } else {
    let updatedSauce = { ...filteredSauces[Math.floor(Math.random() * filteredSauces.length)] };
    updatedSauce.status = "selected";
    return [...sauces].map(sauce => sauce.id === updatedSauce.id ? updatedSauce : sauce);
  }
};

export const changeGameMode = (sauces) => {
  if (sauces.length === 0) {
    return "empty";
  }

  if (sauces.every(sauce => sauce.status === "deactivated")) {
    return "ready";
  }

  if (sauces.some(sauce => sauce.status === "selected")) {
    return "play";
  }

  if ((sauces.every(sauce => (sauce.status === "checked") || sauce.status === "missed"))) {
    return "finish";
  }
}

export const calcResult = (counter) => {
  if (counter.checked > counter.missed) {
    return "win";
  } else if (counter.checked === counter.missed) {
    return "draw";
  } else if (counter.checked <= counter.missed) {
    return "loose";
  } else {
    return "";
  }
}

export const getMessages = () => {
  let updatedMessages = { win: "", draw: "", loose: "" };
  for (const status in updatedMessages) {
    getMessage().then(a => updatedMessages[status] = a);
  }
  return updatedMessages;
}

const getMessage = () => {
  return axios.get('https://httpbin.org/get?answer=42')
    .then(response => response.data.args.answer);
}

const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};