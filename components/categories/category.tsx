import { Section } from "../util/section";
import { Container } from "../util/container";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { PostCard } from "../posts/posts";
import React from "react";
import PostsNav from "../posts/posts-nav";

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
