import { Post } from "../../components/posts/post";
import { client } from "../../tina/__generated__/client";
import { useTina } from "tinacms/dist/react";
import { Layout } from "../../components/layout";
import { InferGetStaticPropsType } from "next";
import PostDef from "../../tina/collection/post";
import { extractTocFromHtml, fixImgPath } from "../../util/util";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { getPlaiceholder } from "plaiceholder";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import rehypeRaw from "rehype-raw";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { reporter } from "vfile-reporter";
import { merge } from "lodash-es";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";

import remarkMath from "remark-math";
import remarkEmoji from "remark-emoji";
import rehypeKatex from "rehype-katex";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeToc from "@jsdevtools/rehype-toc";
import rehypeSlug from "rehype-slug";
import rehypePresetMinify from "rehype-preset-minify";
import isUrl from "is-url";
import https from "https";
import { randomBytes } from "crypto";
import { fromHtmlIsomorphic } from "hast-util-from-html-isomorphic";
import { RightNavbar } from "../../components/layout/right-navbar";

// Use the props returned by get static props
export default function BlogPostPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data
  });
  if (data && data.post) {
    return (
      <Layout data={data.global} rightNavBar={<RightNavbar {...data.post} />}>
        <Post {...data.post} />
      </Layout>
    );
  }
  return (
    <Layout>
      <div>No data</div>
      ;
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.blogPostQuery({
    relativePath: `${params.filename}.${PostDef.format}`
  });
  tinaProps.data.post.heroImg = fixImgPath(tinaProps.data.post._sys.path, tinaProps.data.post.heroImg);

  // Resolve the file path
  const filePath = path.join(process.cwd(), tinaProps.data.post._sys.path);

  // console.log("\n\nfilepath", filePath, "\n\n");

  // Read the markdown file
  let fileContents = fs.readFileSync(filePath, "utf8");
  const imageUrls = [];
  const imageRegex = /!\[.*?\]\((.*?)\)/g;
  fileContents = fileContents.replace(imageRegex, (match, imgPath) => {
    const fixedPath = fixImgPath(tinaProps.data.post._sys.path, imgPath);
    // if (isUrl(fixedPath)) {
    //   const fileUrl = fixedPath; // Replace with your file URL
    //   // Generate a random hex string for the file name
    //   const randomFileName = randomBytes(16).toString('hex');
    //   const filePath = path.resolve("./public", "downloadedFile.ext"); // Replace 'downloadedFile.ext' with your desired file name and extension
    //
    //   const file = fs.createWriteStream(filePath);
    //
    //   await new Promise((resolve, reject) => {
    //     https.get(fileUrl, function(response) {
    //       response.pipe(file);
    //       file.on("finish", function() {
    //         file.close(resolve);
    //       });
    //     }).on("error", function(err) {
    //       fs.unlink(filePath); // Delete the file async. (But we don't check the result)
    //       reject(err);
    //     });
    //   });
    // }
    imageUrls.push(fixedPath);
    return match.replace(imgPath, fixedPath);
  });

  // Replace path in frontmatter's heroImg field
  const frontmatterRegex = /^---[\s\S]+?---/;
  const frontmatterMatch = fileContents.match(frontmatterRegex);
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[0];
    const heroImgRegex = /heroImg:\s*["']?(.*?)["']?(\s|$)/;

    const updatedFrontmatter = frontmatter.replace(heroImgRegex, (match, imgPath) => {
      const fixedPath = fixImgPath(tinaProps.data.post._sys.path, imgPath);
      // console.log("fixedPath", tinaProps.data.post._sys.path, imgPath, fixedPath);
      return `heroImg: ${fixedPath}\n`;
    });

    fileContents = fileContents.replace(frontmatterRegex, updatedFrontmatter);
  }

  // Use gray-matter to parse the post metadata section
  const { content } = matter(fileContents);
  tinaProps.data.post["rawBody"] = content;

  // Generate placeholders for each image
  const images = {};
  for (const url of imageUrls) {
    try {
      const file = fs.readFileSync(path.join(process.cwd(), "public", url));
      const img = await getPlaiceholder(file);
      images[url] = img;
    } catch (e) {
      console.warn("File does not exist: ", path.join(process.cwd(), "public", url));
    }
  }

  const htmlWithToc = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkEmoji)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeKatex)
    .use(rehypeToc)
    .use(rehypePresetMinify)
    .use(rehypeStringify)
    .process(fileContents);

  const tocHtml = extractTocFromHtml(String(htmlWithToc));

  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkEmoji)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeKatex)
    .use(rehypePresetMinify)
    .use(rehypeStringify)
    .process(fileContents);

  console.error(reporter(file));
  // console.log(String(file));

  return {
    props: merge(tinaProps, {
      data: {
        post: {
          images: images,
          toc: tocHtml,
          html: String(file)
        }
      }
    })
  };
};

/**
 * To build the blog post pages we just iterate through the list of
 * posts and provide their "filename" as part of the URL path
 *
 * So a blog post at "content/posts/hello.md" would
 * be viewable at http://localhost:3000/posts/hello
 */
export const getStaticPaths = async () => {
  const postsListData = await client.queries.postConnection();
  return {
    paths: postsListData.data.postConnection.edges.map((post) => ({
      params: { filename: post.node._sys.filename }
    })),
    fallback: "blocking"
  };
};

export type PostType = InferGetStaticPropsType<
  typeof getStaticProps
>["data"]["post"];
