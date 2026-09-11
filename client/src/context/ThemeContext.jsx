import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const ThemeContext =
  createContext(null);

const STORAGE_KEY = "nova-theme";

const getSystemTheme = () => {
  if (
    typeof window === "undefined"
  ) {
    return "light";
  }

  return window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches
    ? "dark"
    : "light";
};

const getInitialTheme = () => {
  const savedTheme =
    localStorage.getItem(
      STORAGE_KEY,
    );

  if (
    savedTheme === "light" ||
    savedTheme === "dark" ||
    savedTheme === "system"
  ) {
    return savedTheme;
  }

  return "system";
};

const ThemeProvider = ({
  children,
}) => {
  const [theme, setTheme] =
    useState(getInitialTheme);

  const [resolvedTheme, setResolvedTheme] =
    useState(() =>
      theme === "system"
        ? getSystemTheme()
        : theme,
    );

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      theme,
    );

    const updateTheme = () => {
      const nextTheme =
        theme === "system"
          ? getSystemTheme()
          : theme;

      setResolvedTheme(nextTheme);

      document.documentElement.classList.toggle(
        "dark",
        nextTheme === "dark",
      );

      document.documentElement.style.colorScheme =
        nextTheme;
    };

    updateTheme();

    if (theme !== "system") {
      return undefined;
    }

    const mediaQuery =
      window.matchMedia(
        "(prefers-color-scheme: dark)",
      );

    mediaQuery.addEventListener(
      "change",
      updateTheme,
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateTheme,
      );
    };
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      isDark:
        resolvedTheme === "dark",
    }),
    [theme, resolvedTheme],
  );

  return (
    <ThemeContext.Provider
      value={value}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;