import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { tinaField } from "tinacms/dist/react";
import { usePageStateStore } from "../store";
import { shallow } from "zustand/shallow";
import {
  ArchiveBoxIcon,
  Bars3Icon, ChatBubbleBottomCenterTextIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon, PhotoIcon,
  QueueListIcon, TagIcon, UserCircleIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { PostType } from "../../pages/posts/[filename]";


export const RightNavbar = (props: PostType) => {
  const router = useRouter();
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const [rightNavOpen, setRightNav] = usePageStateStore(
    (state) => [state.rightNavOpen, state.setRightNav],
    shallow
  );

  return (
    <div
      className={`${
        rightNavOpen ? "translate-x-0" : "translate-x-full"
      } transition-apple column-right-wrapper color-body prose-text max-h-screen overflow-auto opacity-100 lg:translate-x-0 lg:opacity-60 lg:hover:opacity-100 `}
    >
      <div className={`h-[128px]`}></div>
      <aside className={`prose-text flex flex-col space-y-2 rounded-3xl drop-shadow-2xl`}>
        <p className={``}>本页（测试版功能尚不完善）</p>
        <div
          className={`table-of-content-wrapper max-h-[calc(60vh-96px)] overflow-auto`}
        >
          <div
            dangerouslySetInnerHTML={{ __html: props.toc }}
            className={`prose-text -ml-4 prose-p:my-1 prose-ul:m-0 prose-ul:ml-0 prose-ul:p-0 prose-li:my-0 prose-li:ml-4 prose-li:p-0`}
          ></div>
        </div>
        <div className={`h-4`}></div>
        <p className={``}>分类</p>
        {props.categories?.length ? (
          <>
            <div
              className={`flex flex-row flex-wrap gap-x-2`}
            >
              {props.categories.map((category) =>
                <Link key={category?.category?.name}
                      href={`/categories/${category.category._sys.filename}`}
                      className="text-color-href">
                  {category?.category?.name}
                </Link>)}
            </div>
          </>
        ) : (
          <span className={``}>无</span>
        )}
        <div className={`h-4`}></div>
        <p className={``}>专栏</p>
        {props.columns?.length ? (
          <>
            <div
              className={`flex flex-row flex-wrap gap-x-2`}
            >
              {props.columns.map((column) =>
                <Link key={column?.column?.name} href={`/columns/${column.column._sys.filename}`}
                      className="text-color-href">
                  {column?.column?.name}
                </Link>
              )}
            </div>
          </>
        ) : (
          <span className={``}>无</span>
        )}
        <div className={`h-4`}></div>
        <p className={`text-body`}>标签</p>
        {props.tags?.length ? (
          <>
            <div
              className={`flex flex-row flex-wrap gap-x-2`}
            >
              {props.tags.map((tag) =>
                <span key={tag} className="">
                  {tag}
                </span>
              )}
            </div>
          </>
        ) : (
          <span className={``}>无</span>
        )}
        <div className={`h-16`}></div>
      </aside>
    </div>
  );
};
