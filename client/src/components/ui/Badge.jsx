const statusStyles = {
  PLANNING:
    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",

  IN_PROGRESS:
    "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400",

  COMPLETED:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",

  ON_HOLD:
    "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",

  TODO:
    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",

  REVIEW:
    "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",

  LOW:
    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",

  MEDIUM:
    "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",

  HIGH:
    "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",

  URGENT:
    "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

const Badge = ({
  value,
  className = "",
}) => {
  const style =
    statusStyles[value] ||
    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300";

  const label = value
    ?.replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) =>
      char.toUpperCase(),
    );

  return (
    <span
      className={`
        inline-flex items-center
        rounded-lg px-2.5 py-1
        text-[10px] font-bold
        uppercase tracking-wide
        ${style}
        ${className}
      `}
    >
      {label}
    </span>
  );
};

export default Badge;