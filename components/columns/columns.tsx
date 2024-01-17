import React from "react";
import Link from "next/link";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { ColumnsType } from "../../pages/columns";
import { getUriFromFilepath } from "../../util/util";
import Image from "next/image";

type PageQueryColumnType = ColumnsType["node"]

export function ColumnCard(props: { column: PageQueryColumnType }) {
  const column = props.column;
  const columnHref = getUriFromFilepath(column._sys.path);

  return <Link href={columnHref}
               className="card color-card flex flex-row prose-article-card transition-apple drop-shadow-lg hover:drop-shadow-2xl max-h-[250px]">
    {column.heroImg && <div className="relative m-0 p-0 block min-w-[250px] max-w-[250px] min-h-[250px] max-h-[250px]">
      <Image src={column.heroImg} alt="" className="card"
             fill={true}
             style={{ objectFit: "cover", margin: 0 }}
      />
    </div>
    }
    <div className="m-0 flex flex-col flex-grow gap-4 p-4 xl:px-8">
      <h1 className="line-clamp-2 overflow-ellipsis">{column.name}</h1>
      <div className="m-0 line-clamp-2 overflow-ellipsis">
        <TinaMarkdown content={column.description} />
      </div>
      <div className={`grow`}></div>
      <div className={`m-0 flex flex-row`}>
        <div className={`grow`}></div>
        <span className={`text-body text-color-caption`}>
          {column.posts.length}篇文章
        </span>
      </div>
    </div>
  </Link>;
}


export const Columns = ({ data }: { data: ColumnsType[] }) => {
  return <div className="flex flex-col gap-8">
    <p className="px-content prose-text">共{data.length}个</p>
    {data.map((columnData) => {
      return (
        <ColumnCard key={columnData.node._sys.filename} column={columnData.node} />
      );
    })}
  </div>;
};
