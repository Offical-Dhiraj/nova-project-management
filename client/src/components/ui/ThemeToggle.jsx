import {
  Laptop,
  Moon,
  Sun,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

const themes = [
  {
    value: "light",
    label: "Light",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
  },
  {
    value: "system",
    label: "System",
    icon: Laptop,
  },
];

const ThemeToggle = () => {
  const {
    theme,
    setTheme,
  } = useTheme();

  return (
    <div
      className="
        inline-flex items-center gap-1
        rounded-xl border border-slate-200
        bg-white p-1 shadow-sm
        dark:border-slate-800
        dark:bg-slate-900
      "
      aria-label="Theme selection"
    >
      {themes.map(
        ({
          value,
          label,
          icon: Icon,
        }) => {
          const active =
            theme === value;

          return (
            <button
              key={value}
              type="button"
              onClick={() =>
                setTheme(value)
              }
              title={label}
              aria-label={`Use ${label} theme`}
              aria-pressed={active}
              className={`
                flex h-9 items-center
                gap-2 rounded-lg px-3
                text-xs font-semibold
                transition-all
                focus:outline-none
                focus:ring-2
                focus:ring-violet-500/30

                ${
                  active
                    ? "bg-violet-600 text-white shadow-sm"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                }
              `}
            >
              <Icon size={15} />

              <span className="hidden sm:inline">
                {label}
              </span>
            </button>
          );
        },
      )}
    </div>
  );
};

export default ThemeToggle;