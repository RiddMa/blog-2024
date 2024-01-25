import { client } from "../../tina/__generated__/client";
import { useTina } from "tinacms/dist/react";
import { Layout } from "../../components/layout";
import { InferGetStaticPropsType } from "next";
import { merge } from "lodash-es";
import React from "react";
import { Column } from "../../components/columns/column";
import ColumnDef from "../../tina/collection/column";
import { fixImgPath } from "../../util/util";


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
    <Layout>
      <Column {...data} />
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.column({
    relativePath: `${params.filename}.${ColumnDef.format}`
  });
  const postResponse = await client.queries.postConnection({
    filter: { columns: { column: { column: { name: { eq: tinaProps.data.column.name } } } } }
  });
  postResponse.data.postConnection.edges.forEach(({ node }) => {
    node.heroImg = fixImgPath(node._sys.path, node.heroImg);
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
