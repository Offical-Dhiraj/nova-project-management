import {
  CheckCircle2,
  Clock3,
  ListTodo,
  Users,
} from "lucide-react";

const ProjectStats = ({
  project,
}) => {
  const tasks =
    project?._dashboardTasks || [];

  const totalTasks =
    tasks.length;

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status === "COMPLETED",
    ).length;

  const openTasks =
    totalTasks -
    completedTasks;

  const members =
    project?.members?.length || 0;

  const stats = [
    {
      label: "Total tasks",
      value: totalTasks,
      icon: ListTodo,
      style:
        "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    },
    {
      label: "Open tasks",
      value: openTasks,
      icon: Clock3,
      style:
        "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    },
    {
      label: "Completed",
      value: completedTasks,
      icon: CheckCircle2,
      style:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    },
    {
      label: "Members",
      value: members,
      icon: Users,
      style:
        "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(
        ({
          label,
          value,
          icon: Icon,
          style,
        }) => (
          <div
            key={label}
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
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {label}
                </p>

                <p className="mt-2 text-2xl font-extrabold text-slate-950 dark:text-white">
                  {value}
                </p>
              </div>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${style}`}
              >
                <Icon size={18} />
              </div>
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export default ProjectStats;