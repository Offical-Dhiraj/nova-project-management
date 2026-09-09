import {
  FolderPlus,
} from "lucide-react";

const EmptyState = ({
  title,
  description,
  action,
}) => {
  return (
    <div
      className="
        flex flex-col items-center
        justify-center rounded-2xl
        border border-dashed
        border-slate-300
        bg-white px-6 py-16
        text-center
        dark:border-slate-700
        dark:bg-slate-900
      "
    >
      <div
        className="
          mb-4 flex h-12 w-12
          items-center justify-center
          rounded-2xl
          bg-violet-50
          text-violet-600
          dark:bg-violet-500/10
          dark:text-violet-400
        "
      >
        <FolderPlus size={22} />
      </div>

      <h3
        className="
          text-base font-semibold
          text-slate-900
          dark:text-white
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-2 max-w-sm
          text-sm leading-6
          text-slate-500
          dark:text-slate-400
        "
      >
        {description}
      </p>

      {action && (
        <div className="mt-5">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;