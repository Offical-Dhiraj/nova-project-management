import {
  forwardRef,
} from "react";

const Textarea = forwardRef(
  (
    {
      label,
      error,
      hint,
      required = false,
      className = "",
      id,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={id}
            className="
              block
              text-sm
              font-semibold
              text-slate-700
              dark:text-slate-200
            "
          >
            {label}

            {required && (
              <span className="ml-1 text-red-500">
                *
              </span>
            )}
          </label>
        )}

        <textarea
          ref={ref}
          id={id}
          aria-invalid={Boolean(error)}
          className={`
            min-h-28
            w-full
            resize-y
            rounded-xl
            border
            bg-white
            px-3.5
            py-3
            text-sm
            text-slate-900
            outline-none
            transition

            placeholder:text-slate-400

            focus:ring-4

            dark:bg-slate-950
            dark:text-white
            dark:placeholder:text-slate-600

            ${
              error
                ? `
                  border-red-300
                  focus:border-red-500
                  focus:ring-red-500/10
                  dark:border-red-800
                `
                : `
                  border-slate-200
                  focus:border-violet-500
                  focus:ring-violet-500/10
                  dark:border-slate-800
                `
            }

            ${className}
          `}
          {...props}
        />

        {hint && !error && (
          <p className="text-xs text-slate-400">
            {hint}
          </p>
        )}

        {error && (
          <p
            className="
              text-xs
              font-medium
              text-red-600
              dark:text-red-400
            "
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName =
  "Textarea";

export default Textarea;