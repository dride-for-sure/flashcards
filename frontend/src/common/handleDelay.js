const pause = (length) => new Promise((res) => setTimeout(res, length));

const delay = (callback, length = 500) => {
  callback().catch(() => pause(length).then(() => delay(callback, delay * 1.5)));
};

export default delay;
