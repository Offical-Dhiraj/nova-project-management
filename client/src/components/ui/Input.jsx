import {
  forwardRef,
} from "react";

import {
  AlertCircle,
} from "lucide-react";

const Input = forwardRef(
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

        <input
          ref={ref}
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error
              ? `${id}-error`
              : hint
                ? `${id}-hint`
                : undefined
          }
          className={`
            h-11
            w-full
            rounded-xl
            border
            bg-white
            px-3.5
            text-sm
            text-slate-900
            outline-none
            transition-all

            placeholder:text-slate-400

            focus:ring-4

            disabled:cursor-not-allowed
            disabled:bg-slate-100
            disabled:opacity-60

            dark:bg-slate-950
            dark:text-white
            dark:placeholder:text-slate-600
            dark:disabled:bg-slate-900

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
          <p
            id={`${id}-hint`}
            className="
              text-xs
              text-slate-400
            "
          >
            {hint}
          </p>
        )}

        {error && (
          <p
            id={`${id}-error`}
            className="
              flex items-center
              gap-1
              text-xs
              font-medium
              text-red-600
              dark:text-red-400
            "
          >
            <AlertCircle size={13} />
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;