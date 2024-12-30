const genRandom = (start, end) => {
  return Math.floor(Math.random() * (end - start)) + start;
};

export default genRandom;
