import { client } from "../../tina/__generated__/client";
import { tinaField, useTina } from "tinacms/dist/react";
import { Layout } from "../../components/layout";
import { InferGetStaticPropsType } from "next";
import { merge } from "lodash-es";
import { Container } from "../../components/util/container";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Section } from "../../components/util/section";
import React from "react";
import { PostsNav } from "../posts";
import { PostCard } from "../../components/posts/posts";
import { Column } from "../columns/[filename]";

export const Category = ({ category, global }) => {
  return (
    <Section className="flex-1">
      {/*<PostsNav navs={}/>*/}
      <Container className={`flex flex-col gap-8`}>
        <PostsNav navs={global?.postNavs?.nav} />
        <div className="prose-article">
          {/*<h2>专栏</h2>*/}
          <h1 data-tina-field={tinaField(category, "name")}>
            {category.name}
          </h1>
          <div data-tina-field={tinaField(category, "description")}>
            <TinaMarkdown content={category.description} />
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {category.posts.length != 0 &&
            <p className="prose-text text-end">{category.posts.length}篇文章</p>
          }
          {category.posts.length ?
            category.posts.map((postData) => {
              return <PostCard key={postData.node._sys.filename} post={postData.node} />;
            }) :
            <p className="prose-text text-center">暂无文章。</p>
          }
        </div>
        {/*<pre>{JSON.stringify(category, null, 4)}</pre>*/}
      </Container>
    </Section>
  );
};

// Use the props returned by get static props
export default function CategoryPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data
  });
  return (
    <Layout rawData={data}>
      <Category {...data} />
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.category({
    relativePath: `${params.filename}.mdx`
  });
  const postResponse = await client.queries.postConnection({
    filter: { categories: { category: { category: { name: { eq: tinaProps.data.category.name } } } } }
  });
  const global = await client.queries.global({ relativePath: "index.json" });
  return {
    props: {
      ...merge(tinaProps, global, {
        data: {
          category: {
            posts: postResponse.data.postConnection.edges
          }
        }
      })
    }
  };
};
export const getStaticPaths = async () => {
  const categoriesData = await client.queries.categoryConnection();
  return {
    paths: categoriesData.data.categoryConnection.edges.map((category) => ({
      params: { filename: category.node._sys.filename, name: category.node.name }
    })),
    fallback: "blocking"
  };
};

export type CategoryType = InferGetStaticPropsType<
  typeof getStaticProps
>["data"]["category"];
