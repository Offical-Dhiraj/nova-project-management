import {
  useEffect,
} from "react";

import {
  X,
} from "lucide-react";

const Modal = ({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
}) => {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    document.body.style.overflow =
      "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      document.body.style.overflow =
        "";
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  const width =
    size === "sm"
      ? "max-w-md"
      : size === "lg"
        ? "max-w-3xl"
        : "max-w-xl";

  return (
    <div
      className="
        fixed inset-0
        z-[100]
        flex
        items-center
        justify-center
        p-4
      "
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="
          absolute
          inset-0
          bg-slate-950/60
          backdrop-blur-sm
        "
      />

      <div
        className={`
          relative
          max-h-[90vh]
          w-full
          overflow-y-auto
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-2xl

          dark:border-slate-800
          dark:bg-slate-900

          ${width}
        `}
      >
        <div
          className="
            flex
            items-start
            justify-between
            gap-4
            border-b
            border-slate-200
            px-6
            py-5
            dark:border-slate-800
          "
        >
          <div>
            <h2
              className="
                text-lg
                font-bold
              "
            >
              {title}
            </h2>

            {description && (
              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                  dark:text-slate-400
                "
              >
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              p-2
              text-slate-400
              hover:bg-slate-100
              hover:text-slate-700

              dark:hover:bg-slate-800
              dark:hover:text-white
            "
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;