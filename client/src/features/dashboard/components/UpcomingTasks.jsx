import {
  ArrowRight,
  CalendarDays,
  CircleAlert,
} from "lucide-react";

import { Link } from "react-router-dom";

const formatDate = (
  date,
) => {
  if (!date) return "No date";

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  ).format(new Date(date));
};

const UpcomingTasks = ({
  tasks,
}) => {
  return (
    <section
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm

        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-slate-200
          px-5
          py-4

          dark:border-slate-800
        "
      >
        <div>
          <h2 className="text-base font-bold text-slate-950 dark:text-white">
            Upcoming tasks
          </h2>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Keep an eye on what is
            coming next
          </p>
        </div>

        <Link
          to="/tasks"
          className="
            flex
            items-center
            gap-1
            text-xs
            font-bold
            text-violet-600
            dark:text-violet-400
          "
        >
          All tasks
          <ArrowRight size={14} />
        </Link>
      </div>

      {tasks.length === 0 ? (
        <div className="flex min-h-48 flex-col items-center justify-center px-5 text-center">
          <CalendarDays
            size={25}
            className="text-slate-300 dark:text-slate-600"
          />

          <p className="mt-3 text-sm font-bold text-slate-700 dark:text-slate-300">
            Nothing upcoming
          </p>

          <p className="mt-1 text-xs text-slate-400">
            You're all caught up.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {tasks.map(
            (task) => (
              <Link
                key={
                  task._id ||
                  task.id
                }
                to={`/tasks`}
                className="
                  flex
                  items-center
                  gap-3
                  px-5
                  py-4
                  transition
                  hover:bg-slate-50

                  dark:hover:bg-slate-800/50
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-violet-50
                    text-violet-600

                    dark:bg-violet-500/10
                    dark:text-violet-400
                  "
                >
                  <CalendarDays
                    size={17}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-800 dark:text-slate-100">
                    {task.title}
                  </p>

                  <p className="mt-1 text-[11px] text-slate-400">
                    {task.project?.name ||
                      "Project"}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                    {formatDate(
                      task.dueDate,
                    )}
                  </p>

                  {task.priority ===
                    "URGENT" && (
                    <div className="mt-1 flex items-center justify-end gap-1 text-[10px] font-bold text-red-500">
                      <CircleAlert
                        size={11}
                      />
                      Urgent
                    </div>
                  )}
                </div>
              </Link>
            ),
          )}
        </div>
      )}
    </section>
  );
};

export default UpcomingTasks;