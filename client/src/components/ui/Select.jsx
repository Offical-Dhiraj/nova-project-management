import {
  forwardRef,
} from "react";

import {
  ChevronDown,
} from "lucide-react";

const Select = forwardRef(
  (
    {
      label,
      error,
      hint,
      required = false,
      options = [],
      placeholder = "Select an option",
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

        <div className="relative">
          <select
            ref={ref}
            id={id}
            aria-invalid={Boolean(error)}
            className={`
              h-11
              w-full
              appearance-none
              rounded-xl
              border
              bg-white
              px-3.5
              pr-10
              text-sm
              text-slate-900
              outline-none

              focus:ring-4

              dark:bg-slate-950
              dark:text-white

              ${
                error
                  ? `
                    border-red-300
                    focus:border-red-500
                    focus:ring-red-500/10
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
          >
            <option value="">
              {placeholder}
            </option>

            {options.map(
              (option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ),
            )}
          </select>

          <ChevronDown
            size={17}
            className="
              pointer-events-none
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />
        </div>

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

Select.displayName = "Select";

export default Select;