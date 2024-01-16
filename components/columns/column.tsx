import { Section } from "../util/section";
import { Container } from "../util/container";
import PostsNav from "../posts/posts-nav";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { PostCard } from "../posts/posts";
import React from "react";

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
