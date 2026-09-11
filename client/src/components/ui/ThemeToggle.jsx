import {
  Check,
  Monitor,
  Moon,
  Sun,
} from "lucide-react";

import useTheme from "../../hooks/useTheme";

const themes = [
  {
    value: "light",
    label: "Light",
    icon: Sun,
  },
  {
    value: "system",
    label: "System",
    icon: Monitor,
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
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
        flex items-center gap-1
        rounded-xl
        border
        border-slate-200
        bg-white
        p-1
        shadow-sm

        dark:border-slate-800
        dark:bg-slate-900
      "
      role="group"
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
              aria-label={`Use ${label.toLowerCase()} theme`}
              aria-pressed={active}
              className={`
                relative
                flex h-8
                items-center
                gap-1.5
                rounded-lg
                px-2.5
                text-xs
                font-semibold
                transition-all

                ${
                  active
                    ? `
                      bg-violet-600
                      text-white
                      shadow-sm
                    `
                    : `
                      text-slate-500
                      hover:bg-slate-100
                      hover:text-slate-900

                      dark:text-slate-400
                      dark:hover:bg-slate-800
                      dark:hover:text-white
                    `
                }
              `}
            >
              <Icon size={14} />

              <span className="hidden sm:inline">
                {label}
              </span>

              {active && (
                <Check
                  size={12}
                  className="hidden md:block"
                />
              )}
            </button>
          );
        },
      )}
    </div>
  );
};

export default ThemeToggle;