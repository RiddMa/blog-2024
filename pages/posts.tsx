import { Container } from "../components/util/container";
import { Section } from "../components/util/section";
import { Posts } from "../components/posts";
import { client } from "../tina/__generated__/client";
import { Layout } from "../components/layout";
import { InferGetStaticPropsType } from "next";
import React from "react";
import PostsNav from "../components/posts/posts-nav";
import { fixImgPath } from "../util/util";


export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const posts = props.data.postConnection.edges;

  return (
    <Layout>
      <Section className="flex-1">
        <Container className="flex flex-col gap-8">
          <PostsNav navs={props.data.global?.postNavs?.nav} />
          <Posts data={posts} />
        </Container>
      </Section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.pageQuery();
  tinaProps.data.postConnection.edges.forEach(({ node }) => {
    node.heroImg = fixImgPath(node._sys.path, node.heroImg);
  });
  return {
    props: {
      ...tinaProps
    }
  };
};

export type PostsType = InferGetStaticPropsType<
  typeof getStaticProps
>["data"]["postConnection"]["edges"][number];
