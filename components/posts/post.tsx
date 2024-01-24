/**
 Copyright 2021 Forestry.io Holdings, Inc.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

import React, { createElement, useEffect, useState, Fragment } from "react";
import { Container } from "../util/container";
import * as prod from "react/jsx-runtime";
import { Section } from "../util/section";
import { PostType } from "../../pages/posts/[filename]";
import { tinaField } from "tinacms/dist/react";
import Link from "next/link";
import { ImageAwesome } from "../blocks/image-awesome";
import { format, formatDistanceToNowStrict } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import CopyToClipboard from "react-copy-to-clipboard";
import { unified } from "unified";
import parse from "rehype-parse";
import rehype2react from "rehype-react";

export const Post = (props: PostType) => {
  const date = new Date(props.date);
  let formattedDate = "";
  let dateToNow = "";
  if (!isNaN(date.getTime())) {
    formattedDate = format(date, "yyyy-MM-dd, HH:mm");
    dateToNow = formatDistanceToNowStrict(date, { addSuffix: true, locale: zhCN });
  }
  const updateDate = new Date(props.updateDate);
  let formattedUpdateDate = "";
  let updateDateToNow = "";
  if (!isNaN(updateDate.getTime())) {
    formattedUpdateDate = format(updateDate, "yyyy-MM-dd, HH:mm");
    updateDateToNow = formatDistanceToNowStrict(date, { addSuffix: true, locale: zhCN });
  }

  const [copied, setCopied] = useState(false);

  // @ts-expect-error: the react types are missing.
  const production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs };

  const processor = unified()
    .use(parse, { fragment: true }) // Parse the HTML as fragment
    .use(rehype2react, {
      components: {
        "pre": (props) => {
          return <pre className={`relative m-0 p-0`}>{props.children}</pre>;
        },
        "code": ({ node, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          const language = match?.[1] ? match[1] : "";
          return language ? (
            <>
              <CopyToClipboard
                text={children}
                onCopy={() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
              >
                <button className={`absolute right-4 top-4`}>
                  {copied ? <span>OK!</span> : <span>Copy</span>}
                </button>
              </CopyToClipboard>
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                wrapLines={false}
                wrapLongLines={false}
                style={oneDark}
                language={language}
                showLineNumbers={true}
                PreTag="div"
                customStyle={{
                  margin: 0,
                  padding: "1rem 0.5rem",
                  borderRadius: "1rem",
                  fontSize: "1.125rem",
                  fontWeight: "regular"
                }}
                codeTagProps={{
                  style: { fontFamily: "JetBrains Mono, monospace", color: "#cbd5e1" }
                }}
              />
            </>
          ) : (
            <code {...props} className={`${className}`}>
              {children}
            </code>
          );
        },
        "img": ({ src, alt }) => {
          const { base64, metadata } = props.images[src];
          return <ImageAwesome src={src} alt={alt} width={metadata.width} height={metadata.height}
                               blurDataURL={base64} />;
          return <pre>{JSON.stringify(props.images[src], null, 4)}</pre>;
        }
      },
      ...production
    });

  const ReactComponent = processor.processSync(props["html"]).result;

  return (
    <Section>
      <Container className="flex flex-col gap-8">
        <h1
          data-tina-field={tinaField(props, "title")}
          className={`text-h0 text-center`}
        >
          {props.title}
        </h1>
        <div
          className="flex flex-row flex-wrap gap-4 items-center justify-center"
        >
          <div className="flex flex-col text-body text-color-caption text-end">
            {props.categories && <p>
              分类
            </p>}
            {props.columns && <p>
              专栏
            </p>}
            {props.date && <p>
              发布
            </p>}
            {props.updateDate && <p>
              更新
            </p>}
          </div>
          <div className="flex flex-col text-body ">
            {props.categories &&
              <div data-tina-field={tinaField(props, "categories")} className="flex flex-row gap-4">
                {
                  props.categories.map((category) =>
                    <p key={category?.category?.name} className="text-color-href">
                      {category?.category?.name}
                    </p>
                  )
                }
              </div>
            }
            {props.columns &&
              <div data-tina-field={tinaField(props, "columns")} className="flex flex-row gap-4">
                {
                  props.columns.map((column) =>
                    <Link key={column?.column?.name} href={`/columns/${column.column._sys.filename}`}
                          className="text-color-href">
                      {column?.column?.name}
                    </Link>
                  )
                }
              </div>
            }
            {props.date &&
              <span data-tina-field={tinaField(props, "date")} className="text-color-caption">
                {formattedDate}
              </span>
            }
            {props.updateDate &&
              <span data-tina-field={tinaField(props, "updateDate")} className="text-body text-color-caption">
                {formattedUpdateDate}
              </span>
            }
          </div>
        </div>
        {props.heroImg &&
          <ImageAwesome data-tina-field={tinaField(props, "heroImg")} src={props.heroImg}
                        alt={props.title} />
        }
        <div
          data-tina-field={tinaField(props, "_body")}
          className="prose-article flex flex-col"
        >
          {ReactComponent}
          {/*<div dangerouslySetInnerHTML={{ __html: props["html"] }} />*/}
        </div>
        {props.tags &&
          <div className="flex flex-row flex-nowrap gap-4 prose-text text-color-caption">
            <span>标签:</span>
            <div data-tina-field={tinaField(props, "tags")} className="flex flex-row gap-4">
              {
                props.tags.map((tag) =>
                  <span key={tag} className="text-color-caption">
                    {tag}
                  </span>
                )
              }
            </div>
          </div>
        }
      </Container>
    </Section>
  );
};
