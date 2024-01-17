import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { tinaField } from "tinacms/dist/react";
import { GlobalHeader } from "../../tina/__generated__/types";
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
import DarkModeToggle from "../util/dark-mode-toggle";

const isActivePath = (pathName: string, href: string): boolean => {
  switch (href) {
    case "/posts": {
      return pathName.startsWith("/posts") || pathName.startsWith("/columns") || pathName.startsWith("/categories");
    }
    default: {
      return pathName.startsWith(href);
    }
  }
};

function NavList() {
  const navListItems = [
    {
      label: "文章",
      href: "/posts",
      icon: QueueListIcon
    },
    {
      label: "想法",
      href: "/ideas",
      icon: ChatBubbleBottomCenterTextIcon
    },
    {
      label: "相册",
      href: "/gallery",
      icon: PhotoIcon
    },
    {
      label: "关于",
      href: "/about",
      icon: UserCircleIcon
    }
  ];
  const router = useRouter();
  return (
    <ul className="my-4 flex h-full w-full flex-col justify-center text-xl xl:m-0 xl:flex-row">
      {navListItems.map(({ label, href, icon }, key) => (
        <Link
          key={label}
          href={href}
          className={`transition-apple flex flex-row flex-nowrap place-items-center px-4 py-2 text-white/80 hover:text-white ${isActivePath(router.pathname, href) ? "glowEffect" : ""}`}
        >
          {React.createElement(icon, { className: "h-[1.25rem] w-[1.25rem] mr-1 mt-0.5" })}
          <span className={`whitespace-nowrap inline-block text-base`}>{label}</span>
        </Link>
      ))}
    </ul>
  );
}


export const Header = ({ data, className }: { data: GlobalHeader, className?: string }) => {
  const router = useRouter();
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const [navOpen, setNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scroll, setScroll] = useState(0);
  const toggleIsNavOpen = () => setNavOpen((cur) => !cur);
  const calcScrollPercent = () => {
    const scrolled = document.documentElement.scrollTop;
    const maxHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrolled / maxHeight) * 100;
    setScroll(scrollPercent);
  };

  useEffect(() => {
    if (window.innerWidth >= 1280) {
      setIsMobile(false);
      setRightNav(false);
      setLeftNav(false);
    } else {
      setIsMobile(true);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1280) {
        setNavOpen(false);
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    });
    calcScrollPercent();
    window.addEventListener("scroll", calcScrollPercent);
  }, []);

  const [rightNavOpen, setRightNav, leftNavOpen, setLeftNav] = usePageStateStore(
    (state) => [state.rightNavOpen, state.setRightNav, state.leftNavOpen, state.setLeftNav],
    shallow
  );
  const [showLeftNavToggle, setShowLeftNavToggle] = useState(false);
  const [showRightNavToggle, setShowRightNavToggle] = useState(false);
  const location = router.pathname;
  useEffect(() => {
    if (location.startsWith("/posts") || location.startsWith("/about")) {
      setShowLeftNavToggle(true);
      setShowRightNavToggle(true);
    } else {
      setShowLeftNavToggle(false);
      setShowRightNavToggle(false);
    }
  }, [location]);

  return (
    <div className={`top-bar-wrapper`}>
      <div
        className={`top-bar ${className}`}
        style={{
          background: `linear-gradient(to right, rgb(0,0,0,0.7) ${
            scroll * 0.75 - 10
          }%, rgb(82, 82, 82,0.8) ${scroll}%, rgb(0,0,0,0.7) ${scroll}%)`
        }}
      >
        <div className="transition-apple flex w-full flex-row items-center px-4 py-0 xl:px-8">
          {showLeftNavToggle && (
            <button
              onClick={() => {
                setRightNav(false);
                setLeftNav(!leftNavOpen);
              }}
              className="my-auto ml-0 mr-2 h-5 w-5 p-0 text-white/[0.75] xl:hidden"
            >
              {leftNavOpen ? <ChevronDoubleLeftIcon /> : <ChevronDoubleRightIcon />}
            </button>
          )}
          <Link href="/" className="text-body text-white/80 hover:text-white transition-apple">
            <h1 data-tina-field={tinaField(data, "name")}>{data.name}</h1>
          </Link>
          <div className={`hidden xl:block xl:grow`}>
            <span></span>
          </div>
          <div className="hidden items-center justify-center xl:block">
            <NavList />
          </div>
          <div className={`grow xl:hidden`}></div>
          <DarkModeToggle className={`transition-apple ml-8 text-white/80 hover:text-white`} />
          <button
            onClick={toggleIsNavOpen}
            className="ml-2 mr-0 w-6 text-white/[0.75] hover:text-white xl:hidden"
          >
            {navOpen ? <XMarkIcon /> : <Bars3Icon />}
          </button>
          {showRightNavToggle && (
            <button
              onClick={() => {
                setLeftNav(false);
                setRightNav(!rightNavOpen);
              }}
              className="ml-2 mr-0 w-5 p-0 text-white/[0.75] xl:hidden"
            >
              {rightNavOpen ? <ChevronDoubleRightIcon /> : <ChevronDoubleLeftIcon />}
            </button>
          )}
        </div>
        <div
          className={`overflow-hidden px-4 py-0 xl:hidden ${
            navOpen ? `max-h-60` : `max-h-0`
          }`}
        >
          <NavList />
        </div>
      </div>
    </div>
  );
};
