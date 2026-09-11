import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ChevronDown,
} from "lucide-react";

const Dropdown = ({
  trigger,
  children,
  align = "right",
}) => {
  const [open, setOpen] =
    useState(false);

  const ref =
    useRef(null);

  useEffect(() => {
    const handleOutsideClick = (
      event,
    ) => {
      if (
        ref.current &&
        !ref.current.contains(
          event.target,
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
    >
      <button
        type="button"
        onClick={() =>
          setOpen(
            (current) => !current,
          )
        }
        className="
          inline-flex
          items-center
          gap-2
        "
      >
        {trigger}

        <ChevronDown
          size={15}
          className={`
            transition-transform
            ${
              open
                ? "rotate-180"
                : ""
            }
          `}
        />
      </button>

      {open && (
        <div
          className={`
            absolute
            top-[calc(100%+8px)]
            z-50
            min-w-48
            overflow-hidden
            rounded-xl
            border
            border-slate-200
            bg-white
            p-1
            shadow-xl

            dark:border-slate-800
            dark:bg-slate-900

            ${
              align === "left"
                ? "left-0"
                : "right-0"
            }
          `}
          onClick={() =>
            setOpen(false)
          }
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;