const ProjectProgress = ({
  project,
}) => {
  const tasks =
    project?._dashboardTasks || [];

  const total =
    tasks.length;

  const completed =
    tasks.filter(
      (task) =>
        task.status === "COMPLETED",
    ).length;

  const progress = total
    ? Math.round(
        (completed / total) * 100,
      )
    : project.status ===
        "COMPLETED"
      ? 100
      : 0;

  return (
    <section
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm

        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-slate-950 dark:text-white">
            Project progress
          </h2>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Completion based on
            project tasks
          </p>
        </div>

        <span className="text-2xl font-extrabold text-violet-600 dark:text-violet-400">
          {progress}%
        </span>
      </div>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-violet-600 transition-all duration-700"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <div className="mt-3 flex justify-between text-[11px] font-medium text-slate-400">
        <span>
          {completed} completed
        </span>

        <span>
          {total} total tasks
        </span>
      </div>
    </section>
  );
};

export default ProjectProgress;