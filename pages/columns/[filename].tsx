import { client } from "../../tina/__generated__/client";
import { tinaField, useTina } from "tinacms/dist/react";
import { Layout, useTheme } from "../../components/layout";
import { InferGetStaticPropsType } from "next";
import { merge } from "lodash-es";
import { Section } from "../../components/util/section";
import { Container } from "../../components/util/container";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import React from "react";
import { PostsNav } from "../posts";
import { PostCard } from "../../components/posts/posts";

export const Column = ({ column, global }) => {
  return (
    <Section className="flex-1">
      {/*<PostsNav navs={}/>*/}
      <Container className={`flex flex-col gap-8`}>
        <PostsNav navs={global?.postNavs?.nav} />
        <div className="prose-article">
          {/*<h2>专栏</h2>*/}
          <h1 data-tina-field={tinaField(column, "name")}>
            {column.name}
          </h1>
          <div data-tina-field={tinaField(column, "description")}>
            <TinaMarkdown content={column.description} />
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {column.posts.length != 0 &&
            <p className="prose-text text-end">{column.posts.length}篇文章</p>
          }
          {column.posts.length ?
            column.posts.map((postData) => {
              return <PostCard key={postData.node._sys.filename} post={postData.node} />;
            }) :
            <p className="prose-text text-center">暂无文章。</p>
          }
        </div>
        {/*<pre>{JSON.stringify(column, null, 4)}</pre>*/}
      </Container>
    </Section>
  );
};

export default function ColumnPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data
  });
  // console.log(JSON.stringify(props.data))
  return (
    <Layout rawData={data}>
      <Column {...data} />
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.column({
    relativePath: `${params.filename}.mdx`
  });
  const postResponse = await client.queries.postConnection({
    filter: { columns: { column: { column: { name: { eq: tinaProps.data.column.name } } } } }
  });
  const global = await client.queries.global({ relativePath: "index.json" });
  return {
    props: {
      ...merge(tinaProps, global, {
        data: {
          column: {
            posts: postResponse.data.postConnection.edges
          }
        }
      })
    }
  };
};
export const getStaticPaths = async () => {
  const columnsListData = await client.queries.columnConnection();
  return {
    paths: columnsListData.data.columnConnection.edges.map((column) => ({
      params: { filename: column.node._sys.filename, name: column.node.name }
    })),
    fallback: "blocking"
  };
};

export type ColumnType = InferGetStaticPropsType<
  typeof getStaticProps
>["data"]["column"];
