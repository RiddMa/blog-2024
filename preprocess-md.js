const fs = require("fs");
const path = require("path");
const isUrl = require("is-url");

const fixImgPath = (mdPath, imgPath) => {
  if (!imgPath) {
    return null;
  }
  if (path.isAbsolute(imgPath) || isUrl(imgPath)) {
    return imgPath;
  }

  let mdDirectory;
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
  if (resolvedPath !== imgPath) {
    console.log("Modified image path: ", imgPath, " -> ", resolvedPath);
  }
  return resolvedPath;
};


// Directory containing markdown files
let markdownDirectory = path.join(__dirname, "public", "content");
let baseDirectory = path.join(__dirname, "public");
// Function to update image paths in markdown content
const updateImagePaths = (filePath, content) => {
  // Regular expression to find markdown image syntax
  const imageRegex = /!\[.*?\]\((.*?)\)/g;
  content = content.replace(imageRegex, (match, imgPath) => {
    const fixedPath = fixImgPath(filePath.replace(baseDirectory, ""), imgPath);
    return match.replace(imgPath, fixedPath);
  });

  // Replace path in frontmatter's heroImg field
  const frontmatterRegex = /^---[\s\S]+?---/;
  const frontmatterMatch = content.match(frontmatterRegex);
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[0];
    const heroImgRegex = /heroImg:\s*["']?(.*?)["']?(\s|$)/;

    const updatedFrontmatter = frontmatter.replace(heroImgRegex, (match, imgPath) => {
      const fixedPath = fixImgPath(filePath.replace(baseDirectory, ""), imgPath);
      return `heroImg: ${fixedPath}\n`;
    });

    content = content.replace(frontmatterRegex, updatedFrontmatter);
  }

  return content;
};

// Function to process each markdown file
const processMarkdownFiles = (dir) => {
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
