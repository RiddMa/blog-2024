import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaFacebookF, FaGithub, FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { Container } from "../../util/container";
import { useTheme } from "..";
import { Icon } from "../../util/icon";

export const Footer = ({ data, icon = null }) => {
  const theme = useTheme();
  const socialIconClasses = "h-7 w-auto";
  const socialIconColorClasses = {
    blue: "text-blue-500 dark:text-blue-400 hover:text-blue-300",
    teal: "text-teal-500 dark:text-teal-400 hover:text-teal-300",
    green: "text-green-500 dark:text-green-400 hover:text-green-300",
    red: "text-red-500 dark:text-red-400 hover:text-red-300",
    pink: "text-pink-500 dark:text-pink-400 hover:text-pink-300",
    purple: "text-purple-500 dark:text-purple-400 hover:text-purple-300",
    orange: "text-orange-500 dark:text-orange-400 hover:text-orange-300",
    yellow: "text-yellow-500 dark:text-yellow-400 hover:text-yellow-300",
    primary: "text-white opacity-80 hover:opacity-100"
  };

  const footerColor = {
    default:
      "text-gray-800 from-white to-gray-50 dark:from-gray-900 dark:to-gray-1000",
    primary: {
      blue: "text-white from-blue-500 to-blue-700",
      teal: "text-white from-teal-500 to-teal-600",
      green: "text-white from-green-500 to-green-600",
      red: "text-white from-red-500 to-red-600",
      pink: "text-white from-pink-500 to-pink-600",
      purple: "text-white from-purple-500 to-purple-600",
      orange: "text-white from-orange-500 to-orange-600",
      yellow: "text-white from-yellow-500 to-yellow-600"
    }
  };

  const footerColorCss =
    data.color === "primary"
      ? footerColor.primary[theme.color]
      : footerColor.default;

  const [viewCount, setViewCount] = useState(0);
  useEffect(() => {
    const apiPrefix = {
      production: "api",
      development: "test"
    };
    fetch(`${process.env.VIEWCOUNT_API}/${apiPrefix[process.env.NODE_ENV]}/total/`)
      .then((response) => response.json()) // parse JSON from request
      .then((resultData) => {
        setViewCount(resultData.totalView);
      });
  }, []);

  return (
    <footer className={`bg-gradient-to-br ${footerColorCss}`}>
      <Container
        className="px-4 py-16 flex flex-row flex-wrap justify-center gap-8 lg:gap-16 prose-text transition-apple opacity-80 hover:opacity-100">
        <div className="flex flex-row flex-wrap justify-between items-center gap-4">
          {data?.nav?.map((nav) =>
            <Link key={nav.href} href={nav.href} className="">
              {nav.label}
            </Link>)}
          <div className="flex gap-4">
            {data.social && data.social.facebook && (
              <a
                className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
                href={data.social.facebook}
                target="_blank"
              >
                <FaFacebookF
                  className={`${socialIconClasses} ${
                    socialIconColorClasses[
                      data.color === "primary" ? "primary" : theme.color
                      ]
                  }`}
                />
              </a>
            )}
            {data.social && data.social.twitter && (
              <a
                className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
                href={data.social.twitter}
                target="_blank"
              >
                <FaTwitter
                  className={`${socialIconClasses} ${
                    socialIconColorClasses[
                      data.color === "primary" ? "primary" : theme.color
                      ]
                  }`}
                />
              </a>
            )}
            {data.social && data.social.instagram && (
              <a
                className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
                href={data.social.instagram}
                target="_blank"
              >
                <AiFillInstagram
                  className={`${socialIconClasses} ${
                    socialIconColorClasses[
                      data.color === "primary" ? "primary" : theme.color
                      ]
                  }`}
                />
              </a>
            )}
            {data.social && data.social.github && (
              <a
                className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
                href={data.social.github}
                target="_blank"
              >
                <FaGithub
                  className={`${socialIconClasses} ${
                    socialIconColorClasses[
                      data.color === "primary" ? "primary" : theme.color
                      ]
                  }`}
                />
              </a>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 text-caption">
          <div className={`mx-auto`}>
          <span>
            {viewCount ? `${viewCount}` : `...`}
            {` 次访问。`}
          </span>
          </div>
          <div className={`mx-auto flex flex-row flex-wrap justify-center gap-x-1`}>
            <span className={`whitespace-nowrap`}>{`© Ridd Ma 始于 2023，`}</span>
            <span className={`whitespace-nowrap`}>
            {`使用 `}
              <a href={`https://creativecommons.org/licenses/by-nc-sa/4.0/`} target="_blank">CC-BY-NC-SA 4.0</a>
              {` 授权。`}
          </span>
          </div>
          <div className={`mx-auto flex flex-row flex-wrap justify-center gap-x-1`}>
          <span className={`whitespace-nowrap`}>{`由 `}
            <a href={`https://creativecommons.org/licenses/by-nc-sa/4.0/`} target="_blank">TinaCMS</a>
            {` 强力驱动。`}
          </span>
          </div>
        </div>


      </Container>
      <div
        className={`absolute h-1 bg-gradient-to-r from-transparent ${
          data.color === "primary" ? `via-white` : `via-black dark:via-white`
        } to-transparent top-0 left-4 right-4 opacity-5`}
      ></div>
    </footer>
  );
};
