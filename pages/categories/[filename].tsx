import { client } from "../../tina/__generated__/client";
import { useTina } from "tinacms/dist/react";
import { Layout } from "../../components/layout";
import { InferGetStaticPropsType } from "next";
import { merge } from "lodash-es";
import React from "react";
import { Category } from "../../components/categories/category";
import CategoryDef from "../../tina/collection/category";



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
    relativePath: `${params.filename}.${CategoryDef.format}`
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
