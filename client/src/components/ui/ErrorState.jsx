import {
  Inbox,
} from "lucide-react";

const EmptyState = ({
  icon: Icon = Inbox,
  title = "Nothing here yet",
  description = "There is no data to display.",
  action,
}) => {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-dashed
        border-slate-300
        px-6
        py-14
        text-center

        dark:border-slate-700
      "
    >
      <div
        className="
          flex h-12 w-12
          items-center
          justify-center
          rounded-2xl
          bg-slate-100
          text-slate-500

          dark:bg-slate-800
          dark:text-slate-400
        "
      >
        <Icon size={22} />
      </div>

      <h3
        className="
          mt-4
          text-sm
          font-bold
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-2
          max-w-sm
          text-sm
          leading-6
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