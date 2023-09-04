import { useState, useEffect } from "react";
const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

type Mode = string;
type ToggleFn = () => void;

const useDarkMode = (): [Mode, ToggleFn] => {
  const [mode, setMode] = useState("");
  const lightTheme = "fantasy";
  const darkTheme = "dracula";

  useEffect(() => {
    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY);
    const userPref = localStorage.getItem("theme");

    const handleChangeTheme = () => {
      let check =
        (userPref && userPref === darkTheme) || mediaQuery.matches ? darkTheme : lightTheme;
      setMode(check);
      if (check === darkTheme) {
        document.documentElement.setAttribute("data-theme", darkTheme);
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
        document.documentElement.classList.remove("dark");
      }
    };

    mediaQuery.addEventListener("change", handleChangeTheme);

    return () => mediaQuery.removeEventListener("change", handleChangeTheme);
  }, []);

  useEffect(() => {
    if (mode === darkTheme) {
      localStorage.setItem("theme", darkTheme);
      document.documentElement.setAttribute("data-theme", darkTheme);
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", lightTheme);
      document.documentElement.removeAttribute("data-theme");
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  const toggleLightDarkMode = () => setMode(mode === darkTheme ? lightTheme : darkTheme);

  return [mode, toggleLightDarkMode];
};

export default useDarkMode;
