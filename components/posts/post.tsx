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

import React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import type { Components, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Prism } from "tinacms/dist/rich-text/prism";
import { PostType } from "../../pages/posts/[filename]";
import { tinaField } from "tinacms/dist/react";
import Link from "next/link";
import { ImageAwesome } from "../blocks/image-awesome";
import { format, formatDistanceToNowStrict } from "date-fns";
import { zhCN } from "date-fns/locale";
import { fixImgPath } from "../../util/util";

let mdPath = "";

const components: Components<{
  BlockQuote: {
    children: TinaMarkdownContent;
    authorName: string;
  };
  DateTime: {
    format?: string;
  };
  NewsletterSignup: {
    placeholder: string;
    buttonText: string;
    children: TinaMarkdownContent;
    disclaimer?: TinaMarkdownContent;
  };
}> = {
  code_block: (props) => <Prism {...props} />,
  BlockQuote: (props: {
    children: TinaMarkdownContent;
    authorName: string;
  }) => {
    return (
      <div>
        <blockquote>
          <TinaMarkdown content={props.children} />
          {props.authorName}
        </blockquote>
      </div>
    );
  },
  DateTime: (props) => {
    const dt = React.useMemo(() => {
      return new Date();
    }, []);

    switch (props.format) {
      case "iso":
        return <span>{format(dt, "yyyy-MM-dd")}</span>;
      case "utc":
        return <span>{format(dt, "eee, dd MMM yyyy HH:mm:ss OOOO")}</span>;
      case "local":
        return <span>{format(dt, "P")}</span>;
      default:
        return <span>{format(dt, "P")}</span>;
    }
  },
  NewsletterSignup: (props) => {
    return (
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="">
            <TinaMarkdown content={props.children} />
          </div>
          <div className="mt-8 ">
            <form className="sm:flex">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email-address"
                type="email"
                autoComplete="email"
                required
                className="w-full px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:max-w-xs rounded-md"
                placeholder={props.placeholder}
              />
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center py-3 px-5 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  {props.buttonText}
                </button>
              </div>
            </form>
            <div className="mt-3 text-sm text-gray-500">
              {props.disclaimer && <TinaMarkdown content={props.disclaimer} />}
            </div>
          </div>
        </div>
      </div>
    );
  },
  img: (props) => {
    // console.log("mdbody", mdPath);
    return <span>
      <div className="h-4"></div>
      <ImageAwesome src={fixImgPath(mdPath, props.url)} alt={props.alt} />
      <div className="h-4"></div>
    </span>;
  }
};

export const Post = (props: PostType) => {
  mdPath = props._sys.path;
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
  return (
    <Section>
      <Container className="flex flex-col gap-8">
        <h1
          data-tina-field={tinaField(props, "title")}
          className={`text-h1 text-center bg-clip-text text-transparent bg-gradient-to-r`}
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
          <ImageAwesome data-tina-field={tinaField(props, "heroImg")} src={fixImgPath(mdPath, props.heroImg)}
                        alt={props.title} />
        }
        <div
          data-tina-field={tinaField(props, "_body")}
          className="prose-article flex flex-col"
        >
          <TinaMarkdown components={components} content={props._body} />
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
