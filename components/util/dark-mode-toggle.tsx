import React from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import useDarkMode from "use-dark-mode";

interface DarkModeToggleProps {
  className?: string;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ className = '' }) => {
  let defaultDark = false;
  if (typeof window !== "undefined") {
    defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  const darkMode = useDarkMode(defaultDark, {
    classNameDark: "dark",
    classNameLight: "light",
    storageKey: "darkMode",
  });

  return (
    <button type="button" onClick={darkMode.toggle} className={`w-5 ${className}`}>
      {darkMode.value ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

export default DarkModeToggle;
