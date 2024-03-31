export const sleep = (duration = 5000) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};
