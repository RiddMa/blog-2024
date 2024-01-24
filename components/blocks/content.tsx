import React, { useEffect, useState } from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import type { TinaTemplate } from "tinacms";
import { PageBlocksContent } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import emoji from "remark-emoji";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import CopyToClipboard from "react-copy-to-clipboard";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// const CodeBlock = ({ children, language }) => {
//   useEffect(() => {
//     hljs.highlightAll();
//   }, [children]);
//
//   return (
//     <pre
//       style={{ margin: 0, padding: "1rem 0.5rem", borderRadius: "1rem", fontSize: "1.125rem", fontWeight: "regular" }}>
//       <code className={`language-${language}`} style={{ fontFamily: "JetBrains Mono, monospace", color: "#cbd5e1" }}>
//         {children}
//       </code>
//     </pre>
//   );
// };

export const Content = ({ data }: { data: PageBlocksContent }) => {
  const [copied, setCopied] = useState(false);

  const [style, setStyle] = useState({});
  useEffect(() => {
    import("react-syntax-highlighter/dist/esm/styles/prism/material-dark")
      .then(mod => setStyle(mod.default));
  });

  return (
    <Section color={data.color}>
      <Container
        className={`prose prose-lg ${
          data.color === "primary" ? `prose-primary` : `dark:prose-dark`
        }`}
        data-tina-field={tinaField(data, "body")}
        size="large"
        width="medium"
      >
        <Markdown remarkPlugins={[remarkGfm, remarkMath, emoji]}
                  rehypePlugins={[rehypeKatex, rehypeRaw]}
                  className={`transition-apple prose-article`}
                  skipHtml={false}
                  components={{
                    pre(props) {
                      return <pre className={`relative max-w-[calc(100vw-3rem)]`}>{props.children}</pre>;
                    },
                    code({ node, className, children, ...props }) {
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
                  }}
        >
          {data.body}
        </Markdown>
      </Container>
    </Section>
  );
};

export const contentBlockSchema: TinaTemplate = {
  name: "content",
  label: "Content",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede."
    }
  },
  fields: [
    {
      type: "rich-text",
      label: "Body",
      name: "body"
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" }
      ]
    }
  ]
};
