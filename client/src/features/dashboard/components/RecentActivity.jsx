import {
  CheckCircle2,
  Circle,
  Clock3,
  FilePlus2,
} from "lucide-react";

const formatDate = (
  date,
) => {
  if (!date) return "";

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "numeric",
      month: "short",
    },
  ).format(new Date(date));
};

const RecentActivity = ({
  projects,
  tasks,
}) => {
  const projectActivities =
    projects.map((project) => ({
      id: `project-${
        project._id ||
        project.id
      }`,
      type: "project",
      title: `Project "${project.name}" created`,
      date:
        project.createdAt ||
        project.updatedAt,
    }));

  const taskActivities =
    tasks.map((task) => ({
      id: `task-${
        task._id ||
        task.id
      }`,
      type: "task",
      title: `Task "${task.title}" updated`,
      date:
        task.updatedAt ||
        task.createdAt,
    }));

  const activities = [
    ...projectActivities,
    ...taskActivities,
  ]
    .sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date),
    )
    .slice(0, 6);

  const getIcon = (
    activity,
  ) => {
    if (
      activity.type ===
      "project"
    ) {
      return FilePlus2;
    }

    return Clock3;
  };

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
        <h2 className="text-base font-bold text-slate-950 dark:text-white">
          Recent activity
        </h2>

        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Latest changes in your
          workspace
        </p>
      </div>

      <div className="mt-5">
        {activities.length === 0 ? (
          <div className="flex min-h-36 flex-col items-center justify-center text-center">
            <Circle
              size={24}
              className="text-slate-300 dark:text-slate-600"
            />

            <p className="mt-3 text-xs font-semibold text-slate-500">
              No recent activity
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {activities.map(
              (activity) => {
                const Icon =
                  getIcon(
                    activity,
                  );

                return (
                  <div
                    key={
                      activity.id
                    }
                    className="flex gap-3"
                  >
                    <div
                      className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-slate-100
                        text-slate-500

                        dark:bg-slate-800
                        dark:text-slate-400
                      "
                    >
                      <Icon
                        size={15}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold leading-5 text-slate-700 dark:text-slate-300">
                        {activity.title}
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-400">
                        {formatDate(
                          activity.date,
                        )}
                      </p>
                    </div>

                    {activity.type ===
                      "task" && (
                      <CheckCircle2
                        size={15}
                        className="mt-1 shrink-0 text-slate-300 dark:text-slate-600"
                      />
                    )}
                  </div>
                );
              },
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentActivity;