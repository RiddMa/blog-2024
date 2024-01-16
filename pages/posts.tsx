import { Container } from "../components/util/container";
import { Section } from "../components/util/section";
import { Posts } from "../components/posts";
import { client } from "../tina/__generated__/client";
import { Layout } from "../components/layout";
import { InferGetStaticPropsType } from "next";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export const PostsNav = ({ navs }: { navs: { __typename: "GlobalPostNavsNav", href?: string, label?: string }[] }) => {
  const router = useRouter();
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);
  const isActivePath = (href: string, currentPath: string) => {
    return currentPath.includes(href);
  };

  return <div className="flex flex-row gap-4 prose-base items-baseline prose-h1:m-0">
    {navs && navs.map((nav) => {
        const isNavActive = isClient && isActivePath(nav.href, router.asPath);
        return <Link href={nav.href} key={nav.href}>
          {isNavActive ?
            <h1>{nav.label}</h1> :
            <span className="opacity-80 hover:opacity-100">{nav.label}</span>
          }
        </Link>;
      }
    )
    }
  </div>;
};


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
  return {
    props: {
      ...tinaProps
    }
  };
};

export type PostsType = InferGetStaticPropsType<
  typeof getStaticProps
>["data"]["postConnection"]["edges"][number];
