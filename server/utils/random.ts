const genRandom = (start: number, end: number) => {
  return Math.floor(Math.random() * (end - start) + start);
};

export default genRandom;
