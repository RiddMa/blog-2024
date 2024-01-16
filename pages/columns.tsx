import { Container } from "../components/util/container";
import { Section } from "../components/util/section";
import { client } from "../tina/__generated__/client";
import { Layout } from "../components/layout";
import { InferGetStaticPropsType } from "next";
import { Columns } from "../components/columns";
import React from "react";
import PostsNav from "../components/posts/posts-nav";

export default function ColumnsPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const columns = props?.data?.columnConnection?.edges;
  return (
    <Layout>
      <Section className="flex-1">
        <Container className="flex flex-col gap-8">
          <PostsNav navs={props?.data.global?.postNavs?.nav} />
          <Columns data={columns} />
        </Container>
      </Section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const columns = await client.queries.columnQuery();
  const tinaProps: typeof columns & {
    data?: { columnConnection?: { edges?: { node?: { posts?: typeof posts } }[] } }
  } = columns;
  if (!columns?.data?.columnConnection?.edges) {
    return {
      props: {
        ...tinaProps
      }
    };
  }

  const postsResponse = await client.queries.postConnection();
  const posts = postsResponse?.data?.postConnection?.edges;
  if (!posts) {
    return {
      props: {
        ...tinaProps
      }
    };
  }

  const columnPosts: { [key: string]: typeof posts } = {};
  posts.forEach(post => {
    post.node?.columns?.forEach(column => {
      const columnName = column?.column?.name;
      if (!columnName) {
        throw new Error("Column name is undefined in one of the posts");
      }
      if (!columnPosts[columnName]) {
        columnPosts[columnName] = [];
      }
      columnPosts[columnName].push(post);
    });
  });

  tinaProps.data.columnConnection.edges.forEach(column => {
    const columnName = column.node?.name;
    column.node["posts"] = columnPosts[columnName] || [];
  });

  return {
    props: {
      ...tinaProps
    }
  };
};

export type ColumnsType = InferGetStaticPropsType<
  typeof getStaticProps
>["data"]["columnConnection"]["edges"][number];
