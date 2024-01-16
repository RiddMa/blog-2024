export const getUriFromFilepath = (path: string) => {
  return path.split("content")[1].split(".")[0];
};
