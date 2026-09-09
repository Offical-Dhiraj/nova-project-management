import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext(null);

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
    localStorage.getItem(STORAGE_KEY);

  if (
    savedTheme === "light" ||
    savedTheme === "dark" ||
    savedTheme === "system"
  ) {
    return savedTheme;
  }

  return "system";
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    getInitialTheme,
  );

  const resolvedTheme =
    theme === "system"
      ? getSystemTheme()
      : theme;

  useEffect(() => {
    const root =
      document.documentElement;

    root.classList.toggle(
      "dark",
      resolvedTheme === "dark",
    );

    root.style.colorScheme =
      resolvedTheme;
  }, [resolvedTheme]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      theme,
    );
  }, [theme]);

  useEffect(() => {
    if (theme !== "system") {
      return;
    }

    const mediaQuery =
      window.matchMedia(
        "(prefers-color-scheme: dark)",
      );

    const handleChange = () => {
      const root =
        document.documentElement;

      root.classList.toggle(
        "dark",
        mediaQuery.matches,
      );

      root.style.colorScheme =
        mediaQuery.matches
          ? "dark"
          : "light";
    };

    mediaQuery.addEventListener(
      "change",
      handleChange,
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange,
      );
    };
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        resolvedTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context =
    useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider",
    );
  }

  return context;
};

export default ThemeProvider;