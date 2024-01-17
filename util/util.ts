import path from "path";
import isUrl from "is-url";
import { basePath } from "../base-path";

export const getUriFromFilepath = (path: string) => {
  return path.split("content")[1].split(".")[0];
};

export const fixImgPath = (mdPath: string, imgPath: string): string | null => {
  if (!imgPath) {
    return null;
  }
  if (path.isAbsolute(imgPath) || isUrl(imgPath)) {
    return imgPath;
  }

  let mdDirectory: string;
  // Determine the base directory for the markdown file
  if (mdPath.includes("\\")) {
    mdDirectory = path.dirname(mdPath.split("\\").join(path.posix.sep));
  } else {
    mdDirectory = path.dirname(mdPath.split(path.sep).join(path.posix.sep));
  }

  // Resolve the image path relative to the markdown directory
  let resolvedPath = path.posix.join(mdDirectory, imgPath);

  // Remove the '/public' prefix from the resolved path
  // This assumes that your markdown files are inside the /public directory
  const publicPathPrefix = "public";
  if (resolvedPath.startsWith(publicPathPrefix)) {
    resolvedPath = resolvedPath.substring(publicPathPrefix.length);
  }
  return resolvedPath;
};
