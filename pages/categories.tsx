import { Container } from "../components/util/container";
import { Section } from "../components/util/section";
import { client } from "../tina/__generated__/client";
import { Layout } from "../components/layout";
import { InferGetStaticPropsType } from "next";
import React from "react";
import { merge } from "lodash-es";
import { Categories } from "../components/categories";
import PostsNav from "../components/posts/posts-nav";

export default function ColumnsPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const columns = props?.data?.categoryConnection?.edges;
  return (
    <Layout>
      <Section className="flex-1">
        <Container className="flex flex-col gap-8">
          <PostsNav navs={props?.data.global?.postNavs?.nav} />
          <Categories data={columns} />
        </Container>
      </Section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const categories = await client.queries.categoryQuery();
  const tinaProps: typeof categories & {
    data?: { categoryConnection?: { edges?: { node?: { posts?: typeof posts } }[] } }
  } = categories;
  if (!categories?.data?.categoryConnection?.edges) {
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

  const categoryPosts: { [key: string]: typeof posts } = {};
  posts.forEach(post => {
    post.node?.categories?.forEach(category => {
      const categoryName = category?.category?.name;
      if (!categoryName) {
        throw new Error("category name is undefined in one of the posts");
      }
      if (!categoryPosts[categoryName]) {
        categoryPosts[categoryName] = [];
      }
      categoryPosts[categoryName].push(post);
    });
  });

  tinaProps.data.categoryConnection.edges.forEach(category => {
    const categoryName = category.node?.name;
    category.node["posts"] = categoryPosts[categoryName] || [];
  });

  return {
    props: {
      ...tinaProps
    }
  };
};

export type CategoriesType = InferGetStaticPropsType<
  typeof getStaticProps
>["data"]["categoryConnection"]["edges"][number];
