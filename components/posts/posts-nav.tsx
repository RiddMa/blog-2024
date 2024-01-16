import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";

const PostsNav = ({ navs }: { navs: { __typename: "GlobalPostNavsNav", href?: string, label?: string }[] }) => {
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

export default PostsNav;
