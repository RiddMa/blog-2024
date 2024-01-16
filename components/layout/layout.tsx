import React from "react";
import Head from "next/head";
import { Header } from "./header";
import { Footer } from "./footer";
import layoutData from "../../public/content/global/index.json";
import { Global } from "../../tina/__generated__/types";

export const Layout = ({ rawData = {}, data = layoutData, children }: {
  rawData?: object;
  data?: Omit<Global, "id" | "_sys" | "_values">;
  children: React.ReactNode;
}) => {
  return (
    <>
      <Head>
        <title>Ridd的主页</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header data={data?.header} />
      <div className={`color-body z-0 flex min-h-screen flex-col justify-start space-y-0`}>
        <div className={`h-[96px]`}></div>
        <div className={`content-wrapper grow pb-16`}>
          <div className={`article-wrapper`}>{children}</div>
        </div>
        <Footer data={data?.footer} icon={data?.header.icon} />
      </div>
    </>
  );
};
