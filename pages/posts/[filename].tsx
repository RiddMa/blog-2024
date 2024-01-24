import { Post } from "../../components/posts/post";
import { client } from "../../tina/__generated__/client";
import { useTina } from "tinacms/dist/react";
import { Layout } from "../../components/layout";
import { InferGetStaticPropsType } from "next";
import PostDef from "../../tina/collection/post";
import { fixImgPath } from "../../util/util";
import path from "path";
import * as fs from "fs";
import matter from "gray-matter";

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
      <Layout rawData={data} data={data.global}>
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

  console.log("\n\nfilepath",filePath,"\n\n")

  // Read the markdown file
  const fileContents = fs.readFileSync(filePath, "utf8");

  // Use gray-matter to parse the post metadata section
  const { content } = matter(fileContents);
  tinaProps.data.post["rawBody"] = content;

  return {
    props: {
      ...tinaProps
    }
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
