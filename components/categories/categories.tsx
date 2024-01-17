import React from "react";
import Link from "next/link";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { getUriFromFilepath } from "../../util/util";
import Image from "next/image";
import { CategoriesType } from "../../pages/categories";

type PageQueryCategoryType = CategoriesType["node"]

export function CategoryCard(props: { category: PageQueryCategoryType }) {
  const category = props.category;
  const categoryHref = getUriFromFilepath(category._sys.path);

  return <Link href={categoryHref}
               className="card color-card flex flex-row prose-article-card transition-apple drop-shadow-lg hover:drop-shadow-2xl max-h-[250px]">
    {category.heroImg && <div className="relative m-0 p-0 block min-w-[250px] max-w-[250px] min-h-[250px] max-h-[250px]">
      <Image src={category.heroImg} alt="" className="card"
             fill={true}
             style={{ objectFit: "cover", margin: 0 }}
      />
    </div>
    }
    <div className="m-0 flex flex-col flex-grow gap-4 p-4 xl:px-8">
      <h1 className="line-clamp-2 overflow-ellipsis">{category.name}</h1>
      <div className="m-0 line-clamp-2 overflow-ellipsis">
        <TinaMarkdown content={category.description} />
      </div>
      <div className={`grow`}></div>
      <div className={`m-0 flex flex-row`}>
        <div className={`grow`}></div>
        <span className={`text-body text-color-caption`}>
          {category.posts.length}篇文章
        </span>
      </div>
    </div>
  </Link>;
}


export const Categories = ({ data }: { data: CategoriesType[] }) => {
  return <div className="flex flex-col gap-8">
    <p className="px-content prose-text">共{data.length}个</p>
    {data.map((categoryData) => {
      return (
        <CategoryCard key={categoryData.node._sys.filename} category={categoryData.node} />
      );
    })}
  </div>;
};
