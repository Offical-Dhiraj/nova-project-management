import {
  Loader2,
} from "lucide-react";

const variants = {
  primary: `
    bg-violet-600 text-white
    hover:bg-violet-700
    shadow-sm shadow-violet-500/20
  `,

  secondary: `
    border border-slate-200
    bg-white text-slate-700
    hover:bg-slate-50
    dark:border-slate-700
    dark:bg-slate-900
    dark:text-slate-200
    dark:hover:bg-slate-800
  `,

  danger: `
    bg-red-600 text-white
    hover:bg-red-700
  `,

  ghost: `
    text-slate-600
    hover:bg-slate-100
    dark:text-slate-300
    dark:hover:bg-slate-800
  `,
};

const sizes = {
  sm: "h-9 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-sm",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={
        loading || props.disabled
      }
      className={`
        inline-flex items-center
        justify-center gap-2
        rounded-xl
        font-semibold
        transition-all
        focus:outline-none
        focus:ring-2
        focus:ring-violet-500/30
        disabled:cursor-not-allowed
        disabled:opacity-50

        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {loading && (
        <Loader2
          size={15}
          className="animate-spin"
        />
      )}

      {children}
    </button>
  );
};

export default Button;