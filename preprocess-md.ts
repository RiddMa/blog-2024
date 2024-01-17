import fs from "fs";
import path from "path";
import isUrl from "is-url";

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


// Directory containing markdown files
const markdownDirectory = path.join(__dirname, "public", "content");

// Function to update image paths in markdown content
const updateImagePaths = (filePath: string, content: string) => {
  // Regular expression to find markdown image syntax
  const imageRegex = /!\[.*?\]\((.*?)\)/g;
  return content.replace(imageRegex, (match: string, imgPath: string) => {
    const fixedPath = fixImgPath(filePath, imgPath);
    return match.replace(imgPath, fixedPath);
  });
};

// Function to process each markdown file
const processMarkdownFiles = (dir:string) => {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const fileStat = fs.statSync(fullPath);

    if (fileStat.isDirectory()) {
      processMarkdownFiles(fullPath); // Recurse into directories
    } else if (file.endsWith(".md") || file.endsWith(".mdx")) {
      const content = fs.readFileSync(fullPath, "utf8");
      const updatedContent = updateImagePaths(fullPath, content);
      fs.writeFileSync(fullPath, updatedContent);
    }
  });
};

// Start processing
processMarkdownFiles(markdownDirectory);
