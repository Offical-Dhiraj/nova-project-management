import {
  CheckCircle2,
  Clock3,
  Eye,
  ListTodo,
} from "lucide-react";

const TaskOverview = ({
  stats,
}) => {
  const total =
    stats.totalTasks || 0;

  const getWidth = (value) =>
    total
      ? `${Math.round(
          (value / total) * 100,
        )}%`
      : "0%";

  const rows = [
    {
      label: "To do",
      value: stats.todoTasks,
      icon: ListTodo,
      bar: "bg-slate-400",
    },
    {
      label: "In progress",
      value: stats.inProgressTasks,
      icon: Clock3,
      bar: "bg-violet-500",
    },
    {
      label: "Review",
      value: stats.reviewTasks,
      icon: Eye,
      bar: "bg-amber-500",
    },
    {
      label: "Completed",
      value: stats.completedTasks,
      icon: CheckCircle2,
      bar: "bg-emerald-500",
    },
  ];

  return (
    <section
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm

        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <div>
        <h2
          className="
            text-base
            font-bold
            text-slate-950
            dark:text-white
          "
        >
          Task progress
        </h2>

        <p
          className="
            mt-1
            text-xs
            text-slate-500
            dark:text-slate-400
          "
        >
          Current workload across
          your projects
        </p>
      </div>

      <div className="mt-6 space-y-5">
        {rows.map(
          ({
            label,
            value,
            icon: Icon,
            bar,
          }) => (
            <div key={label}>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon
                    size={15}
                    className="text-slate-400"
                  />

                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    {label}
                  </span>
                </div>

                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  {value}
                </span>
              </div>

              <div
                className="
                  h-2
                  overflow-hidden
                  rounded-full
                  bg-slate-100
                  dark:bg-slate-800
                "
              >
                <div
                  className={`
                    h-full
                    rounded-full
                    transition-all
                    duration-700
                    ${bar}
                  `}
                  style={{
                    width:
                      getWidth(value),
                  }}
                />
              </div>
            </div>
          ),
        )}
      </div>

      <div
        className="
          mt-7
          rounded-xl
          bg-slate-50
          p-4

          dark:bg-slate-800/60
        "
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Completion rate
          </span>

          <span className="text-sm font-extrabold text-slate-900 dark:text-white">
            {total
              ? Math.round(
                  (stats.completedTasks /
                    total) *
                    100,
                )
              : 0}
            %
          </span>
        </div>
      </div>
    </section>
  );
};

export default TaskOverview;