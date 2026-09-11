const variants = {
  default: `
    bg-slate-100
    text-slate-700
    dark:bg-slate-800
    dark:text-slate-300
  `,

  violet: `
    bg-violet-50
    text-violet-700
    dark:bg-violet-500/10
    dark:text-violet-400
  `,

  blue: `
    bg-blue-50
    text-blue-700
    dark:bg-blue-500/10
    dark:text-blue-400
  `,

  green: `
    bg-emerald-50
    text-emerald-700
    dark:bg-emerald-500/10
    dark:text-emerald-400
  `,

  yellow: `
    bg-amber-50
    text-amber-700
    dark:bg-amber-500/10
    dark:text-amber-400
  `,

  red: `
    bg-red-50
    text-red-700
    dark:bg-red-500/10
    dark:text-red-400
  `,
};

const Badge = ({
  children,
  variant = "default",
  className = "",
}) => {
  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-2.5
        py-1
        text-[11px]
        font-bold
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;