import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "../util/container";
import { useTheme } from ".";
import { Icon } from "../util/icon";
import { tinaField } from "tinacms/dist/react";
import { GlobalHeader } from "../../tina/__generated__/types";
import { usePageStateStore } from "../store";
import { shallow } from "zustand/shallow";
import { useLocation } from "react-router";
import {
  ArchiveBoxIcon,
  Bars3Icon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  QueueListIcon, TagIcon, UserCircleIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";

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
      icon: ArchiveBoxIcon
    },
    {
      label: "相册",
      href: "/gallery",
      icon: TagIcon
    },
    {
      label: "关于",
      href: "/about",
      icon: UserCircleIcon
    }
  ];

  return (
    <ul className="my-4 flex h-full w-full flex-col justify-center gap-4 text-xl xl:m-0 xl:flex-row xl:gap-8">
      {navListItems.map(({ label, href, icon }, key) => (
        <Link
          key={label}
          href={href}
          className="transition-apple flex flex-row flex-nowrap place-items-center gap-2 text-white/80 hover:text-white"
        >
          {React.createElement(icon, { className: "h-[1.25rem] w-[1.25rem]" })}
          <span className={`whitespace-nowrap block text-base`}>{label}</span>
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
    // <div
    //   className={`relative overflow-hidden bg-gradient-to-b`}
    // >
    //   <Container size="custom" className="py-0 relative z-10 max-w-8xl">
    //     <div className="flex items-center justify-between gap-6">
    //       <Link href="/"
    //             className="select-none flex gap-2 items-center whitespace-nowrap"
    //       >
    //         <h1 data-tina-field={tinaField(data, "name")} className="text-base">{data.name}</h1>
    //       </Link>
    //       <ul className="flex gap-4 fhd:gap-8 -mx-4">
    //         {data.nav && data.nav.map((item, i) => {
    //           const activeItem =
    //             (item.href === ""
    //               ? router.asPath === "/"
    //               : router.asPath.includes(item.href)) && isClient;
    //           return (
    //             <li key={`${item.label}-${i}`} className={`${activeItem ? "text-red-400" : ""}`}
    //             >
    //               <Link
    //                 data-tina-field={tinaField(item, "label")}
    //                 href={`/${item.href}`}
    //                 className={`relative select-none text-base inline-block tracking-wide transition-apple hover:opacity-100 py-8 px-4 ${activeItem ? `` : `opacity-70`}`}
    //               >
    //                 {item.label}
    //                 {activeItem && (
    //                   <svg
    //                     className={`absolute bottom-0 left-1/2 w-[180%] h-full -translate-x-1/2 -z-1 opacity-10 dark:opacity-15`}
    //                     preserveAspectRatio="none"
    //                     viewBox="0 0 230 230"
    //                     fill="none"
    //                     xmlns="http://www.w3.org/2000/svg"
    //                   >
    //                     <rect
    //                       x="230"
    //                       y="230"
    //                       width="230"
    //                       height="230"
    //                       transform="rotate(-180 230 230)"
    //                       fill="url(#paint0_radial_1_33)"
    //                     />
    //                     <defs>
    //                       <radialGradient
    //                         id="paint0_radial_1_33"
    //                         cx="0"
    //                         cy="0"
    //                         r="1"
    //                         gradientUnits="userSpaceOnUse"
    //                         gradientTransform="translate(345 230) rotate(90) scale(230 115)"
    //                       >
    //                         <stop stopColor="currentColor" />
    //                         <stop
    //                           offset="1"
    //                           stopColor="currentColor"
    //                           stopOpacity="0"
    //                         />
    //                       </radialGradient>
    //                     </defs>
    //                   </svg>
    //                 )}
    //               </Link>
    //             </li>
    //           );
    //         })}
    //       </ul>
    //     </div>
    //     <div
    //       className={`absolute h-1 bg-gradient-to-r from-transparent ${
    //         data.color === "primary" ? `via-white` : `via-black dark:via-white`
    //       } to-transparent bottom-0 left-4 right-4 -z-1 opacity-5`}
    //     />
    //   </Container>
    // </div>
    <div className={`top-bar-wrapper`}>
      <div
        className={`top-bar ${className}`}
        style={{
          background: `linear-gradient(to right, rgb(0,0,0,0.7) ${
            scroll * 0.75 - 10
          }%, rgb(82, 82, 82,0.8) ${scroll}%, rgb(0,0,0,0.7) ${scroll}%)`
        }}
      >
        <div className="transition-apple flex w-full flex-row px-4 py-2 align-baseline xl:px-8">
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
          <Link
            href="/"
            className="transition-apple text-xl text-white/80 hover:text-white xl:text-2xl"
          >
            <h1 data-tina-field={tinaField(data, "name")} className="text-base">{data.name}</h1>
          </Link>
          <div className={`hidden xl:block xl:grow`}>
            <span></span>
          </div>
          <div className="hidden items-center justify-center xl:block ">
            <NavList />
          </div>
          <div className={`grow xl:hidden`}></div>
          {/*<DarkModeToggle className={`transition-apple ml-8 text-white/80 hover:text-white`} />*/}
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
