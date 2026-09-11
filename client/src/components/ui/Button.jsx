import {
  Loader2,
} from "lucide-react";

const variants = {
  primary: `
    bg-violet-600
    text-white
    shadow-sm
    shadow-violet-600/20

    hover:bg-violet-700

    focus-visible:outline-none
    focus-visible:ring-4
    focus-visible:ring-violet-500/20

    disabled:bg-violet-300
  `,

  secondary: `
    border
    border-slate-200
    bg-white
    text-slate-700
    shadow-sm

    hover:bg-slate-50

    dark:border-slate-700
    dark:bg-slate-900
    dark:text-slate-200
    dark:hover:bg-slate-800

    focus-visible:outline-none
    focus-visible:ring-4
    focus-visible:ring-slate-500/10
  `,

  ghost: `
    text-slate-600
    hover:bg-slate-100
    hover:text-slate-900

    dark:text-slate-400
    dark:hover:bg-slate-900
    dark:hover:text-white
  `,

  danger: `
    bg-red-600
    text-white

    hover:bg-red-700

    focus-visible:outline-none
    focus-visible:ring-4
    focus-visible:ring-red-500/20

    disabled:bg-red-300
  `,
};

const sizes = {
  sm: `
    h-9
    px-3
    text-xs
    rounded-lg
  `,

  md: `
    h-10
    px-4
    text-sm
    rounded-xl
  `,

  lg: `
    h-12
    px-5
    text-sm
    rounded-xl
  `,
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={
        disabled || loading
      }
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        whitespace-nowrap
        font-semibold
        transition-all
        active:scale-[0.98]

        disabled:cursor-not-allowed
        disabled:opacity-60

        ${variants[variant]}

        ${sizes[size]}

        ${className}
      `}
      {...props}
    >
      {loading && (
        <Loader2
          size={16}
          className="animate-spin"
        />
      )}

      {children}
    </button>
  );
};

export default Button;